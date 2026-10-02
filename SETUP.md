# LankaAlert — Full Upgrade Setup

මෙම version එකේ citizen app එකට email/password, Google, Facebook sign-in, exact GPS reporting, reverse-geocoded address, live map, live weather/risk, Sinhala/Tamil/English UI, privacy policy සහ responsive desktop/mobile UI එක එකතු කරලා තියෙනවා.

## 1. Firebase Authentication
Firebase Console → Authentication → Sign-in method:

- Email/Password → Enable
- Google → Enable → choose a Project support email
- Facebook → Enable only if you actually need Facebook login

Then Firebase Console → Authentication → Settings → Authorized domains and add:
`lankaalert-2ee5c.web.app`

For Google OAuth redirect-based flows, Firebase uses:
`https://lankaalert-2ee5c.web.app/__/auth/handler`

Firebaseගේ web auth docs අනුව Email/Password සඳහා provider එක enable කරලා `createUserWithEmailAndPassword` / `signInWithEmailAndPassword` භාවිතා කළ හැක. https://firebase.google.com/docs/auth/web/password-auth

Facebook සඳහා Facebook Developer App එකක් සාදා App ID + App Secret Firebase Authentication → Facebook provider එකට දෙන්න. Firebase එකෙන් දෙන OAuth redirect URL එක Facebook app එකේ OAuth Redirect URIs වලට එක් කරන්න. https://firebase.google.com/docs/auth/web/facebook-login

**වැදගත්:** Facebook button එකේ code එක දැනටමත් app එකේ තියෙනවා. Firebase/Facebook console configuration නැතිනම් button එකෙන් sign-in නොවෙනු ඇත.

## 2. Firebase configuration
`js/firebase-config.js` එකේ දැනට project config තියෙනවා. වෙනත් Firebase project එකකට මාරු කරනවා නම් Firebase web app config එකෙන් values replace කරන්න.

## 3. Firestore (Storage intentionally removed)
Firestore database එක create කරලා `firestore.rules` publish කරන්න. මෙම version එකේ Firebase Storage භාවිතා නොකරන නිසා Storage bucket එක හෝ `storage.rules` deploy කිරීමට අවශ්‍ය නැහැ. Community reports වල ඡායාරූප upload කිරීම ඉවත් කරලා තියෙනවා.

## 4. Exact location
Browser එකේ HTTPS origin එකකින් app එක run කරන්න. Report open කරන විට app එක current GPS location එක ලබාගන්න උත්සාහ කරනවා. Save වන fields:

- `lat`, `lng`
- `accuracy`
- `address` (reverse geocoded address available නම්)
- `capturedAt`
- `districtId`, `districtName`

**GN division boundary:** current package එකට 100% official GN polygon dataset එක embed කරලා නැහැ. Exact GPS coordinate එක exact ලෙස save/display කරන අතර nearest Sri Lankan district එක risk engine එකට භාවිතා කරනවා.

## 5. APIs
### Open-Meteo
Weather/current/hourly rainfall සඳහා Open-Meteo live API භාවිතා කරනවා. It accepts latitude/longitude and returns current/hourly forecast/weather variables. https://open-meteo.com/en/docs

### OpenStreetMap / Nominatim
Explicit “locate me” / report location actions වලදී reverse geocoding සඳහා Nominatim භාවිතා කරනවා. Nominatim policy එක අනුව heavy usage නොකරන්න, maximum 1 request/second සහ proper attribution/identification maintain කරන්න. https://operations.osmfoundation.org/policies/nominatim/

### Sri Lanka flood API
`FLOOD_API_URL` currently points to `https://lk-flood-api.vercel.app/`. Its response is treated as an optional best-effort feed; if unavailable, Open-Meteo still drives the live dashboard. If your endpoint has a known JSON schema, map it in `js/weather.js` inside `parseFlood()` for a richer river/flood value.

