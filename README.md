# MASTERMIND — Cloudflare Pages Deployment (Fixed)

## File structure (upload ALL of these to GitHub)
```
/
├── index.html
├── _headers
├── _routes.json
├── functions/
│   └── api/
│       └── bybit.js
└── .github/
    └── workflows/
        └── deploy.yml
```
> ⚠️ No wrangler.toml needed — delete it if present.

---

## Deploy via Cloudflare Dashboard (Recommended — no GitHub needed)

**This is the simplest method. Do this:**

1. Go to **https://dash.cloudflare.com**
2. Left sidebar → **Pages**
3. Click **Create a project**
4. Choose **Direct Upload** (NOT "Connect to Git")
5. Name: `mastermind-trading`
6. Click **Create project**
7. On the next screen, **drag and drop the unzipped folder** (all files including the `functions` subfolder)
8. Click **Deploy site**
9. ✅ Done — your URL: `https://mastermind-trading.pages.dev`

---

## Deploy via GitHub (if you prefer auto-deploy on push)

### Step 1 — Create GitHub repo

1. Go to **https://github.com/new**
2. Name it `mastermind-trading`, set to **Private**
3. Upload ALL files from this zip (including `.github/workflows/deploy.yml`)

### Step 2 — Create Cloudflare API Token

1. Go to **https://dash.cloudflare.com/profile/api-tokens**
2. Click **Create Token**
3. Use template: **Cloudflare Pages — Edit**
4. Copy the token

### Step 3 — Get your Account ID

1. Go to **https://dash.cloudflare.com**
2. Right sidebar shows **Account ID** — copy it

### Step 4 — Add secrets to GitHub

In your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | The token from Step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | The Account ID from Step 3 |

### Step 5 — Create the Pages project on Cloudflare first

1. **dash.cloudflare.com** → **Pages** → **Create a project** → **Direct Upload**
2. Name it exactly: `mastermind-trading`
3. Upload any single file (e.g. index.html) just to create the project
4. Now push to GitHub — the Action will deploy the real files

### Step 6 — Push to GitHub

Any push to `main` branch will auto-deploy.

---

## Cloudflare Pages settings (if using Connect to Git)

If you connect GitHub repo directly in Cloudflare Pages dashboard:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave completely empty)* |
| Build output directory | `/` |
| Root directory | `/` |

**This is critical — leaving the build command empty prevents the wrangler error.**

---

## After deployment — First time setup

1. Open your Pages URL
2. Click **⚠ API KEYS** tab (shown in orange)
3. Enter:
   - **Bybit API Key** — https://www.bybit.com/app/user/api-management
   - **Bybit Secret** — same page
   - **Claude API Key** — https://console.anthropic.com
4. Click **SAVE & CONNECT**
5. System tests connection and shows your live balance
6. Regime updates every 30 seconds with live Bybit data

## Bybit API permissions needed
- ✅ Read
- ✅ Trade
- ❌ Withdrawal (never needed)
