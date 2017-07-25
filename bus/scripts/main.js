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
    var output = $("#direction");
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
var directionDropdown = $("#direction");
var stopsDropdown = $("#stops");

var urlBase = "http://webservices.nextbus.com/service/publicXMLFeed";

function GetRoute() {
    var request = $.ajax({
    	url: urlBase + "?command=routeList&a=mbta",
    	dataType: "xml"
    });

    request.done(function(data){
        var routeData = $.xmlToJSON(data);

        var route = routeData.body.route;
        console.log("GetRoute: ", route);

        for(var i = 0; i < route.length; i++) {
            var tag = route[i]["@tag"];
            var title = route[i]["@title"];
            BusApp.createOption(tag, title);
        }

    });

    request.fail(function(data){
    	alert();
    });

}

var stopData;

function GetDirection(routeNumber) {

    var request = $.ajax({
        url: urlBase + "?command=routeConfig&a=mbta&r=" + routeNumber,
        dataType: "xml"
    });

    request.done(function(data){
        stopData = $.xmlToJSON(data);

        var direction = stopData.body.route.direction;

        var dropdown = $("#direction");

        dropdown.children().hide();

        for(var i = 0; i < direction.length; i++) {
            var tag = direction[i]["@tag"];
            var title = direction[i]["@title"];
            var name = direction[i]["@name"];
            var option = "<option value='" + tag + "' data-name='" + name + "' data-title='" + title + "'>" + name + " to " + title + "</option>";
            if (name == "Inbound") {
                dropdown.prepend(option);
            } else {
                dropdown.append(option);
            }
        }

        if (direction != null) {
            var firstOption = "<option disabled selected>Select Route</option> ";
            dropdown.prepend(firstOption);
        }

        dropdown.children().fadeIn();

    });

    request.fail(function(data){
        alert();
    });
}

// function GetStops(routeNumber) {

//     clearField("#stops");

//     // var request = $.ajax({
//     //     url: urlBase + "?command=routeConfig&a=mbta&r=" + routeNumber,
//     //     dataType: "xml"
//     // });

//     // request.done(function(xmlData){
//     //     var jsonData = $.xmlToJSON(xmlData);

//     //     var stop = jsonData.body.route.stop;
//     //     console.log("GetStops: ", stop);

//     //     for(var i = 0; i < stop.length; i++) {
//     //         var tag = stop[i]["@tag"];
//     //         var title = stop[i]["@title"];
//     //         BusApp.createOption3(tag, title);
//     //     }

//     // });

//     // request.fail(function(xmlData){
//     //     alert();
//     // });

// }

$(document).ready(function() {

    GetRoute();
	
    $(routeDropdown).on("change", function(){

        clearField("#direction");
        clearField("#stops");

        var routeTag = $(this).find("option:selected").data("tag");

        GetDirection(routeTag);
    });

    $(directionDropdown).on("change", function(){
        
        clearField("#stops");

        var dropdown = $("#stops");

        console.log(stopData);
        var tag = $(this).val();
        var routeData = stopData.body.route;
        for (var k = 0; k < routeData.direction.length; k++) {
            if (routeData.direction[k]["@tag"] == tag) {
                var direction = routeData.direction[k];
                break;
            }
        }
        for (var m = 0; m < direction.stop.length; m++) {
            for (var p = 0; p < routeData.stop.length; p++) {
                if (routeData.stop[p]["@tag"] == direction.stop[m]["@tag"]) {
                    var stopTag = routeData.stop[p]["@tag"];
                    var stopTitle = routeData.stop[p]["@title"];
                    var option = "<option value='" + stopTag + "' data-title='" + stopTitle + "'>" + stopTitle + "</option>";
                    dropdown.append(option);
                }
            }
        }

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