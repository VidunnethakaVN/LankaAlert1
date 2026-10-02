# V15.4 — RISE ගංගා මට්ටම් දත්ත

V15.3 පදනම මත RISE Sri Lanka හි public river-observations API සම්බන්ධ කර ඇත.

- API: `https://risesrilanka.org/api/gauges`
- නිල dashboard: `https://risesrilanka.org/gauges`
- Home dashboard එකේ අවදානම් මට්ටම අනුව මුල් station 4 පෙන්වයි; අනෙක් සියලු station විස්තර දිගහැර බලන්න පුළුවන්.
- දත්ත අතින් refresh කළ හැකි අතර විනාඩි 10කට වරක් ස්වයංක්‍රීයව නැවත ලබාගනී.
- API එක stale/unavailable තත්ත්වයක් හෝ status message එකක් දුන්නොත් එය පෙන්වයි. හිස් වාර්තා ලැයිස්තුවක් “අවදානමක් නැහැ” ලෙස අර්ථ නොදක්වයි.
- RISE API එකට browser access සඳහා CSP හි `connect-src` අවසරය එක් කර ඇත. API/network/CORS දෝෂයක් වුණොත් widget එක දෝෂය පෙන්වා නිල dashboard එකට සබැඳිය දෙයි.
- කාලගුණ අනාවැකි තවම Open-Meteo වෙතින් ගනී; RISE integration එක ගංගා gauge කියවීම් සඳහා පමණි.

RISE හි API catalog: `https://risesrilanka.org/docs/api`

## ArcGIS river-gauge source integration

- Primary API: `https://services3.arcgis.com/J7ZFXmR8rSmQ3FGf/arcgis/rest/services/gauges_2_view/FeatureServer/0/query`
- Query filter: records from the last 4 days, excluding `Calidonia` and `Kala Oya`.
- Fields used: `basin`, `gauge`, `water_level`, `rain_fall`, `CreationDate`, `alertpull`, `minorpull`, `majorpull`.
- Flood status is calculated in the browser by comparing `water_level` against the three threshold fields.
- Results are paginated with `resultOffset` / `resultRecordCount` so larger responses can be loaded.
- Existing RISE API and Firebase station fallback remain as secondary fallbacks if the primary ArcGIS source is unavailable.
