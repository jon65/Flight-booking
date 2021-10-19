/** 
 * shared.js 
 * This file contains shared code that runs on all pages
 */

"use strict";


// Constants used as KEYS for LocalStorage
const TRIP_INDEX_KEY = "selectedRouteIndex";
const TRIP_DATA_KEY = "routeLocalData";
const ACC_INDEX_KEY = "selectedAccIndex";
const ACC_DATA_KEY = "accountLocalData";
const TEMP_TRIP_DATA_KEY = "tempUserTrip";

/* Account Class
This class is responsible for holding data about a single Account
*/
class Account {
    // constructor
    constructor(username = "") {
        this._email = "";
        this._password = "";
        this._username = username;
        this._trips = [];

    }

    // accessor
    get email() { return this._email; }
    get password() { return this._password; }
    get username() { return this._username; }
    get trips() { return this._trips; }

    // mutator
    set email(email) {
        this._email = email;
    }

    set password(password) {
        this._password = password;
    }

    set username(username) {
        this._username = username;
    }

    // public methods
    addTrip(id) {
        let trip = new Trip(id);
        this._trips.push(trip);
    }

    removeTrip(id) {
        let tripIndex = this._trips.findIndex(
            function (trip) { return trip.id == id; }
        );
        this._trips.splice(tripIndex, 1); // removes the trip with the id from the array
    }

    getTrip(index) {
        return this._trips[index];
    }

    fromData(data) {
        this._email = data._email;
        this._password = data._password;
        this._username = data._username;

        let tempData = data._trips;
        this._trips = [];
        for (let i = 0; i < tempData.length; i++) {
            let trip = new Trip();
            trip.fromData(tempData[i]);
            this._trips.push(trip);
        }
    }
}


/* 
Account List Class
This class is responsible for holding data about the list of accounts
*/
class AccountList {
    // constructor
    constructor() {
        this._accounts = [];
    }

    // accessor
    get accounts() { return this._accounts; }
    get count() { return this._accounts.length; }


    // public methods
    addAccount(username) {
        let account = new Account(username);
        this._accounts.push(account);
    }

    getAccount(index) {
        return this._accounts[index];
    }

    fromData(data) {
        let tempData = data._accounts;
        this._accounts = [];
        for (let i = 0; i < tempData.length; i++) {
            let account = new Account();
            account.fromData(tempData[i]);
            this._accounts.push(account);
        }
    }
}

/*
Trip Class
This class is responsible for holding data about a single Trip
*/
class Trip {
    // constructor
    constructor(id = "") {
        this._id = id;
        this._country = "";
        this._date = "";
        this._totalStops = 0;
        this._routes = [];

    }

    // accessor
    get country() { return this._country; }
    get date() { return this._date; }
    get totalStops() { return this._routes.length - 1; }
    get routes() { return this._routes; }

    // mutator
    set country(country) {
        this._country = country;
    }
    set date(date) {
        this._date = date;
    }
    set totalStops (number)
    {   
        this._totalStops = number;
    }

    // public methods
    addRoute(route) {
        this._routes.push(route);
    }

    getRoute(index) {
        return this._routes[index];
    }

    removeRoute(destinationAirport, airline, stops) {
        let routeIndex = this._routes.findIndex(
            function (route) { return route.destinationAirport == destinationAirport && route.airline == airline && route.stops == stops; }
        );
        this._routes.splice(routeIndex, 1);
    }

    fromData(data) {
        this._id = data._id;
        this._country = data._country;
        this._date = data._date;
        this._stops = data._stops;

        let tempData = data._routes;
        this._routes = [];
        for (let i = 0; i < tempData.length; i++) {
            let route = new Route();
            route.fromData(tempData[i]);
            this._routes.push(route);
        }
    }
}

/*
Route Class
This class is responsible for holding data about a single Route
*/
class Route {
    // constructor
    constructor() {
        this._airline = "";
        this._stops = 0;
        this._sourceAirport = [];
        this._sourceAirportIds = [];
        this._destinationAirport = [];
        this._destinationAirportIds = [];
        this._airportIds = [];
        this._longitude = [];
        this._latitude = [];
    }

