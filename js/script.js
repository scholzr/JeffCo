// Main control file

//Hydrant Page
$("div#Hydrants").live("pageshow", function() {
	//Resize Map Div
	$("#map").height($(window).height() - $("#HydrantHead").height() - $("#HydrantFoot").height() - 35);
	
	//Initialize map
	var po = org.polymaps;
	
	var map = po.map()
		.container(document.getElementById("map").appendChild(po.svg("svg")))
		.center({ lat: 44.6251, lon: -121.1295 })
		.zoom(14.5)
		.add(po.interact())
	
	map.add(po.image()
		.url(po.url("http://{S}tile.cloudmade.com"
		+ "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
		+ "/998/256/{Z}/{X}/{Y}.png")
		.hosts(["a.", "b.", "c.", ""])));
		
	map.add(po.geoJson()
		.features([{geometry: {coordinates: [-121.1295, 44.6251], type: "Point"}}])
		); 

	map.add(po.compass()
		.pan("none"));

});

//Location Page
$("div#Location").live("pageshow", function() {
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError, {enableHighAccuracy: true});
});

function PositionRefresh() { 
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError, {enableHighAccuracy: true});
}
function GeoSuccess(position) {
	var Lat = position.coords.latitude;
	var Lon = position.coords.longitude;
	var Alt = position.coords.altitude;
	var LAc = position.coords.accuracy;
	var AAc = position.coords.altitudeAccuracy;
	
	//Convert to SAE
	Alt = Alt * 3.28084;
	LAc = LAc * 3.28084;
	AAc = AAc * 3.28084;
	
	document.getElementById("LatitudeSpan").innerHTML = LocationFormatter.decimalLatToDMS(Lat, LocationFormatter.SOUTH);
	document.getElementById("LongitudeSpan").innerHTML = LocationFormatter.decimalLongToDMS(Lon, LocationFormatter.WEST);
	document.getElementById("LAccuracySpan").innerHTML = Math.round(LAc);
	document.getElementById("AltitudeSpan").innerHTML = Math.round(Alt);
	document.getElementById("AAccuracySpan").innerHTML = Math.round(AAc);
}

function GeoError() {
	alert('Error!');
}

$("div#viewer").live("pageshow", function() {
	//Resize Map Div
	$("#viewerIF").height($(window).height() - $("#ViewerHead").height() - 35);
});
