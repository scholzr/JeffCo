// Main control file

$.mobile.defaultPageTransition = "none"

//Hydrant Page
$(document).on("pageshow", "div#Hydrants", function() {
	//Resize Map Div
	$("#map-canvas").height($(window).height() - $("#HydrantHead").height() - $("#foot").height() - 35);
	
	document.getElementById("map-canvas").innerHTML = ""
	RefreshMap();
});

$(window).resize(function() {
	//Resize Map Div
	$("#map-canvas").height($(window).height() - $("#HydrantHead").height() - $("#foot").height() - 35);	
});

function handleNoGeolocation(errorFlag) {
  var options = {
    map: map,
    position: new google.maps.LatLng(44.6251, -121.1295),
    content: content
  };

  map.setCenter(options.position);
}

//Location Page
$(document).on("pageshow", "div#Location", function() {
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError, {enableHighAccuracy: true});
});

function PositionRefresh() { 
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError, {enableHighAccuracy: true});
}
function GeoSuccess(position) {
	$.mobile.loading( "show", {
		text: "Loading",
		textVisible: true,
		theme: "a",
		html: ""
	});
	
	var Lat = position.coords.latitude;
	var Lon = position.coords.longitude;
	var Alt = position.coords.altitude;
	var LAc = position.coords.accuracy;
	var AAc = position.coords.altitudeAccuracy;
	
	//Convert to SAE
	Alt = Alt * 3.28084;
	LAc = LAc * 3.28084;
	AAc = AAc * 3.28084;
	
	setTimeout(function(){
		document.getElementById("LatitudeSpan").innerHTML = LocationFormatter.decimalLatToDMS(Lat, LocationFormatter.SOUTH);
		document.getElementById("LongitudeSpan").innerHTML = LocationFormatter.decimalLongToDMS(Lon, LocationFormatter.WEST);
		document.getElementById("LAccuracySpan").innerHTML = Math.round(LAc);
		document.getElementById("AltitudeSpan").innerHTML = Math.round(Alt);
		document.getElementById("AAccuracySpan").innerHTML = Math.round(AAc);
		$.mobile.loading( "hide" );
	},500);
}

function GeoError() {
	alert('Error!');
}

$(document).on("pageshow", "div#viewer", function() {
	//Resize Map Div
	$("#viewerIF").height($(window).height() - $("#ViewerHead").height() - 35);
});

function OpenPage(url) {
	var ref = window.open(url, '_blank');
}

function RefreshMap() {
	$.mobile.loading( "show", {
		text: "Loading",
		textVisible: true,
		theme: "a",
		html: ""
	});
	
	setTimeout(function(){
		var map;
		  var mapOptions = {
			zoom: 15,
			//center: new google.maps.LatLng(44.6251, -121.1295),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'),
			  mapOptions);
		
			  // Try HTML5 geolocation
		  if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			  var pos = new google.maps.LatLng(position.coords.latitude,
											   position.coords.longitude);
		
			  map.setCenter(pos);
			  
			}, function() {
			  handleNoGeolocation(true);
			});
		  } else {
			// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		  }
		var green = 'icons/green.fw.png';
		var yellow = 'icons/yellow.fw.png';
		var red = 'icons/red.fw.png';
		  var myLatLng = new google.maps.LatLng(44.6251, -121.1295);
		  var beachMarker = new google.maps.Marker({
			  position: myLatLng,
			  map: map,
			  icon: green
		  });
		  var myLatLng = new google.maps.LatLng(44.6261, -121.1295);
		  var beachMarker = new google.maps.Marker({
			  position: myLatLng,
			  map: map,
			  icon: yellow
		  });
		  var myLatLng = new google.maps.LatLng(44.6271, -121.1295);
		  var beachMarker = new google.maps.Marker({
			  position: myLatLng,
			  map: map,
			  icon: red
		  });
		$.mobile.loading( "hide" );
	},500);
	
};