# LankaAlert V16 — Fixes

මෙම build එකේ V15 console errors සඳහා fixes:

- `js/i18n.js` object එකේ duplicate standalone commas නිසා ඇති `Unexpected token` syntax error ඉවත් කළා.
- `custom-icons.js` හි `heat` icon එකේ malformed `r=3.5"` attribute fix කළා.
- `lock` custom SVG icon එක add කළා.
- app/index/preview/privacy/admin pages වල `mobile-web-app-capable` meta tag add කළා.
- cache-busting version එක V16 කළා, browser එක old broken JS/CSS cache එකෙන් load වීම වැළැක්වීමට.
- user-specified dark palette variables සහ weather state colors authoritative design tokens ලෙස add කළා.
- light theme remains the default through the working i18n/theme bootstrap.

Console එකේ `redirectionChainSiteScript.js` message එක browser extension එකක script එකකින් එන warning එකක්; LankaAlert application code එකේ කොටසක් නොවේ.
