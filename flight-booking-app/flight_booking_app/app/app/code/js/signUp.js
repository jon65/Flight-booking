/*
This file contains code that will run on load at the signUpPage.html
*/
"use strict";

// Retrieve the stored index from local storage
let accountIndex = localStorage.getItem(ACC_INDEX_KEY);

// using the getAccount method, retrieve the current Account instance
let account = accounts.getAccount(accountIndex);

/*
This function creates a new account and adds it to the AccountList instance
*/
function addNewAccount() {
    // get reference for each account information
    let usernameRef = document.getElementById("username");
    let emailAddressRef = document.getElementById("emailAddress");
    let passwordRef = document.getElementById("password");

    // if password is more than 8 characters long as required, then only account will be created. If not, display error message
     if (passwordRef.value.length < 8)
    {   
        alert("Password must be at least 8 characters long");
    }
    // if username has been taken, display error message
    else if(usernameRef.value === account.username)
    {   
        alert("Username has already been taken. Please choose another username.");
    }
    else
    {
        // update account data (username, email, password)
        account.username = usernameRef.value;
        account.email = emailAddressRef.value;
        account.password = passwordRef.value;

        // add the account into the Account List
        accounts.addAccount(account.username);

        // update local storage
        updateLocalStorage(accounts);

        // redirect user back to homepage
        window.location = "logInPage.html";
    }
}