# LankaAlert V36 — National Feature Layer

මෙය දැනට තිබුණු LankaAlert web app එක replace කරන build එකක් නොවේ. Existing Home / Map / Reports / Alerts / Settings / Firebase flows මත additive feature layer එකක් එකතු කර ඇත.

## එකතු කළ ප්‍රධාන features

### 1. Weather + Wind audio briefings
Browser Speech Synthesis භාවිතයෙන් current weather, 24h rainfall, wind speed සහ direction ඇසිය හැකි short briefing එකක්.

### 2. Road Conditions Tracker
Community road reports සඳහා Blocked / Flooded / Damaged / Open status එකක්. Map එකේ `මාර්ග / Roads` filter එකත් ඇත.

`reports` collection එකේ road report එකකට `roadStatus` field එක save වේ.

### 3. Offline Safety Guide
Firebase Messaging service worker එක දැන් same-origin app shell assets cache කරයි. Guide content සහ historical data offline-first fallback එකක් ලබාගනී. පළමු online load එකෙන් පසු cache build වේ.

### 4. Alert → Safety Guide action
Flood / Landslide alert detail එකෙන් relevant safety guide එකට direct action එකක් ඇත.

### 5. Historical Hazard Archive
DMC historical disaster publications සහ NBRO case publications මත district exposure figures, annual impact timeline සහ selected case studies එකතු කර ඇත.

### 6. School / Community Broadcast Mode
Admin dashboard එකෙන් verified local notices publish කළ හැක:
- National
- School
- GN / local authority
- Community

Firestore collection: `communityNotices`

### 7. Accessibility controls
Settings තුළ:
- Standard / Large / Extra-large text
- High contrast
- Reduce motion
- Critical-alert read-aloud helper

### 8. National transparent risk model
`js/risk-engine.js` මගින්:
- 24h rainfall
- 72h rainfall
- current precipitation
- river alert / minor / major thresholds
- river rate-of-rise
- terrain elevation
- terrain slope estimate
- historical flood/landslide exposure signal

එකතු කර transparent rule-based flood/landslide risk score එකක් ගණනය කරයි.

### 9. River rate-of-rise
Sri Lanka river-gauge ArcGIS feed එකෙන් recent samples ලබාගෙන metres/hour trend එක estimate කරයි. Gauge history නොලැබුණහොත් risk engine එක fallback කරයි.

## Important implementation note
Risk engine එක **decision support** එකක් පමණි. It does not replace official DMC / Irrigation / NBRO warnings. The UI intentionally labels the model as explainable / rule-based.

## Firebase rules
`firestore.rules` වෙත `communityNotices` collection එක සඳහා public read + admin-only write rule එක එකතු කර ඇත. Deploy කිරීමට:

```bash
firebase deploy --only firestore:rules
```

## Service worker
`firebase-messaging-sw.js` තවදුරටත් notifications සඳහා පමණක් නොවේ. It also provides same-origin offline shell caching while preserving Firebase Messaging background notifications.

## External sources used by the feature layer
- DMC historical disaster-event publications
- DMC flood hazard profile
- NBRO landslide risk / case publications
- Open-Meteo elevation endpoint (Copernicus DEM-backed elevation)
- Sri Lanka river-gauge ArcGIS feed already used by the existing project