    // accessor
    get airline() { return this._airline; }
    get stops() { return this._stops; }
    get sourceAirport() {return this._sourceAirport; }
    get sourceAirportIds() { return this._sourceAirportIds; }
    get destinationAirport() { return this._destinationAirport; }
    get destinationAirportIds() { return this._destinationAirportIds; }
    get airportIds() { return this._airportIds; }
    get longitude() { return this._longitude; }
    get latitude() { return this._latitude; }

    // mutator
    set airline(name)
    {
        this._airline = name;
    }

    // public methods
    addSourceAirport(name) {
        return this._sourceAirport.push(name);
    }

    addSourceAirportId(id) {
        return this._sourceAirportIds.push(id);
    }

    addDestinationAirportSource(name) {
        return this._destinationAirport.push(name);
    }

    addDestinationAirportId(id) {
        return this._destinationAirportIds.push(id);
    }

    addAirportId(id) {
        return this._airportIds.push(id);
    }

    addLongitude(ltd)
    {   
        return this._longitude.push(ltd);
    }

    addLatitude(lat)
    {   
        return this._latitude.push(lat);
    }

    fromData(data) {
        this._destinationAirport = data._destinationAirport;
        this._airline = data._airline;
        this._stops = data._stops;
    }
}

// Global instance variables (not sure what to add here)
let accounts = new AccountList();
let route = new Route();
let trip = new Trip();

/*
This function is responsible for checking if the data exist in local storage at the defined key
*/
function checkIfDataExistsLocalStorage() {
    // retrieve the data at the key ACC_DATA_KEY
    let accData = localStorage.getItem(ACC_DATA_KEY);
    if (accData && typeof (accData) !== "undefined" && accData !== null && accData !== "") {
        return true;
    }
    else {
        return false;
    }
}

/*
This function will store the parameter "data" in the local storage
*/
function updateLocalStorage(data) {
    localStorage.setItem(ACC_DATA_KEY, JSON.stringify(data));

}

/*
This function will retrieve data from local storage
*/
function getDataLocalStorage() {
    return JSON.parse(localStorage.getItem(ACC_DATA_KEY));
}

/*
This function will store the parameter "data" in the local storage temp (new user)
*/
function tempUpdateLocalStorage(data) {
    localStorage.setItem(TEMP_TRIP_DATA_KEY, JSON.stringify(data));
}

/*
This function will retrieve data from local storage for temp (new user)
*/
function tempGetDataLocalStorage() {
    return JSON.parse(localStorage.getItem(TEMP_TRIP_DATA_KEY));
}

/*
This function will alert the user that they are not logged in, hence cannot access scheduled trips and history trips page
*/
function notLoggedIn()
{   
    alert("You are not logged in. Please log in.");
}

/* 
This function will direct the user to the sign up page
*/
function toSignUpPage() {
    for (let i = 0; i < accounts.accounts.length; i++) {
        localStorage.setItem(ACC_INDEX_KEY, `${i}`);
    }
    window.location = "signUpPage.html";
}

/* 
This function will direct the user to the log in page
*/
function toLogInPage() {
    window.location = "logInPage.html";
}

/* 
This function will direct the user to the new user home page
*/
function toHomePage() {
    window.location = "newUserIndex.html";
}

/* 
This function will direct the user to the old user home page
*/
function toOldHomePage() {
    window.location = "oldUserIndex.html";
}

/* 
This function will direct the user to the scheduled trip page
*/
function toScheduledTripsPage() {
    window.location = "scheduledTripsPage.html";
}

/* 
This function will direct the user to the trip history page
*/
function toTripHistoryPage() {
    window.location = "historyTripPage.html";
}

/* 
This function will direct the user to the new user all routes page
*/
function toAllRoutesPage() {
    window.location = "newUserAllRoutesPage.html";
}

/* 
This function will direct the user to the old user all routes page
*/
function toOldAllRoutesPage() {
    window.location = "oldUserAllRoutesPage.html";
}



// code that will run on load 
// If data exist, retrieve it from local storage
if (checkIfDataExistsLocalStorage()) {
    let dataExist = getDataLocalStorage();
    accounts = new AccountList();
    accounts.fromData(dataExist);

   
}
// If data does not exist, add account with "new user" username
else {
    accounts.addAccount("");
    updateLocalStorage(accounts);

    
20}
