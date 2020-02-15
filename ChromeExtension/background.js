var endpoint = "http://104.210.105.202:8082"

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    

        const req = new XMLHttpRequest();

        req.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    console.log("Got response 200!");
                    sendResponse({status: "success"});
                } else {
                    console.log("failed to send message");
                    sendResponse({status: "failure"});

                }
                
            }
        }
        
        req.open("POST", endpoint + "/process-url", true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        req.send(JSON.stringify({
            Token: request.token,
            URL: request.url,
        }));          
    }
);