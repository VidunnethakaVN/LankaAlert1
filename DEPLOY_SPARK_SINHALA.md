# LankaAlert — Spark Plan deployment (සිංහල)

## මේ version එකේ වැදගත් වෙනස

මෙම build එක **Firebase Spark plan එකට deploy-friendly** කර ඇත.
`firebase.json` තුළ Firebase Cloud Functions target එක intentionally නැත. ඒ නිසා `firebase deploy` කරන විට Functions සඳහා Blaze-plan error එකක් trigger නොවිය යුතුය.

### Hosting + Firestore deploy
Project folder එකේ සිට:

```bash
firebase deploy --only hosting,firestore
```

හෝ:

```bash
firebase deploy
```

### DMC live feed
DMC public reports live feed එක Firebase Functions මගින් නොව Cloudflare Worker එකෙන් ලබා ගන්නා architecture එකේම පවතී:

`DMC → Cloudflare Worker → LankaAlert Web`

Worker deployment එක:

```bash
npx wrangler deploy
```

> DMC Worker එක already deployed නම්, නැවත deploy කිරීම අවශ්‍ය නැහැ. `/health` endpoint එකෙන් service status check කළ හැක.

## Automatic backend 3-tier alerts
Firebase Cloud Functions සඳහා Firebase project එක **Blaze plan** එකේ තිබිය යුතුය. ඒ නිසා Spark plan එකේ සිට `backend-blaze-only/functions` code එක deploy කරන්න බැහැ.

මේ build එක intentionally Spark-compatible කර ඇත්තේ hosting/Firestore/DMC live feed එක නොකඩවා තබා ගැනීමටය.

Blaze plan එකකට upgrade කළ දවසක:

1. `backend-blaze-only/functions` → project root එකේ `functions` ලෙස restore කරන්න.
2. `firebase.json` තුළ Functions target එක restore කරන්න.
3. Node 20 environment එකක් භාවිතා කරන්න.
4. `firebase deploy --only functions` run කරන්න.

## Local Node warning
Functions package එක Node 20 සඳහා target කරලා තියෙනවා. Local machine එකේ Node 26 තිබුණොත් `npm install` අතර `EBADENGINE` warning එක පෙන්විය හැක. එය Firebase Spark hosting deploy එකේ blocker එක නොවේ, නමුත් Functions deploy කරන අවස්ථාවේ Node 20 භාවිතා කිරීම වඩා නිවැරදියි.
