var endpoint = "http://localhost:8091"

const req = new XMLHttpRequest();

req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            console.log("Got response 200!");
        } else {
            console.log("failed to send message");
        }
        
    }
}

req.open("POST", endpoint + "/process-url", true);
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
chrome.storage.local.get(/* String or Array */["erosai_access_token"], function(items){
    console.log(window.location);

    if (!window.location.href.includes(endpoint)) {
        req.send(JSON.stringify({
            Token: items["erosai_access_token"],
            URL: window.location.href,
        }));
    }
});
