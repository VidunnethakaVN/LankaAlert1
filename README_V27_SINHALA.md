# LankaAlert SUPER V27 — National competition build

මෙය V26 මත target fixes පමණක් කරන build එකකි. Existing application flows තබාගෙන:

- Official DMC snapshot එක Alerts/Home feed එකට merge වේ; static snapshot එක live official push channel එකක් ලෙස claim නොකරයි.
- USGS earthquake feed / volcano / tornado feed භාවිතා නොකරයි.
- Open-Meteo weather එක GPS point එකක් තිබේ නම් එම exact browser GPS coordinate එක භාවිතා කරයි; නැතිනම් තෝරාගත් district centre එක පමණක් භාවිතා කරයි.
- 24h / 72h rainfall values hourly precipitation sums ලෙස label කරයි.
- Map district markers වලින් home area set කළ හැක.
- Reports සඳහා selected-date empty state එක, filters සහ GPS context තබා ඇත.
- Safety Checklist වෙනම tab එකක් ලෙස තබා ඇත.
- Sinhala / Tamil / English dynamic family/profile/guide labels වැඩිදියුණු කර ඇත.
- Firebase Storage සම්පූර්ණයෙන් disabled; profile image එක resize කර private Firestore profile document එකේ තබයි.
- Firebase Web API key browser-visible වීම intentional project identifier එකකි. RiverNet / third-party secret keys frontend එකේ නොතබයි.
