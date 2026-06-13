# Deploying to law.eraplanner.com (Cloudflare Pages)

This app is a Module Federation **remote**. Cloudflare Pages hosts the static
build; the host app (`eraplanner.com`) loads `remoteEntry.js` from here at
runtime.

## One-time setup (Cloudflare dashboard)

1. **Pages → Create → Connect to Git** → pick `shpunter/era-law`.
2. Build settings:
   - **Framework preset:** None / Vite
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist` (also declared in `wrangler.toml`)
   - Cloudflare detects `pnpm-lock.yaml` and uses pnpm automatically.
3. **Custom domains → Set up a domain →** `law.eraplanner.com`.
   Cloudflare adds the CNAME automatically when the zone is on Cloudflare.

That's it — no environment variables are required. The production asset base is
baked into the build as `https://law.eraplanner.com/` (see `vite.config.ts`).
If the domain ever changes, set a `PUBLIC_URL` build env var (e.g.
`https://law.example.com/`) instead of editing the config.

## What's already wired for this

- `vite.config.ts` — production `base` defaults to `https://law.eraplanner.com/`
  so the host resolves chunks/assets from the right origin.
- `public/_headers` — sends `Access-Control-Allow-Origin: *` (the host is a
  different origin) and `Cache-Control: no-cache` on `remoteEntry.js` so the
  host never pins a stale manifest.

## Point the host (era) at production

In the **era** repo, set the remote entry to the deployed URL:

```
VITE_LAW_REMOTE_ENTRY=https://law.eraplanner.com/remoteEntry.js
```

(See `era/.env.example`.) Set it in era's own deploy environment.

## Local production smoke test

```
PUBLIC_URL=http://localhost:8085/ pnpm serve
```

Builds with a localhost base and serves it on :8085, matching the dev remote URL
so a locally-running era host can consume it.

## Every deploy

Push to the connected branch — Pages rebuilds and deploys automatically.
After deploy, `remoteEntry.js` is the manifest; confirm it loads with CORS:

```
curl -sI https://law.eraplanner.com/remoteEntry.js | grep -i 'access-control\|cache-control'
```
