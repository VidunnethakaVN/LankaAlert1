# LankaAlert V13 deployment

## 1) Install / login
firebase login
firebase use lankaalert-2ee5c

## 2) Rules + Hosting (no Storage)
firebase deploy --only firestore:rules,hosting

## 3) Functions
The RiverNet secure proxy lives in `functions/` and requires Blaze for Cloud Functions deployment.

firebase deploy --only functions

## 4) RiverNet secret
firebase functions:secrets:set RIVERNET_API_KEY

Then configure the verified official API base URL/auth format in `functions/.env`:
RIVERNET_API_URL=...
RIVERNET_API_KEY_HEADER=x-api-key
RIVERNET_API_KEY_PREFIX=
RIVERNET_KEY_IN_QUERY=0

Do not put a RiverNet key into frontend JavaScript.

## 5) Google Sign-In
Firebase Console -> Authentication -> Sign-in method -> Google -> Enable
Authorized domains -> add:
lankaalert-2ee5c.web.app

## 6) No Storage
Do NOT run `firebase deploy --only storage` and do NOT initialize Firebase Storage unless the product requirements change.
