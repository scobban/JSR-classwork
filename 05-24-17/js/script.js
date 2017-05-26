$(document).ready(function(){	
	/*********** PUT THINGS HERE ****************/

	/****** QUESTION 1 ************/
	document.getElementById('return5th_submit').onclick = function(){
			var text = document.getElementById('return5th_input').value;
			document.getElementById('return5th_display').innerHTML = text.charAt(4);
	}
    /****** QUESTION 2 ************/
    // Same as above except output second to last char of a input string
	document.getElementById('returnLast_submit').onclick = function(){
			var text = document.getElementById('returnLast_input').value;
			var length = text.length;
			document.getElementById('returnLast_display').innerHTML = text.charAt(length - 2);
	}

	/****** QUESTION 3 ************/
	// Check to see if a word exists in a hard-coded paragraph, display "YES" if found and "NO" if not
	document.getElementById('checkWork_submit').onclick = function(){
			var text = document.getElementById('checkWork_input').value;
			var search = (document.getElementById('ps3text').innerHTML.indexOf(text) >= 0) ? "Yes" : "No";
			document.getElementById('checkWork_display').innerHTML = search;
	}


	/****** QUESTION 4 ************/
	// Reverse string inputted by user
	document.getElementById('reverseString_submit').onclick = function(){
			var text = document.getElementById('reverseString_input').value;
			var reversal = text.split("").reverse().join("");
			document.getElementById('reverseString_display').innerHTML = reversal;
	}


	/****** QUESTION 5 ************/
	// Output HELLO WORLD into a div, but you must first store "hello world" into a variable and then output the variable
	document.getElementById('helloworld_submit').onclick = function(){
			var display = document.getElementById('helloworld_display');
			var hWorld = "Hello World";
			document.getElementById('helloworld_display').innerHTML = hWorld;
	}


	/****** QUESTION 6 ************/
	// Provide an input for user to type their name and greet them with their name "Hello BLANK, welcome to the website" should go in greet1 display
	document.getElementById('greet1_submit').onclick = function(){
			var text = document.getElementById('greet1_input').value;
			var greeting = "Hello " + text + ", welcome to the website";
			document.getElementById('greet1_display').innerHTML = greeting;
	}


	/****** QUESTION 7 ************/
	// Do the same as above but only greet them if their names are Alice, Bob, or YOUR NAME
	document.getElementById('greet2_submit').onclick = function(){
			var text = document.getElementById('greet2_input').value;
			if (text == "Alice" || 
				text == "Bob" || 
				text == "Scott") {
				var greeting = "Hello " + text + ", welcome to the website";
			}
			document.getElementById('greet2_display').innerHTML = greeting;
	}


	/****** QUESTION 8 ************/
	// Accept two integers from the user and display the larger
	document.getElementById('integerMax_submit').onclick = function(){
			var num1 = Number(document.getElementById('integerMax_input1').value);
			var num2 = Number(document.getElementById('integerMax_input2').value);
			if (num1 > num2) {
				var larger = num1;
			} else if (num1 < num2) {
				var larger = num2;
			} else {
				var larger = "Try again."
			}
			document.getElementById('integerMax_display').innerHTML = larger;
	}


	/****** QUESTION 9 ************/
	// Accept three integers from the user and display the SIGN of the product of the three (aka: display + or -)
	document.getElementById('integerSign_submit').onclick = function(){
			var num1 = Number(document.getElementById('integerSign_input1').value);
			var num2 = Number(document.getElementById('integerSign_input2').value);
			var num3 = Number(document.getElementById('integerSign_input3').value);
			var sum = num1 + num2 + num3;
			var sign;
			if (sum > 0) {
				var sign = "+";
			} else if (sum < 0) {
				var sign = "-";
			} else {
				var sign = "It's zero."
			}
			document.getElementById('integerSign_display').innerHTML = sign;
	}


	/****** QUESTION 10 ************/
	// Write a JavaScript program to sort three numbers. Display them in order from greatest to smallest
	document.getElementById('integerSort_submit').onclick = function(){
			var num1 = Number(document.getElementById('integerSort_input1').value);
			var num2 = Number(document.getElementById('integerSort_input2').value);
			var num3 = Number(document.getElementById('integerSort_input3').value);
			var output = document.getElementById('integerSort_display');
			var group = [];
			group.push(num1);
			group.push(num2);
			group.push(num3);

			// function takes two values and subtracts one from the other
			// the resulting outcome from the comparison allows the sort()
			// to position the value appropriately
			function compareNumbers(a,b) {
			    return a - b;
			}

			// user sortNumber function
			// otherwise, sort() sorts on unicode point value
			group.sort(compareNumbers).reverse();

			for (var i = 0; i < group.length; i++) {
				output.innerHTML += group[i] + '<br/>';
				console.log(group[i]);
			};
	}



	/****** QUESTION 11 ***********/
	// Write a function called play() to play rock, paper, scissors and output the winner (player 1 or player 2). This requires ressearch on how to make a function
	document.getElementById('rps_submit').onclick = function(){
			var rps1 = document.getElementById('rps_player1').value;
			var rps2 = document.getElementById('rps_player2').value;
			rps1 = rps1.toLowerCase();
			rps2 = rps2.toLowerCase();
			var outcome = "It's a draw! Try again.";
			function play (a, b) {
				if (a == b) {
					outcome; 
				} else if (a == "rock") {
					if (b == "scissors") {
						outcome = "Player 1 wins!";
					} else {
						outcome = "Success for Player 2!";
					}
				} else if (a == "paper") {
					if (b == "rock") {
						outcome = "Player 1 for the win.";
					} else {
						outcome = "Player 2 wins, this time.";
					}					
				} else if (a == "scissors") {
					if (b == "paper") {
						outcome = "A win for Player 1!";
					} else {
						outcome = "Way to go, Player 2!";
					}
				}
			}
			play(rps1, rps2);
			document.getElementById('rps_winner_display').innerHTML = outcome;
	}



	/****** QUESTION 12 ***********/
	// Calculate the factoral of a number inputted by the user
	document.getElementById('factoral_submit').onclick = function(){
			var numIn = Math.round(document.getElementById('factoral_input').value);
			if (numIn > 0) {
				for (var minusOne = numIn - 1; minusOne > 0; minusOne-- ) {
				  numIn *= minusOne;
				}
			} else {
				numIn = "Please enter an integer greater than 0.";
			};
			document.getElementById('factoral_display').innerHTML = numIn;
	}



	/****** QUESTION 13 ***********/
	//Write a JavaScript program to construct the following pattern:
	//*
	//**
	//***
	//****
	//*****				
	document.getElementById('star_submit').onclick = function(){
			var stars = ["*","**","***","****","*****"];
			for (var i = 0; i < stars.length; i++) {
				document.getElementById('star_display').innerHTML += stars[i] + '<br />';
			}
	};


	/****** QUESTION 14 ***********/
	//Write a function that multiplies a base by itself a certain number of times (exponent)
	document.getElementById('base_exp_submit').onclick = function(){
			var base = Number(document.getElementById('base_input').value);
			var exp = Number(document.getElementById('exp_input').value);
			var result = Math.pow(base, exp);
			document.getElementById('base_exp_display').innerHTML = result;
	};


	/****** QUESTION 15 ***********/
	// Write a program that prints the numbers from 1 to 100. 
	// For multiples of three print "Foo" instead of the number and 
	// For the multiples of five print "Bar". 
	// For numbers which are multiples of both three and five print "FooBar"

	var fooButton = document.getElementById('foobar_submit');
	var fooDisplay = document.getElementById('foobar_display');

	// First pass
	//
	// fooButton.onclick = function() {
	// 	    var list = [];
	// 	    for (var i = 1; i <= 100; i++) {
	// 	        // is i cleanly divisible by 3 OR 5?
	// 	        if (i % 3 === 0 || i % 5 === 0) {
	// 	            // is i cleanly divisible by 3 AND 5?
	// 	            if (i % 3 === 0 && i % 5 === 0) {
	// 	                list.push("FooBar");
	//                 // is i cleanly divisible by 3?
	// 	            } else if (i % 3 === 0) {
	// 	                list.push("Foo");
	// 	            } else {
	// 					list.push("Bar");
	// 	            }
	// 	        } else {
	// 	            list.push(i);
	// 	        }
	// 	        fooDisplay.innerHTML += list[i - 1] + '<br />';
	// 	    }
	// }

	// Second pass - coworker mentioned creating FooBar
	// from adding each separately through the cycle
	//
	fooButton.onclick = function() {
		    for (var i = 1; i <= 100; i++) {
		        var out = "";
		        if (i % 3 === 0) {
		            out += "Foo";
		        }
		        if (i % 5 === 0) {
		            out += "Bar";
		        }
		        if (out == "") {
		            out = i;
		        }
		        fooDisplay.innerHTML += out + '<br />';
		    }
	}

});