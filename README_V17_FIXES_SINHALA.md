# LankaAlert V17 — Fixes

මේ build එකේ ප්‍රධාන fixes:

1. `super-ui.js` හි translation function `t` shadow වෙන bug එක fix කරලා තියෙනවා. GPS share/copy සහ tool buttons දැන් `t is not a function` error එකට වැටෙන්නේ නැහැ.
2. Main app UI tab navigation සඳහා `navigation-failsafe.js` add කරලා තියෙනවා. app module එකක් fail වුණත් Home / Map / Reports / Alerts / Guide / Profile tabs මාරු වීමට fallback එකක් තියෙනවා.
3. `app.html` සහ JS/CSS assets සඳහා V17 cache-busting version භාවිතා කරලා තියෙනවා.
4. Firebase Hosting හි JS/CSS files අවුරුද්දක් immutable cache නොකර `no-cache, must-revalidate` කරලා තියෙනවා. මේක development/redeployment වලදී stale JS load වීම අඩු කරනවා.
5. Firebase Storage project config එකක් use කරන්නේ නැහැ. Compatibility imports වලින් Storage symbol එකක් accidentally load වුණොත් clear error එකක් ලැබෙනවා.
6. `beforeinstallprompt` console warning එක ඉවත් කිරීම සඳහා custom prompt interception එක ඉවත් කරලා තියෙනවා.
7. Deprecated `apple-mobile-web-app-capable` meta tag එක ඉවත් කරලා `mobile-web-app-capable` තියාගෙන තියෙනවා.
8. Light theme එක default. Light theme එකේ consistent neutral surface system එකක් භාවිතා කරනවා.
9. Dark theme එක user දුන් palette එකම භාවිතා කරයි:
   - Background #07111F
   - Cards #0F1C2E
   - Secondary #16263A
   - Primary text #F8FAFC
   - Secondary text #94A3B8
   - Accent #38BDF8
   - Success #22C55E
   - Warning #F59E0B
   - Danger #EF4444
10. Weather semantic colors:
   - Clear #38BDF8
   - Partly Cloudy #60A5FA
   - Cloudy #64748B
   - Rain #2563EB
   - Thunderstorm #4F46E5
   - Fog #94A3B8
   - Windy #06B6D4
   - Hot #F97316
   - Cold #7DD3FC
   - Severe #EF4444

## Deploy

```cmd
firebase deploy --only firestore:rules,hosting
```

Deploy කළාට පස්සේ Chrome DevTools > Application > Storage > Clear site data කරලා `Ctrl + Shift + R` කරන්න.
