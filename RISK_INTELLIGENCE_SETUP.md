# V40.5 Risk Intelligence AI setup

V40.5 includes a Cloudflare Worker `/risk-intelligence` endpoint that calls Gemini without exposing the API key in browser files. The key shared in chat has not been copied into this project. Because that key was previously embedded in the V40.4 browser script, rotate it in Google AI Studio before deploying.

## Configure the protected service

1. In `worker/dmc-proxy.js`, add any production/custom frontend origins to `RISK_ALLOWED_ORIGINS` (or the Cloudflare Worker `RISK_ALLOWED_ORIGINS` variable).
2. From this version folder, set the Gemini key as a Cloudflare Worker secret when prompted: `npx wrangler secret put GEMINI_API_KEY`.
3. Deploy the Worker with `npx wrangler deploy`.

The endpoint validates the browser origin, caps the request body, sends only structured risk evidence to Gemini, and returns a short summary with evidence-linked signals. Do not put the API key in `js/` or `app.html`.

The frontend call is intentionally not enabled yet. Before enabling it, confirm that risk scores, rainfall/river/terrain signals, and selected language may be sent to the configured Worker and Google Gemini for analysis.
