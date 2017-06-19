var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest'];

// the headers
var h1 = document.getElementById("xForY");
var h2 = document.getElementById("favorites");

// the buttons
var createBtn = document.getElementById("create");
var saveBtn = document.getElementById("save");
var printBtn = document.getElementById("print");

// store the text within the h1
var storedTxt = h1.innerText;

// create blank "faves" array
var faves = [];

createBtn.onclick = function() {

	// trigger the math
	var random1 = Math.floor((Math.random() * startupX.length));
	var random2 = Math.floor((Math.random() * startupY.length));

	// concatenate the text and math outcome
	var concatTxt = 'A startup that is ' + startupX[random1] + ', but for ' + startupY[random2];

	// clear the text in the h1...
	var outputTxt = h1.innerText = '';

	// ...then display the newly generated output text
	h1.innerText = concatTxt;

	// update global var 'storedTxt' with new value
	storedTxt = concatTxt;

};

saveBtn.onclick = function() {

	// add existing 'storedTxt' value to the end of the 'faves' array
	faves.push(storedTxt);

};

printBtn.onclick = function() {

	// list the favorites, separated by a space, dash, and space
	h2.innerText = faves.join(' // ');

};
