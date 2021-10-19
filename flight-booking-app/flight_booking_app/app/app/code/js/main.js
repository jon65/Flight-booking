/*
this file contains codes that run on load in the index.html page
*/
"use strict"


/*
this function obtains the input value by the user (selected country) and makes a request to the Airports API web service
*/
function getData()
{   
    // get reference to the selected country
let countryRef = document.getElementById("country");
let country = countryRef.value;

// define data object that will be passed on as parameters to the webServiceRequest function
let data = {
    country: country,
    callback: "showAirportList"
};

// define url that will be passed on as parameters to the webServiceRequest function
let url = `https://eng1003.monash/OpenFlights/airports/`;

// call webServiceRequest function from service.js to send request to the web service
webServiceRequest(url, data);
}


/*
this function is the callback function defined in the query string for the Airports API
- takes in a parameter "data" which is the data returned by the web service
*/
function showAirportList(data)
{   
    // append output as empty string
    let output = "";

    // use a for loop to go through the data array and generate the HTML string in the drop-down list with id "airportSource"
    for (let i = 0; i < data.length; i++)
    {   
        output += `<option value="${data[i].airportId}">${data[i].name}</option>`;
    }

    // display to user
    let airportSourceRef = document.getElementById("airportSource");
    airportSourceRef.innerHTML = output;
}



/*
This function will redirect the new user to the new user map view page upon clicking the "Next" button if user is not logged in
*/
function toNewMapViewPage()
{
    // get the value of the option tag for the specific airport selected
    let airportSourceIdRef = document.getElementById("airportSource");
    let airportSourceId = airportSourceIdRef.options[airportSourceIdRef.selectedIndex].value;
    let airportSource = airportSourceIdRef.options[airportSourceIdRef.selectedIndex].text;
    let countryRef = document.getElementById("country");
    let countryName = countryRef.value;

    // get the value of the date selected
    let startDateRef = document.getElementById("startDate");
    let startDate = startDateRef.toLocalDateString().value;
    alert(`${startDate}`)

    // put necessary data into the route class
    route.addSourceAirport(airportSource);
    route.addSourceAirportId(airportSourceId);

    // put necessary data into trip class and mutate the trip class
    trip.addRoute(route);
    trip.country = countryName;
    trip.date = startDate;

    // store it to temp local storage for new user
    tempUpdateLocalStorage(trip);

    // nav user to newUserMapView page
    window.location = "newUserMapView.html";
}

/*
This function will redirect old user to the old map view page upon clickling the "Next" button if user is logged in
*/
function toOldMapViewPage()
{
     // get reference for country, date and source airport, then store into local storage
   
    //do something (store id in local storage) then nav user to oldUserMapView page
    window.location = "oldUserMapView.html";
}

// run when page loads
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