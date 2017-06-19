'use strict';

var MyApp = {};

MyApp.compileItem = function(item) {
	// sets "source" as the HTML of the template
	var source = $('#todo-template').html();
	// compiles the template "source" from above
	var template = Handlebars.compile(source);
	// applies the content to the template
	return template(item);
}

MyApp.addToList = function(list, item) {
	// itemObject = the value of the input sent to the template
	var completeLink = '<a href="#" class="complete-link">link</a>'
	var itemObject = { 
		toDo: item.val() + ' ' + completeLink
	};
	// createdItem = <li>{text}</li>
	var createdItem = MyApp.compileItem(itemObject);
	list.append(createdItem);
	item.val('');
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
