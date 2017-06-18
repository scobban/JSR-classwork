'use strict';

var MyApp = {};

MyApp.compileItem = function(item) {
	// sets "source" as the HTML of the template
	var source = $("#todo-template").html();
	// compiles the template "source" from above
	var template = Handlebars.compile(source);
	// applies the content to the template
	return template(item);
}

MyApp.addToList = function(list, item) {
	// itemObject = the value of the input sent to the template
	var itemObject = { 
		toDo: item.val()
	};
	// createdItem = <li>{text}</li>
	var createdItem = MyApp.compileItem(itemObject);
	console.log("compiled " + createdItem);
	list.append(createdItem);
	item.val("");
}

MyApp.removeFromList = function() {
	// add button that gets added when the ToDo is added
	// have it remove the item when it's clicked
}

$(document).ready(function() {
	var $newTaskForm = $('#new_task');
	var $taskList =  $('#task_list');
	$newTaskForm.submit(function(event){
		event.preventDefault();
		var $newTaskInput = $('#new_task_input');
		MyApp.addToList($taskList, $newTaskInput);
	});
});
