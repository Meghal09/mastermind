/**
 * Cloudflare Pages Function: /functions/api/bybit.js
 * Proxies all Bybit API calls to fix browser CORS restrictions.
 * Called by the frontend as: /api/bybit?path=/v5/market/tickers&category=linear
 */
export async function onRequest(context) {
  const url    = new URL(context.request.url);
  const path   = url.searchParams.get("path") ?? "/v5/market/tickers";
  // Forward all other query params to Bybit
  const params = new URLSearchParams(url.searchParams);
  params.delete("path");

  const bybitUrl = `https://api.bybit.com${path}?${params.toString()}`;

  try {
    const resp = await fetch(bybitUrl, {
      method:  context.request.method,
      headers: { "Content-Type": "application/json" },
      body:    context.request.method !== "GET" ? context.request.body : undefined,
    });

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type":                "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control":               "no-store",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ retCode: -1, retMsg: err.message }), {
      status: 502,
      headers: {
        "Content-Type":                "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
