/* 
this file contains functions required for the user to plan the trip
*/
"use strict";

mapboxgl.accessToken = "pk.eyJ1IjoidGVhbTEyNiIsImEiOiJja2ZwNXZ4cnQwN3diMnhyNWV4ejJpNWFwIn0.tR6rWRqLKTIXWxPaXCO5rQ";
let map = new mapboxgl.Map({
	container: 'map',
	center: [151.488,-32.7033],  
	zoom: 7,
	style: 'mapbox://styles/mapbox/streets-v9'
});

/* 
when the map is loaded, this function pans the map to the source airport 
*/
map.on("load",function panToLocation()
{   
    let panLocation = [151.488,-32.7033];
	map.panTo(panLocation);
});

/* 
when the map is loaded, this function will display the show a polyline path which represents the routes from the source airport to the end airport
*/

map.on("load", function showPath() {
	let object = 
    {
        type: "geojson",
        data: {
        type: "Feature",
        properties: {},
        geometry: {
        type: "LineString",
        coordinates: []
        }
        }
        };
        
        for(let i = 0; i < locations.length; i++)
        {
        object.data.geometry.coordinates.push(locations[i].coordinates);
        }
        
        map.addLayer({
        id: "routes",
        type: "line",
        source: object,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#888", "line-width": 6 }
        });
	});

// To display the 3 airports with orange markers and pop up information (assume user selected 2 routes)
let locations = 
[
	{
		coordinates: [151.488,-32.7033],
		description: 'Source Airport: Maitland Airport'
	},
	{
		coordinates: [149.611,-32.5625],
		description: 'Route 1 <br> Landing destination: Mudgee Airport <br> Airline: 2B <br> Stops: 0'
	},
	{
		coordinates: [150.832,-32.0372],
		description: 'Route 2 <br> Landing destination: Scone Airport <br> Airline: 2G <br> Stops: 0'
    }
];

for (let i = 0; i < locations.length; i++)
{
	let location = locations[i];
	let marker = new mapboxgl.Marker({ "color": "#FF8C00" }); // HEX value for orange color
	marker.setLngLat(location.coordinates);

	let popup = new mapboxgl.Popup({ offset: 45});
	popup.setHTML(location.description);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}

// When user click add route
function addDestinationArportRoute()
{
	// do something to add the line to map and chose the DAS as new AS and show all routes from new AS
	// retrieve data from temp local storage
	trip.fromData(tempGetDataLocalStorage());
	
}

// When user click confirm
function confirm()
{
	// save the information to local storage then nav user to newUserTripInfo page
	window.location("newUserTripInfo.html")
}

// When user click undo
function undo()
{
	// revert to previous action

}