## 6. Deploy
Firebase Hosting + Firestore rules are configured in `firebase.json`. Storage is intentionally not configured.

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,hosting
```

Use HTTPS in production so browser geolocation can work reliably.

## 7. Main files upgraded
- `index.html` — polished landing + email/Google/Facebook authentication
- `app.html` — full responsive citizen app
- `js/app.js` — live alerts/reports/map/GPS/profile logic
- `js/location.js` — exact GPS + reverse geocoding
- `js/weather.js` — live weather + risk + optional flood endpoint
- `js/firebase-init.js` — Firebase auth + Firestore helpers
- `privacy.html` — privacy policy
- `css/style.css` — full neon glass redesign + animations + desktop/mobile layouts
- `firestore.rules` — updated Firestore security rules


### 2026-09-02 fixes
- Ratnapura is the default home area when no valid saved district exists.
- Laptop/browser location results worse than 1 km accuracy are not treated as exact GPS; precise reports are blocked until a better fix is available.
- New Firestore alerts trigger an animated SUPER ALERT overlay and optional browser notification.
- `firebase-messaging-sw.js` is included for FCM background notifications. True background push requires a Firebase Web Push certificate/VAPID key and token registration.

- For Firebase Cloud Messaging background push, set `FCM_VAPID_KEY` in `js/firebase-config.js` from Firebase Console → Project settings → Cloud Messaging → Web Push certificates. The app will then save the browser FCM token to `users/{uid}.fcmToken`.


### Mobile Google/Facebook login fix

This site is intended to be hosted at `https://lankaalert-2ee5.web.app`. The Firebase Web SDK automatically uses the current LankaAlert Hosting host as `authDomain` on supported project hosts, which avoids the cross-origin storage issue documented by Firebase for web.app OAuth redirects.

In Firebase Authentication → Settings → Authorized domains, keep/add:
`lankaalert-2ee5.web.app`

For OAuth providers that require an explicit redirect URI, use:
`https://lankaalert-2ee5.web.app/__/auth/handler`

Do not delete the existing `firebaseapp.com` URI if another provider/app still uses it.

## HackX Jr. 9.0 Semi-Final Upgrade
This package preserves the existing citizen flows and adds a layered upgrade:

- Disaster Mode action center
- Explainable risk reasons based on the existing client-side thresholds
- Hazard / alert timeline using recorded alert events
- Family Safety Circle 2.0 using a `familyCircles/{code}` document and member subcollection
- One-tap Safety Card with Web Share / WhatsApp / Telegram / Copy
- Evidence signals + possible-duplicate detection for community reports
- DEMO SIMULATION clearly marked as not-live-data
- Location sharing privacy control: exact / approximate / off for sharing surfaces
- Quick disaster playbooks reused from the existing guide content
- Low-data mode for media-heavy report views
- Community safety summary dashboard
- Security & Trust Center
- Sri Lanka Resilience Map district pulse
- Expanded admin Review Command + Security & Audit console

Publish `firestore.rules` after deploying this version. The family circle and audit features require the added rules at the bottom of that file.

## RiverNet.lk — server-side API integration

Public RiverNet pages are live at `https://rivernet.lk/`. I could verify that external flood systems poll a RiverNet API, but I could not find a public RiverNet developer portal or official page that publishes a general API key signup flow or public API schema. Do not invent an endpoint or API key. Ask the RiverNet operator for API access/credentials, or inspect the site network requests only if the operator explicitly permits reuse of that feed.


මෙම version එකේ RiverNet provider credential browser code එකට දාන්නේ නැහැ. Browser එක `GET /api/rivernet?lat=...&lng=...` same-origin route එක call කරන අතර Firebase Cloud Function එක RiverNet service එකට request එක forward කරලා normalized station data එකක් පමණක් browser එකට return කරයි.

### 1. RiverNet endpoint එක configure කරන්න
`functions/.env.example` copy කරලා `functions/.env` කියලා තියා, RiverNet operator/service documentation එකෙන් ලැබෙන exact API endpoint එක `RIVERNET_API_URL` වෙත දාන්න. Default auth header එක `x-api-key`.

Bearer auth අවශ්‍ය නම්:

```text
RIVERNET_API_KEY_HEADER=Authorization
RIVERNET_API_KEY_PREFIX=Bearer
```

Query-string key එකක් provider එකෙන් අනිවාර්යයෙන්ම ඉල්ලන්නේ නැත්නම් `RIVERNET_KEY_IN_QUERY=0` තියාගන්න. Query parameters තුළ secrets යැවීම logs/referrer tooling වල leak වෙන්න පුළුවන් නිසා header authentication preferable.

### 2. Secret Manager එකට RiverNet key එක දාන්න

```bash
firebase functions:secrets:set RIVERNET_API_KEY
```

CLI prompt එකේ actual key එක paste කරන්න. Key එක `firebase-config.js`, HTML, frontend JS, Git repository, screenshots හෝ browser localStorage එකට paste කරන්න එපා.

### 3. Deploy කරන්න

```bash
firebase deploy --only functions,hosting
```

### 4. Important
Public RiverNet pages/data are used by Sri Lankan flood-monitoring systems, but the exact credentialed RiverNet API endpoint and authentication schema are not contained in this project. Therefore the adapter is configurable rather than inventing a fake endpoint or fake key. See `SECURITY.md` for the threat model and browser/server boundary.


## Spark build note
මෙම Spark-compatible package එකේ Firebase Storage සහ Cloud Functions deploy config නැත. DEPLOY_SPARK_SINHALA.md බලන්න.
