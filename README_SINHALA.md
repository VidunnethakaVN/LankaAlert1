# LankaAlert SUPER — Fixed setup

## මේ version එකේ වෙනස්කම්
- Firebase Storage සම්පූර්ණයෙන් ඉවත් කර ඇත. `firebase deploy` Storage setup error එක නොඑන්න `firebase.json` එකේ storage target එක නැත.
- Report photos upload කිරීම ඉවත් කර ඇත; reports Firestore තුළ GPS/විස්තර සමඟ පමණක් save වේ.
- Google sign-in flow desktop එකේ popup සහ mobile එකේ redirect භාවිතා කරයි.
- Google/Firebase errors සඳහා සිංහලෙන් හේතුව පෙන්වයි.
- RiverNet proxy එකට Firebase Auth ID token එකක් අවශ්‍ය කර ඇත. RiverNet secret එක browser එකට යන්නේ නැත.

## Deploy

```cmd
firebase deploy --only firestore:rules,hosting
```

Functions deploy කිරීම සඳහා Firebase project එක Blaze plan එකේ තිබිය යුතුය:

```cmd
firebase deploy --only functions
```

## Google Login — Console setup

Firebase Console → Authentication → Sign-in method → Google → Enable. Project support email එකක් තෝරන්න.

Firebase Console → Authentication → Settings → Authorized domains → Add:

`lankaalert-2ee5c.web.app`

Google redirect handler:

`https://lankaalert-2ee5c.web.app/__/auth/handler`

Google login තවම fail වුණොත් website එකේ පෙන්වන exact Firebase error එක බලන්න. `auth/operation-not-allowed` නම් Google provider එක disabled. `auth/unauthorized-domain` නම් authorized domain එක missing.

## RiverNet

RiverNet public site: https://rivernet.lk/

Public RiverNet developer/API-key registration documentation මට verify කරන්න ලැබුණේ නැහැ. වෙනත් flood system documentation එකක RiverNet API එක every 2 minutes poll කරන බව verify කළා. ඒ නිසා fake key/endpoint එකක් දාන්නේ නැහැ. RiverNet operator එකෙන් official API endpoint + authentication details + permission ලබාගන්න.

Credential එක Firebase Secret Manager වෙත:

```cmd
firebase functions:secrets:set RIVERNET_API_KEY
```

`functions/.env` තුළ actual endpoint එක set කරන්න:

```text
RIVERNET_API_URL=YOUR_OFFICIAL_RIVERNET_ENDPOINT
RIVERNET_API_KEY_HEADER=x-api-key
RIVERNET_API_KEY_PREFIX=
RIVERNET_KEY_IN_QUERY=0
```

## Important

Firebase web API keys are not equivalent to RiverNet secret keys. Do not put third-party secrets in `firebase-config.js`, HTML, frontend JS, Local Storage or Git.
