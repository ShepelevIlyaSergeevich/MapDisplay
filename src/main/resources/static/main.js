import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import VectorLayer from 'https://cdn.skypack.dev/ol/layer/Vector.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import {Draw, Modify, Snap} from 'https://cdn.skypack.dev/ol/interaction.js';
import {get} from 'https://cdn.skypack.dev/ol/proj.js';
import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource({
    format: new GeoJSON(),
    url: '',
});
const vector = new VectorLayer({
  source: source,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33',
  },
});

// Limit multi-world panning to one world east and west of the real world.
// Geometry coordinates have to be within that range.
const extent = get('EPSG:3857').getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 1,
    extent
  }),
});

const modify = new Modify({source: source});
map.addInteraction(modify);

let draw, snap; // global so we can remove them later
const typeSelect = document.getElementById('type');

function addInteractions() {
  draw = new Draw({
    source: source,
    type: "Polygon",
  });
  map.addInteraction(draw);
  snap = new Snap({source: source});
  map.addInteraction(snap);
}

/**
 * Handle change event.
 */
//typeSelect.onchange = function () {
//  map.removeInteraction(draw);
//  map.removeInteraction(snap);
//  addInteractions();
//};

addInteractions();
