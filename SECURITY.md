# LankaAlert security model

## Browser keys

Do not place third-party provider secrets in `firebase-config.js`, `app.html`, or any JavaScript shipped to the browser.

## RiverNet.lk integration
RiverNet credentials are used only by the HTTPS Cloud Function `rivernetProxy`.

1. Put the provider URL and auth style in `functions/.env` based on the RiverNet integration details you receive from the provider.
2. Store the secret in Firebase Secret Manager:

   `firebase functions:secrets:set RIVERNET_API_KEY`

3. Deploy the function and Hosting rewrite:

   `firebase deploy --only functions,hosting`

The browser calls the same-origin `/api/rivernet` route. The provider key is injected into the server runtime and is never returned to the client. The proxy validates coordinates, applies a lightweight rate limit and returns a normalized station record rather than forwarding the provider payload.

The repository deliberately contains no real RiverNet secret. The current public RiverNet website is used as a data source by Sri Lankan flood-monitoring systems, but the exact credentialed API endpoint/auth schema is not published in this project, so do not invent or commit one. Configure the adapter with the endpoint/auth contract supplied by the RiverNet service operator.

- Admin documents are readable only by the authenticated owner/admin paths needed by the app.
- Reports require authentication to read and write.
- Report media is readable only to authenticated users.
- Admin writes are gated by the `admins/{uid}` document.
- Family-circle reads require membership or creator access.

## Browser hardening
Firebase Hosting sends security headers including CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and a restrictive Permissions Policy. The app uses same-origin API calls for RiverNet and does not expose the provider credential.

## Recommended production hardening
Enable Firebase App Check for the web app and monitor Cloud Functions quotas/logs. For high-volume public access, move rate limiting to a durable store (for example a managed counter) rather than relying only on per-instance memory.


## RiverNet proxy authentication
The `/api/rivernet` function requires a valid Firebase Authentication ID token before forwarding requests upstream. The RiverNet credential remains server-side in Secret Manager.
