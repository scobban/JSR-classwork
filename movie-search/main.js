// Lets create a movie app that will accept a search and return a list of results
/*

1) Accept a query from the user and get results. (All via AJAX... duhhhh)
2) I want it to display the results by outputting the movie posters as image tags
3) Upon interacting with the movie poster (click, mouseover, etc..) you should display 4 extra pieces 
  of information about that movie. I don't care which
4) Bonus: Display a total of 8 pieces of information about the movie
5) Bonus: Do a type ahead so that the form works as autocomplete. 
6) Bonus: Make it pretty

// Homework
// Try the above stuff
// 


Example endpoint: http://www.omdbapi.com/?i=tt3896198&apikey=ada5c403

*/

'use strict';
var MovieApp = {};

MovieApp.compileItem = function(template, item) {
    var source = template.html();
    var template = Handlebars.compile(source);
    return template(item);
}

MovieApp.addToTemplate = function(poster, title, year, type, link) {
	var movieTemplate = $("#movie-template");
    var movieList = $(".movie-output");
    var movieObject = {
        poster: poster,
        title: title,
        year: year,
        type: type,
        link: link
    };
    var compiledMovie = MovieApp.compileItem(movieTemplate, movieObject);
    movieList.append(compiledMovie);
}

MovieApp.infoPanel = function(barCalc, rating, mpaa, runtime, plot) {
    var panelTemplate = $("#modal-template");
    var panelWrap = $(".panel-wrap");
    var panelObject = {
    	barWidth: barCalc,
        rating: rating,
        mpaa: mpaa,
        runtime: runtime,
        plot: plot
    };
    var compiledPanel = MovieApp.compileItem(panelTemplate, panelObject);
    panelWrap.append(compiledPanel);
}

// This is the same as document ready btw.
$(function() {

    $("#movie_search").focus();

    var omdbUrl = "http://www.omdbapi.com";
    var omdbKey = "ada5c403";

    $(document).on("submit", "#movie_form", function(event) {

        event.preventDefault();

        $(".movie-output").html("");

        var inputVal = $('#movie_search').val();
        if (inputVal == "") {
            return;
        }
        var request = $.ajax({
            url: omdbUrl,
            data: {
                s: inputVal,
                apikey: omdbKey
            }
        });

        request.done(function(data) {
            var movies = data.Search;
            for (var i = 0; i < movies.length; i++) {
                var moviePoster = movies[i].Poster;
                var movieTitle = movies[i].Title;
                var movieType = movies[i].Type;
                var movieYear = movies[i].Year;
                var movieID = movies[i].imdbID;
                var posterHtml = "<img class='poster' data-type='" + movieType + "' data-title='" + movieTitle + " 'data-year='" + movieYear + "' data-imdbid='" + movieID + "' src='" + moviePoster + "'>";
                var movieUrl = "http://www.imdb.com/title/" + movieID;
                console.log(movieUrl);
                MovieApp.addToTemplate(posterHtml, movieTitle, movieYear, movieType, movieUrl);
            };
        });

    });

    $("body").on("click", ".poster", function() {

        var currentID = $(this).data("imdbid");
        var parentDiv = $(this).parents(".movie-item");

        var request = $.ajax({
            url: omdbUrl,
            data: {
                i: currentID,
                plot: "short",
                apikey: omdbKey
            }
        });

        request.done(function(data) {
        	var calcWidth = data.imdbRating * 10 + '%';
            MovieApp.infoPanel(calcWidth, data.imdbRating, data.Rated, data.Runtime, data.Plot);
        });

		$(".panel-wrap").html("").hide();
        $(".panel-wrap").prependTo(parentDiv).show();

    });

    $("body").on("click", ".close", function() {
        $(".panel-wrap").html("").hide();
    });

});
