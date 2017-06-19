var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest'];

// the headers
var h1 = document.getElementById("xForY");
var h2 = document.getElementById("favorites");

// the buttons
var createBtn = document.getElementById("create");
var faveBtn = document.getElementById("save");
var printBtn = document.getElementById("print");

// create blank "faves" array
var faves = [];

function randomize() {

	// trigger the math
	var random1 = Math.floor((Math.random() * startupX.length));
	var random2 = Math.floor((Math.random() * startupY.length));

	// creates a global variable called 'concatTxt'
	// concatenate the text and math outcome and update variable
	concatTxt = 'A startup that is ' + startupX[random1] + ', but for ' + startupY[random2];

	// clear the content in the h1...
	h1.innerHTML = '';

	// ...then display the newly generated output text
	h1.textContent = concatTxt;

}

createBtn.onclick = function() {
	/*
		Click Create button
		Trigger the function
			Randomize the text pairings
			Concatenate the message
			Clear any text in the h1
			Update the h1 with the new message
		Store the new message for later use
	*/

	// trigger the randomize function
	randomize();

	// creates a global variable called 'storedTxt'
	// stores the most recent value of 'concatTxt'
	storedTxt = concatTxt;

};

faveBtn.onclick = function() {
	/*
		Click Favorites button
		Add the current value to the new array
	*/

	// add existing 'storedTxt' value to the end of the 'faves' array
	faves.push(storedTxt);

};

printBtn.onclick = function() {
	/*
		Click Print button
		Go through the favorites array
		Print out each value in the array on a new line
	*/

	h2.innerHTML = '';

	// loop through the array, rendering the string for each index
	// within the H2, and adding a <br/> after each string
	for (var i = 0; i < faves.length; i++) {
		h2.innerHTML += faves[i] + '<br/>';
	};

};


/* 
=============================================
// CLASS SOLUTION
=============================================
*/

var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest'];
var startupIdea;
var favorites = [];

createStartup()

document.getElementById('create').onclick = createStartup;
document.getElementById('save').onclick = save;
document.getElementById('print').onclick = print;

function createStartup(){
  var random1 = Math.floor((Math.random() * startupX.length));
  var random2 = Math.floor((Math.random() * startupY.length));
  startupIdea = 'A startup that is ' + startupX[random1] + ', but for ' + startupY[random2];
  document.getElementById('xForY').innerHTML = startupIdea;
}
function save(){
  favorites.push(startupIdea);
  console.log(favorites);
}
function print(){
  document.getElementById('favorites').innerHTML = '';
  for(i=0;i<favorites.length;i++){
    document.getElementById('favorites').innerHTML += favorites[i] + '<br />';
  }
}
