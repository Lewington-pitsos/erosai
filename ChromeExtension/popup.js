window.onload = function() {
    chrome.storage.local.get(/* String or Array */["isLoggedIn"], function(items){
        if (items["isLoggedIn"] == "true") {
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
            document.getElementById("recommendations").disabled = false;
        } else {
            setToLogOutState();
        }

    });
    document.getElementById("body").addEventListener('click', function(event) {

        if (event.target.id == "login") {
            document.getElementById("button-holder").style.display = "none";
            document.getElementById("login-holder").style.display = "block";
        } else if (event.target.id == "register") {
            alert("registering");
        } else if (event.target.id == "submit") {
            chrome.storage.local.set({"isLoggedIn": "true" }, function(){});
        } else if (event.target.id == "logout") {
            chrome.storage.local.set({"isLoggedIn": "false" }, function(){});
            setToLogOutState();
        }
        // alert("hello");
        //validation code to see State field is mandatory.  
    });
}

function setToLogOutState() {
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("recommendations").disabled = true;
}




// chrome.storage.local.get(/* String or Array */["phasersTo"], function(items){
//     alert(items["phasersTo"])
//     //  items = [ { "phasersTo": "awesome" } ]
// });