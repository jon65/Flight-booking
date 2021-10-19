/*
This file contains code that will run on load at the logInPage.html
*/
"use strict";


function logInAccount() {

    // get reference for each account information
    let emailAddressRef = document.getElementById("emailAddress");
    let passwordRef = document.getElementById("password");

    // for loop to go through each of the accounts array in the accounts global instance
    for (let i = 0; i < accounts.accounts.length; i++) {

        // if the email is existing and if the email matches the password then only user can log in.
        if (emailAddressRef.value == accounts.accounts[i].email && passwordRef.value == accounts.accounts[i].password) {

            // update the index of the account into local storage 
            localStorage.setItem(ACC_INDEX_KEY, `${i}`);

            // redirect user back to homepage
            window.location = "oldUserIndex.html";
        }
    }
}