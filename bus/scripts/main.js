'use strict';

var BusApp = {};

// check to see if localStorage is 
// supported AND active on the browser
// source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

// use localStorage check from above
if (storageAvailable('localStorage')) {
	// show the "favorite" link
}
else {
	// hide the "favorite" link
}

// check to see if things are stored in localStorage
if(!localStorage.getItem('<thing>')) {
	// if specified things isn't found, do this:
	// thingAction();
} else {
	// else, do this:
	// otherThing();
}

var clearField = function(field) {
    $(field).empty();
}

BusApp.compileItem = function(template, item) {
    var source = template.html();
    var template = Handlebars.compile(source);
    return template(item);
}

BusApp.createOption = function(tagAtt, titleAtt) {
    var template = $("#dropdown-template");
    var output = $("#route");
    var optionObject = {
        tag: tagAtt,
        title: titleAtt
    };
    var compiledOption = BusApp.compileItem(template, optionObject);
    output.append(compiledOption);
}

BusApp.createOption2 = function(tagAtt, titleAtt, nameAtt, forUIAtt) {
    var template = $("#dropdown-template2");
    var output = $("#destination");
    var optionObject = {
        tag: tagAtt,
        title: titleAtt,
        name: nameAtt,
        ui: forUIAtt
    };
    var compiledOption = BusApp.compileItem(template, optionObject);
    output.append(compiledOption);
}

BusApp.createOption3 = function(tagAtt, titleAtt) {
    var template = $("#dropdown-template2");
    var output = $("#stops");
    var optionObject = {
        tag: tagAtt,
        title: titleAtt
    };
    var compiledOption = BusApp.compileItem(template, optionObject);
    output.append(compiledOption);
}

var routeDropdown = $("#route");
var destinationDropdown = $("#destination");
var stopsDropdown = $("#stops");
var directionDropdown = $("#direction");

var urlBase = "http://webservices.nextbus.com/service/publicXMLFeed";

// var ajaxData = function(command, route, stop) {

//     if (route == "") {
//         routeVal = "";
//         stopVal = "";
//     } else {
//         routeVal = "&r=" + route;
//         if (stop !== "") {
//             stopVal = "&s=" + stop + "&terse";
//         }
//     }

//     var request = $.ajax({
//         url: urlBase + "?command=" + command + "&a=mbta" + routeVal + stopVal,
//         dataType: "xml"
//     });

//     request.done(function(xmlData){
//         var jsonData = $.xmlToJSON(xmlData);

//         var route = jsonData.body.route;

//         for(var i = 0; i < route.length; i++) {
//             var tag = route[i]["@tag"];
//             var title = route[i]["@title"];
//             BusApp.createOption(tag, title);
//         }

//         console.dir(jsonData);
//         // console.log(JSON.stringify(jsonData));

//     });

//     request.fail(function(xmlData){
//         alert();
//     });
// }

// GET LIST OF ROUTES

function GetRoute() {
    var request = $.ajax({
    	url: urlBase + "?command=routeList&a=mbta",
    	dataType: "xml"
    });

    request.done(function(xmlData){
        var jsonData = $.xmlToJSON(xmlData);

        var route = jsonData.body.route;
        console.log("GetRoute: ", route);

        for(var i = 0; i < route.length; i++) {
            var tag = route[i]["@tag"];
            var title = route[i]["@title"];
            BusApp.createOption(tag, title);
        }

    });

    request.fail(function(xmlData){
    	alert();
    });

}

function GetDestination(routeNumber) {

    clearField("#destination");

    var request = $.ajax({
        url: urlBase + "?command=routeConfig&a=mbta&r=" + routeNumber,
        dataType: "xml"
    });

    request.done(function(xmlData){
        var jsonData = $.xmlToJSON(xmlData);

        var destination = jsonData.body.route.direction;
        console.log("GetDestination: ", destination);

        for(var i = 0; i < destination.length; i++) {
            var tag = destination[i]["@tag"];
            var title = destination[i]["@title"];
            var name = destination[i]["@name"];
            var forUI = destination[i]["@useForUI"];
            BusApp.createOption2(tag, title, name, forUI);
        }

    });

    request.fail(function(xmlData){
        alert();
    });
}

function GetStops(routeNumber) {

    clearField("#stops");

    var request = $.ajax({
        url: urlBase + "?command=routeConfig&a=mbta&r=" + routeNumber,
        dataType: "xml"
    });

    request.done(function(xmlData){
        var jsonData = $.xmlToJSON(xmlData);

        var stop = jsonData.body.route.stop;
        console.log("GetStops: ", stop);

        for(var i = 0; i < stop.length; i++) {
            var tag = stop[i]["@tag"];
            var title = stop[i]["@title"];
            BusApp.createOption3(tag, title);
        }

    });

    request.fail(function(xmlData){
        alert();
    });

}

function GetTimes(routeNumber, stopNumber) {

    clearField("#stops");

    var request = $.ajax({
        url: urlBase + "?command=predictions&a=mbta&r=" + routeNumber + "&s=" + stopNumber + "&terse",
        dataType: "xml"
    });

    request.done(function(xmlData){
        var jsonData = $.xmlToJSON(xmlData);

        var stop = jsonData.body.route.stop;

        for(var i = 0; i < stop.length; i++) {
            var tag = stop[i]["@tag"];
            var title = stop[i]["@title"];
            BusApp.createOption3(tag, title);
        }

    });

    request.fail(function(xmlData){
        alert();
    });

}

$(document).ready(function() {

    GetRoute();

	$(routeDropdown).on("change", function(){
        var routeTag = $(this).find("option:selected").data("tag");
        GetDestination(routeTag);
        GetStops(routeTag);
    });

});

// NextBus feed info
// https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf

// List the routes of the MBTA
// command=routeList
// http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=mbta

// Route Details (route 60 used as example)
// command=routeConfig
// NOTE: '&terse' added to hide unnecessary 'path' content
// http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=mbta&r=60&s=15291&terse

// Get prediction times (ex. route 39, stop 91391)
// command=predictions
// http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=39&s=91391

// Schedule for a route (ex. route 39)
// command=schedule
// http://webservices.nextbus.com/service/publicXMLFeed?command=schedule&a=mbta&r=39

// (?) Messages for a route (ex. route 39) (note: need to prove if this is correct)
// http://webservices.nextbus.com/service/publicXMLFeed?command=messages&a=mbta&r=39