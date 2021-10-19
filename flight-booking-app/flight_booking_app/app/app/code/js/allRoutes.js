/* 
this file contains the codes that run on load in newUserAllRoutesPage.html and oldUserAllRoutesPage.html
*/

"use strict";

/* 
this function obtains the input value by the user (selected country) and makes a request to the AllRoutes API web service
*/
function getRouteData() {
	// get reference to the selected country
	let countryRef = document.getElementById("country");
	let country = countryRef.value;

	// define data object that will be passed on as parameters to the webServiceRequest function
	let data1 = {
		country: country,
		callback: "showAllRoutes"
	};

	// define url that will be passed on as parameters to the webServiceRequest function
	let url1 = `https://eng1003.monash/OpenFlights/allroutes/`;

	// call webServiceRequest function to send request to the web service
	webServiceRequest(url1, data1);
}

/* 
this function obtains the input value by the user (selected country) and makes a request to the Airports API web service
*/
function getAirportData() {
	// get reference to the selected country
	let countryRef = document.getElementById("country");
	let country = countryRef.value;

	// define data object that will be passed on as parameters to the webServiceRequest function
	let data2 = {
		country: country,
		callback: "showAllAirports"
	};

	// define url that will be passed on as parameters to the webServiceRequest function
	let url2 = `https://eng1003.monash/OpenFlights/airports/`;

	// call webServiceRequest function to send request to the web service
	webServiceRequest(url2, data2);
}

/*
this function is the callback function defined in the query string for the Airport API
- takes in a parameter "data" which is the data returned by the web service
*/
function showAllAirports(data) {

	// redefining the map
	mapboxgl.accessToken = "pk.eyJ1IjoidGVhbTEyNiIsImEiOiJja2ZwNXZ4cnQwN3diMnhyNWV4ejJpNWFwIn0.tR6rWRqLKTIXWxPaXCO5rQ";
	let map = new mapboxgl.Map({
		container: 'map',
		center: [-74.5, 40], // starting position
		zoom: 5,
		style: 'mapbox://styles/mapbox/streets-v9'
	});

	// sets the map centre to one of the airports coordinates within the selected country (the first airport within the array in this case)
	map.setCenter([data[0].longitude, data[0].latitude]);

	for (let i = 0; i < data.length; i++) {

		// display all available airports within the country
		let locations =
			[
				{
					coordinates: [data[i].longitude, data[i].latitude],
					description: `Airport name: ${data[i].name}`
				}
			];

		for (let j = 0; j < locations.length; j++) {
			let location = locations[j];
			let marker = new mapboxgl.Marker({ "color": "red" });
			marker.setLngLat(location.coordinates);

			let popup = new mapboxgl.Popup({ offset: 45 });
			popup.setHTML(location.description);

			marker.setPopup(popup)

			// Display the marker.
			marker.addTo(map);
		}

		// push all airport ids, latitudes and longitudes into their respective arrays of class instance
		route.addAirportId(data[i].airportId);
		route.addLongitude(data[i].longitude);
		route.addLatitude(data[i].latitude);
	}
	map.on("load", function filterDomesticRoutes() {
		for (let i = 0; i < route.sourceAirportIds.length; i++) {



			if (route.airportIds.includes(route.sourceAirportIds[i])) {
				// find index in the airportIds array that matches the source airport id
				let arrayIndex1 = route.airportIds.findIndex(
					function (id) { return id == route.sourceAirportIds[i]; }
				);

				// define source longitude and latitude
				let sourceLongitude = route.longitude[arrayIndex1];
				let sourceLatitude = route.latitude[arrayIndex1];

				if (route.airportIds.includes(route.destinationAirportIds[i])) {
					// find index in the airportIds array that matches the destination airport id
					let arrayIndex2 = route.airportIds.findIndex(
						function (id) { return id == route.destinationAirportIds[i]; }
					);
					// define destination longitude and latitude
					let destinationLongitude = route.longitude[arrayIndex2];
					let destinationLatitude = route.latitude[arrayIndex2];

					let randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // generates random id for each layer
					map.addSource(`${randomId}`, {
						type: "geojson",
						data: {
							type: "Feature",
							properties: {},
							geometry: {
								type: "LineString",
								coordinates: [
									[sourceLongitude, sourceLatitude],
									[destinationLongitude, destinationLatitude]
								]
							}
						}
					});
					map.addLayer({
						id: `${randomId}`,
						type: "line",
						source: `${randomId}`,
						layout: {
							"line-join": "round",
							"line-cap": "round"
						},
						paint: {
							"line-color": `#${Math.random().toString(16).substr(-6)}`, // generate random colour polylines
							"line-width": 8
						}
					});
				}
			}
		}
	});
}


/*
this function is the callback function defined in the query string for the All Routes API
- takes in a parameter "data" which is the data returned by the web service
*/
function showAllRoutes(data) {

	// looping over every data array returned from the web service
	for (let i = 0; i < data.length; i++) {
		// storing source airport ids into the sourceAirportIds array of the class instance
		route.addSourceAirportId(`${data[i].sourceAirportId}`);

		// storing destination airport ids into the destinationAirportIds array of the class instance
		route.addDestinationAirportId(`${data[i].destinationAirportId}`);
	}
	getAirportData();
}

// run when page loads
// define the map in the page
mapboxgl.accessToken = "pk.eyJ1IjoidGVhbTEyNiIsImEiOiJja2ZwNXZ4cnQwN3diMnhyNWV4ejJpNWFwIn0.tR6rWRqLKTIXWxPaXCO5rQ";
let map = new mapboxgl.Map({
	container: 'map',
	center: [62.2283, 34.210017], // starting position
	zoom: 4,
	style: 'mapbox://styles/mapbox/streets-v9'
});


// this section of code populates the list of countries using countries.js 
// get reference to the datalist with id "countryList"
let countryListRef = document.getElementById("countryList");
let output = "";

// loop over every country in the countryData array of countries.js 
for (let i = 0; i < countryData.length; i++) {
	output += `<option value="${countryData[i]}"></option>`;
}

// display countries to user
countryListRef.innerHTML = output;