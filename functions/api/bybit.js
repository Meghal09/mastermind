// functions/api/bybit.js
// Cloudflare Pages Function — proxies Bybit API calls to fix browser CORS.
// Frontend calls: /api/bybit?path=/v5/market/tickers&category=linear

export async function onRequest(context) {
  const { request } = context;

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const url     = new URL(request.url);
  const path    = url.searchParams.get("path") || "/v5/market/tickers";
  const forward = new URLSearchParams(url.searchParams);
  forward.delete("path");

  const bybitUrl = `https://api.bybit.com${path}?${forward.toString()}`;

  try {
    const bybitResp = await fetch(bybitUrl, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("X-BAPI-API-KEY")     && { "X-BAPI-API-KEY":     request.headers.get("X-BAPI-API-KEY") }),
        ...(request.headers.get("X-BAPI-SIGN")        && { "X-BAPI-SIGN":        request.headers.get("X-BAPI-SIGN") }),
        ...(request.headers.get("X-BAPI-TIMESTAMP")   && { "X-BAPI-TIMESTAMP":   request.headers.get("X-BAPI-TIMESTAMP") }),
        ...(request.headers.get("X-BAPI-RECV-WINDOW") && { "X-BAPI-RECV-WINDOW": request.headers.get("X-BAPI-RECV-WINDOW") }),
      },
      body: request.method !== "GET" ? request.body : undefined,
    });

    const data = await bybitResp.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ retCode: -1, retMsg: String(err.message) }),
      { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-BAPI-API-KEY, X-BAPI-SIGN, X-BAPI-TIMESTAMP, X-BAPI-RECV-WINDOW",
    "Cache-Control": "no-store",
  };
}
