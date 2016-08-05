/*
 * @copyright 2015 commenthol
 * @license MIT
 */

/* globals L */

function init() {
	var minZoom = 2,
		maxZoom = 8,
		img = [
			23404,  // original width of image
			16555   // original height of image
		];

	// create the map
	var map = L.map('map',{
			minZoom: minZoom,
			maxZoom: maxZoom,
		});

	// assign map and image dimensions
	var rc = new L.RasterCoords(map, img);
	// set the bounds on map
	rc.setMaxBounds();

	// set the view on a marker ...
	map.setView(rc.unproject([1589, 1447]), 3);

	// set marker at the image bound edges
	var layerBounds = L.layerGroup([
		L.marker(rc.unproject([0,0])).bindPopup('[0,0]'),
		L.marker(rc.unproject(img)).bindPopup(JSON.stringify(img))
	]);
	map.addLayer(layerBounds);

	// set markers on click events in the map
	map.on('click', function(event){
		var coords = rc.project(event.latlng);
		var marker = L.marker(rc.unproject(coords))
			.addTo(layerBounds);
		marker.bindPopup('['+Math.floor(coords.x)+','+Math.floor(coords.y)+']')
			.openPopup();
	});

	var imgDir = "leaflet-0.7.3/images/";

	// the tile layer containing the image generated with gdal2tiles --leaflet ...
    L.tileLayer('http://192.9.99.105:92/tiles/xilongwan/{z}/{x}/{y}.png', {
		noWrap: true,
		attribution: '深圳市易图咨询股份有限公司',
	}).addTo(map);
}
