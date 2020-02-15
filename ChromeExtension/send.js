var endpoint = "http://104.210.105.202:8082"

chrome.storage.local.get(/* String or Array */["erosai_access_token"], function(items){
    var URL = window.location.href


    if (!URL.includes(endpoint) && !URL.includes("www.google.com/search")) {
        console.log("seinding url" + URL);
        console.log("token " + items["erosai_access_token"]);
        chrome.runtime.sendMessage({url: URL, token: items["erosai_access_token"]}, function(response) {
            console.log(response.status);
        });
    }
});
