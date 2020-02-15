var endpoint = "http://localhost:8091"

window.onload = function() {
    setupButtons();

    document.getElementById("body").addEventListener('click', function(event) {
        event.preventDefault();

        if (event.target.id == "login") {
            setToLoginMode()
        } else if (event.target.id == "register") {
            chrome.tabs.create({url: endpoint + "/html/register.html"});
        } else if (event.target.id == "submit") {

            username = document.getElementById("username").value;
            password = document.getElementById("password").value;
            console.log(username);
            var r = new XMLHttpRequest();
            r.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        console.log(this.response);

                        chrome.storage.local.set({"isLoggedIn": "true" }, function(){});
                        chrome.storage.local.set({"erosai_access_token": this.response}, function(){});
                        setToButtonMode();

                    } else if (this.status == 400) {
                        document.location.reload(true)
                        alert("Username or Password was not recognized")
                    } else {
                        alert("OOPS! Something went hideously wrong, contact an admin.")
                    }
                }
            };
            
            r.open("POST", endpoint + "/login-attempt", true);
            r.setRequestHeader('Content-Type', 'application/json');
            r.send(JSON.stringify({
                Username: username,
                Password: password,
            }));
            
        } else if (event.target.id == "logout") {
            chrome.storage.local.set({"isLoggedIn": "false" }, function(){});
            setToLogOutState();
        } else if (event.target.id == "recommendations" && event.target.disabled == false) {
            chrome.storage.local.get(["erosai_access_token"], function(items){
                chrome.tabs.create({url: endpoint + "/html/recommend.html?token=" + items["erosai_access_token"]});
            });
        }
        // alert("hello");
        //validation code to see State field is mandatory.  
    });
}

function setupButtons() {
    chrome.storage.local.get(["isLoggedIn"], function(items){
        if (items["isLoggedIn"] == "true") {
            document.getElementById("login").style.display = "none";
            document.getElementById("status").innerHTML = "You are Logged In";
            document.getElementById("logout").style.display = "block";
            document.getElementById("recommendations").disabled = false;
        } else {
            setToLogOutState();
        }
    });
}

function setToButtonMode() {
    document.getElementById("button-holder").style.display = "block";
    document.getElementById("login-holder").style.display = "none";
    setupButtons();
}

function setToLoginMode() {
    document.getElementById("button-holder").style.display = "none";
    document.getElementById("login-holder").style.display = "block";
}
function setToLogOutState() {
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("status").innerHTML = "You are Logged Out";
    document.getElementById("recommendations").disabled = true;
}




// chrome.storage.local.get(/* String or Array */["phasersTo"], function(items){
//     alert(items["phasersTo"])
//     //  items = [ { "phasersTo": "awesome" } ]
// });