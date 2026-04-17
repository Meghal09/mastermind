# MASTERMIND — Cloudflare Pages Deployment Guide

## Files in this package
```
mastermind-deploy/
├── index.html              ← Main app (self-contained, no build needed)
├── functions/
│   └── api/
│       └── bybit.js        ← Cloudflare Worker: Bybit API proxy (fixes CORS)
├── _headers                ← Security headers for Cloudflare Pages
├── wrangler.toml           ← Cloudflare Pages config
└── README.md               ← This file
```

---

## Deploy in 5 minutes (no coding needed)

### Option A — Drag & Drop (fastest)

1. Go to **https://dash.cloudflare.com**
2. Click **Pages** in the left sidebar
3. Click **Create a project** → **Direct Upload**
4. Name it `mastermind-trading` (or anything you like)
5. **Drag the entire `mastermind-deploy` folder** into the upload box
6. Click **Deploy site**
7. Done — your URL will be `https://mastermind-trading.pages.dev`

### Option B — GitHub (auto-deploys on every update)

1. Create a new GitHub repo (private recommended)
2. Upload all files from `mastermind-deploy/` to the repo root
3. In Cloudflare Pages → **Create project** → **Connect to Git**
4. Select your repo
5. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
6. Click **Save and Deploy**

---

## First-time setup after deploy

1. Open your Pages URL in browser
2. Click the **⚠ API KEYS** tab (shown in amber if not configured)
3. Enter:
   - **Bybit API Key** — from https://www.bybit.com/app/user/api-management
   - **Bybit API Secret** — from same page
   - **Claude API Key** — from https://console.anthropic.com
4. Click **SAVE & CONNECT**
5. The system tests your connection and shows your USDT balance
6. Regime detection will update automatically every 30 seconds

---

## Bybit API Key Setup (important)

When creating your Bybit API key:
- ✅ Enable: **Read** permission
- ✅ Enable: **Trade** permission  
- ❌ Do NOT enable: **Withdrawal** permission (never needed)
- Set IP restriction if possible for extra security

---

## Security notes

- API keys are stored in **browser session memory only**
- Keys are cleared automatically when you close the browser tab
- Keys are sent only to Bybit and Anthropic — never to any third party
- The Bybit proxy (`/api/bybit`) runs inside your own Cloudflare account

---

## Start paper trading first!

Go to **⚙ CONFIG** tab and make sure mode is set to **📄 PAPER** before testing.
Only switch to **🔴 LIVE** when you are confident in the signals.
