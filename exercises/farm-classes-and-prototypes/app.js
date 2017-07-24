function FarmAnimal(anName, anImage, anSound) {
	this.name = anName;
	this.image = anImage;
	this.talk = function() {
		alert("I am a " + this.anName + " and I go " + this.anSound);
	};
};

FarmAnimal.prototype.eyes = 2;

function Poultry(pName, pImage) {
	FarmAnimal.call(this, pName, pImage, "Cluck cluck!");
	this.wings = 2;
}

Poultry.prototype = new FarmAnimal();


function Goat(gName, gImage, gSound) {
	FarmAnimal.call(this, gName, gImage, gSound);
	this.horns = 8;
}

Goat.prototype = new FarmAnimal();

var cow = new FarmAnimal("Cow", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/220px-Cow_female_black_white.jpg", "Moo!");
var horse = new FarmAnimal("Horse", "https://www.purinamills.com/2.purinamills.com/media/Images/MasterBrand/Lifestages/horse-special-needs.png?ext=.png", "Naaaay!");
var rooster = new Poultry("Rooster", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Brown_Leghorn_rooster_in_Australia.jpg/199px-Brown_Leghorn_rooster_in_Australia.jpg");
var chicken = new Poultry("Chicken", "http://static3.mypetchicken.com/images/product_images/Large/MPC-product-diaper-on-chicken.jpg");
var pygmyGoat = new Goat("Pygmy Goat", "http://nigerianpygmygoats.com/images/playing-pygmygoats.jpg", "Yippee!!");
var alpineGoat = new FarmAnimal("Alpine Goat", "http://siterepository.s3.amazonaws.com/4209/alpine.jpg", "Brrrr!");

$(document).ready(function(){
	$("<div>").addClass("animal");
	$(cow.name).appendTo(".animal");
});
