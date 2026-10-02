# LankaAlert SUPER V13 — Professional Multi-Hazard Edition

මෙම version එකේ default theme එක **Light**. Desktop layout එක enterprise safety dashboard එකක් වගේ තබා ඇත: calm navigation, clean white cards, restrained blue accent, generous spacing, custom SVG icons සහ multi-hazard command centre.

## Multi-hazard coverage
Flood, landslide, cyclone, drought, earthquake, tsunami, wildfire, extreme heat, volcanic activity සහ lightning සඳහා monitoring coverage/UI එක එක් කර ඇත.

## Verified source layers
- Sri Lanka Disaster Management Centre (DMC)
- Sri Lanka Department of Meteorology
- Sri Lanka Department of Irrigation
- National Building Research Organization (NBRO)
- RiverNet.lk
- GDACS
- USGS Earthquake feeds
- NASA FIRMS

## Live feeds
USGS සහ GDACS public/documented feeds browser එකෙන් live read-only data සඳහා භාවිතා කරයි. Existing Open-Meteo weather layer continues. RiverNet calls stay behind the Firebase function proxy; the secret is NOT shipped to browser code.

## No Firebase Storage
Firebase Storage configuration/target එක project එකෙන් intentionally ඉවත් කර ඇත. `firebase deploy` එක Storage initialize කරන්න ඉල්ලන්නේ නැත.

## Important
- RiverNet endpoint/key placeholders remain until you obtain the official RiverNet developer credentials/schema.
- NASA FIRMS needs its own free MAP_KEY if you later enable the protected satellite-fire integration; do not put that key in browser JS.
