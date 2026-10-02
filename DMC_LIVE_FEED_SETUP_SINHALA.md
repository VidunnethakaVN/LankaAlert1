# LankaAlert — DMC Live Feed

## මේකෙන් සිද්ධ වෙන්නේ මොකක්ද?

LankaAlert එක DMC වෙබ් අඩවියේ public reports pages server-side ලෙස ලබාගෙන, EN / SI / TA entries normalize කරලා web app එකට official live feed එකක් ලබා දෙයි.

Flow:

DMC public reports → Cloudflare Worker → LankaAlert web app

## Refresh timing

- Worker cache: 60 seconds
- Web app refresh: 60 seconds
- Browser එක network නැති විට: last verified live cache
- ඒ cache එකත් නැති විට: bundled DMC snapshot එක fallback

Fallback data එක live ලෙස label නොකරයි.

## Deploy

මෙම folder එක තුළ `wrangler.toml` තිබේ.

```bash
wrangler login
wrangler deploy
```

Deploy වුණාට පස්සේ endpoint එක:

`https://lankaalert-dmc.lankaalert.workers.dev/`

Health check:

`https://lankaalert-dmc.lankaalert.workers.dev/health`

## Production note

DMC එකේ public API/RSS endpoint එකක් වෙනුවට public reports pages භාවිතා කරන නිසා DMC page structure වෙනස් වුණොත් parser එක update කරන්න අවශ්‍ය විය හැක. Web app එක ඒ අවස්ථාවේ last verified live data / bundled snapshot fallback එක භාවිතා කරයි.
