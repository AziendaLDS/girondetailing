/**
 * Build NJ county SVG from US Census TIGER cartographic boundaries.
 * Source: https://www2.census.gov/geo/tiger/GENZ2023/shp/cb_2023_us_county_500k.zip
 * Usage: node scripts/build-nj-map.mjs /path/to/cb_2023_us_county_500k.shp > assets/nj-counties.svg
 */
import shapefile from 'shapefile';
import { geoMercator, geoPath } from 'd3-geo';

const shp = process.argv[2] || '/tmp/nj_counties/cb_2023_us_county_500k.shp';
const source = await shapefile.open(shp);
const features = [];
while (true) {
  const r = await source.read();
  if (r.done) break;
  if (r.value.properties.STATEFP === '34') features.push(r.value);
}

const fc = { type: 'FeatureCollection', features };
const width = 420, height = 720, pad = 18;
const projection = geoMercator().fitExtent([[pad, pad], [width - pad, height - pad]], fc);
const path = geoPath(projection);
const HOME = 'Mercer';
const ALSO = new Set(['Burlington', 'Middlesex', 'Hunterdon', 'Somerset', 'Monmouth']);
const order = { Mercer: 3 };
features.sort((a, b) => (order[a.properties.NAME] || 0) - (order[b.properties.NAME] || 0));
const slug = (n) => n.toLowerCase().replace(/\s+/g, '-');

const paths = features.map((f) => {
  const name = f.properties.NAME;
  const cls = name === HOME ? 'county home' : ALSO.has(name) ? 'county also' : 'county';
  return `  <path class="${cls}" data-county="${slug(name)}" d="${path(f)}"><title>${name} County</title></path>`;
}).join('\n');

const labels = [];
for (const f of features) {
  if (f.properties.NAME !== HOME) continue;
  const [x, y] = path.centroid(f);
  labels.push(`  <text class="map-label light" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${HOME}</text>`);
}

process.stdout.write(`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Map of New Jersey highlighting Mercer County service area">
  <rect class="water" x="0" y="0" width="${width}" height="${height}"/>
${paths}
${labels.join('\n')}
</svg>\n`);
