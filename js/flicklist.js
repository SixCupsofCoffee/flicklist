

var model = {
    watchlistItems: [],
    browseItems: []
}


var api = {
    root: "https://api.themoviedb.org/3",
    token: "" // rendered blank for save
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

            response.results.forEach(function(movie) {
                model.browseItems.push(movie.original_title);
            });
			// invoke the callback function that was passed in.
			callback();
		}
	});

}

/**
* re-renders the page with new content, based on the current state of the model
*/
function render() {
    $('#section-watchlist > ul').empty();
    $('#section-browse > ul').empty();

    model.watchlistItems.forEach(function(movie) {
        var li = $('<li />');
        li.text(movie);
        $('#section-watchlist > ul').append(li);
    });

    model.browseItems.forEach(function(movie) {
        var li = $('<li />');
        li.text(movie);

        var addMovieButton = $('<button />');
        addMovieButton.text('Add to Watchlist');
        li.append(addMovieButton);

        $('#section-browse > ul').append(li);
    });

    $('#section-browse > ul button').off();
    $('#section-browse > ul button').on('click', function(press) {
        var movie = $($(press.target).parent()[0].childNodes[0]).text();
        model.watchlistItems.push(movie);
        render();
    });
}

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
    discoverMovies(render);
});
