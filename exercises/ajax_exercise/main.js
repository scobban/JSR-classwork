/*

- Refactor the codealong to work with user interaction. In the index.html file
there is a "Get Consumer Finance Data" button. When the user clicks the button,
pull data from the provided link above (http://data.consumerfinance.gov/api/views.json).
Handle the link success and error responses accordingly, displaying results in
console.log() if successful.

- Separate your logic so that you can use your functions for another user button
click of "Get Custom Data". Interact with an API of your choice and handle both
success and error scenarios.
*/

'use strict';
(function() {

    document.getElementById('getDataButton').onclick = function() {
        console.log('making a request');

        // Create instance of XMLHTTPRequest 
        var httpRequest = new XMLHttpRequest();
        // Open method accepts 3 parameter:
        // 1. Request type: these are all the HTTP verbs we covered above
        // 2. The URL
        // 3. Optional boolean third parameter, that dictates wether this is an asynchronous call (default is true)
        httpRequest.open('GET', 'http://data.consumerfinance.gov/api/views.json');

        // The send method takes an optional parameter. If our API request allows additional parameters or JSON objects to be passed through (primarily through POST requests), we pass them in the send method.
        httpRequest.send();
        // Set a custom function to handle the request
        httpRequest.onreadystatechange = responseMethod;

    };

    function responseMethod() {
        // Check if our state is "DONE"
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // If our request was successful we get a return code/status of 200
            if (httpRequest.status === 200) {
                // This is where we update our UI accordingly. Our data is available to us through the responseText parameter
                console.log(httpRequest.responseText);
            } else {
                // This is the scenario that there was an error with our request
                console.log('There was a problem with the request.');
            }
        }
    }

    // Alternative method:
    // httpRequest.onreadystatechange = function() {
    //   
    // }
})();
