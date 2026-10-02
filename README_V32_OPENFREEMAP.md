# LankaAlert V32 — OpenFreeMap Map Upgrade

- Primary map basemap changed from OpenStreetMap raster tiles to OpenFreeMap vector tiles rendered through MapLibre GL and the MapLibre-Leaflet adapter.
- Existing Leaflet markers, report pins, district markers, popups, filters, GPS accuracy circle, and map controls are preserved.
- OpenFreeMap style: https://tiles.openfreemap.org/styles/liberty
- Nominatim remains available for reverse geocoding; it is not used as the basemap.
- An OpenStreetMap raster layer remains only as a compatibility fallback if the MapLibre adapter fails to load.
