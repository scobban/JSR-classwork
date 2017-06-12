/*Work with a partner to create a monkey object, which has the following properties:

* name
* species
* foodsEaten

And the following methods:
* eatSomething(thingAsString)
* introduce: producers a string introducing itself, including its name, species, and what it's eaten.

Create 3 monkeys total. Make sure all 3 monkeys have all properties set and methods defined.

Exercise your monkeys by retrieving their properties and using their methods. Practice using both syntaxes
for retrieving properties (dot notation and brackets).

*/

var Monkey = function(name, species, foodsEaten) {
	this.monkeyName = name;
	this.monkeySpecies = species;
	this.monkeyFood = foodsEaten;
}

Monkey.prototype.eatSomething = function(fedFood){
	this.monkeyFood.push(fedFood);
}

Monkey.prototype.introduction = function(){
	console.log("Hey. I'm " + this.monkeyName + ". I'm a " + this.monkeySpecies + " and I like to eat " + this.monkeyFood.join(", ") + ".");
}

var squirrelMonkey = new Monkey("David", "Squirrel Monkey", []);
var baboonMonkey = new Monkey("Everett", "Baboon", []);
var capuchinMonkey = new Monkey("Cindy", "Capuchin", []);


squirrelMonkey.eatSomething("toads");
baboonMonkey.eatSomething("leaves");
capuchinMonkey.eatSomething("rocks");

squirrelMonkey.introduction();
baboonMonkey.introduction();
capuchinMonkey.introduction();
