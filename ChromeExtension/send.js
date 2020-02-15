console.log(window.location.href);

const req = new XMLHttpRequest();
const baseUrl = "https://myserver.com/login";

req.open("POST", baseUrl, true);
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.send("asdasdsd");

req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            console.log("Got response 200!");
        } else {
            console.log("failed to send message");
        }
        
    }
}