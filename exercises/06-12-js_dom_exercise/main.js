$(document).ready(function() {


  function addToList(list, newThing) {
    var item = $("<li>");
    item.text(newThing);
    list.append(item);
  }

  var button = $('#new-thing-button');
  var thingList = $('#fav-list');
  var newThingInput = $('#new-thing');

  button.click(function(event) {
    event.preventDefault();
    var newThing = newThingInput.val();
    if (newThing == "") {
      return alert("you must type in a value!");
    }
    addToList(thingList, newThing); 
    newThingInput.val("");
  });

});