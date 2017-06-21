	'use strict';

var MyApp = {};

// Blog App
// Use the todo app as an example of how this app should work.
// 1) Make it so that you can add a comment, use handlebars for templating. Add comment to a javascript array.
// 1a) Comment should include the users name, email address and their comment
// 2) Create list of existing comments and add them on page load to the comment section
// 3) Make it so that a comment can get deleted, also deleting it from the array
// 4) BONUS: Make the other comment section work
// 5) BONUS: Make it so that you can edit a comment

MyApp.existingComments = [
	[
		{
			cmtName: "Roger Podacter",
			cmtEmail: "rpodacter@miamidolphins.com",
			cmtText: "Dolphins are mammals and football players."
		},
		{
			cmtName: "Verbal Kint",
			cmtEmail: "devil@geocities.com",
			cmtText: "The greatest trick the devil ever pulled was convincing the world he didn't exist."
		}
	], [
		{
			cmtName: "Ray Finkle",
			cmtEmail: "lacesout@shadyacres.com",
			cmtText: "Isotoners aren't for me."
		},
		{
			cmtName: "Lois Einhorn",
			cmtEmail: "lacesout@gmail.com",
			cmtText: "Laces out, Dan!"
		}
	]
];

MyApp.compileItem = function(item){
  var source = $('#comment-template').html();
  var template =  Handlebars.compile(source);
  return template(item);
}

MyApp.addToList = function(list, name, email, text) {
  var itemObject = {
  	cmtName: name.val(),
  	cmtEmail: email.val(),
  	cmtText: text.val()
  };
  MyApp.existingComments.push(itemObject);
  var compiledItem = MyApp.compileItem(itemObject);
  list.append(compiledItem);
}

MyApp.populateList = function(list){
  for(var i = 0; i < MyApp.existingComments.length; i++) {
    var newItem = MyApp.compileItem(MyApp.existingComments[i]);
    list.append(newItem);
  }
}

MyApp.removeFromList = function($list, $item) {
  console.log($item);
  var itemIndex = $item.index();
  if (itemIndex > -1) {
    MyApp.existingComments.splice(itemIndex, 1);
  }
  $item.remove();
}

$(document).ready(function(){

	var $btnSubmit = $(".btn");
	var $commentList = $(".comments");

	MyApp.populateList($commentList);

	var numIDs = $("div[id^='blogpost']").length;

	console.log(numIDs + " divs with that ID");

	$btnSubmit.on("click", function(event){
		event.preventDefault();
		// if ( $nameVal.text() === "" || $emailVal.text() === "" || $textVal.text() === "" ) {
		// 	return;
		// }
		var $nameVal = $(this).siblings(".comment_name");
		var $emailVal = $(this).siblings(".comment_email");
		var $textVal = $(this).siblings(".comment_text");
		console.log("nameVal " + $nameVal);
		var $currentList = $(this).closest("div[id^='blogpost']").find($commentList);
		$currentList.toggleClass("selected");
		MyApp.addToList($currentList, $nameVal, $emailVal, $textVal);
	});

	$commentList.on('click', '.delete', function(e) {
		e.preventDefault();
		var $commentItem = $(this).closest("li");
		MyApp.removeFromList($commentList, $commentItem);
	});

	$commentList.on('click', '.edit', function(e) {
		e.preventDefault();
		console.log("edit");
		var myBtn = $(this).closest("li");
		var sibH3 = myBtn.find("h3 strong").text();
		var sibEmail = myBtn.find("h3 span").text();
		var sibText = myBtn.find("p").text();
		console.log(sibH3, sibEmail, sibText);
	});

});
