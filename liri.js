var inputString = process.argv[2];

var twitterKeys = require('./keys.js');
var twitter = require('twitter');
var parameters = { screen_name: 'Benjamin Arteaga', count: 2 };
var client = new twitter(twitterKeys.twitterKeys);

var request = require('request');
var movie = '';

var spotify = require('spotify');
var song = '';

// The Twiiter Call  !!!!!!!!!!!!WORKING!!!!!!!!!!!!!!!!!!
if (inputString == 'my-tweets') {
    console.log('==========================Twiiter===================================');
    client.get('statuses/user_timeline', parameters, function(err, tweets, response) {
        if (!err) {
            for (var i = 0; i < 2; i++) {
                console.log('Tweet # ' + (2 - i) + ': ' + tweets[i].text);
                console.log('-----------------------------------------------------------------------');
            }
        }
    })
}

// SpotifySong Calls  !!!!!!!!!!!!!!!!WORKING!!!!!!!!!!!!!!!!!!!
if (inputString == 'spotify-this-song') {
    for (i = 3; i < process.argv.length; i++) {
        var song = song + '+' + process.argv[i];
    }
    if (song == '') {
        song = 'whats+my+age+again';
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (!err) {
            console.log('==========================Spotify===================================');
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Album Name: ' + data.tracks.items[0].album.name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('==================================================================');
            console.log(' ');

        }
    })
}

//IMDB Calls!!!!!!!!!!!!!!!!WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (inputString == 'movie-this') {
    for (var i = 3; i < process.argv.length; i++) {
        var movie = movie + '+' + process.argv[i];
    }
    if (movie == '') {
        movie = 'Mr+Nobody'
    }
    request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function (error, response, body) {

        if (!error && response.statusCode == 200) {
            console.log('==========================OMDB===================================');
            console.log('Title: ' + JSON.parse(body)['Title']);
            console.log('IMDB Rating: ' + JSON.parse(body)['imdbRating']);
            console.log('----');
            console.log('Plot: ' + JSON.parse(body)['Plot']);
            console.log('----');
            console.log('Actors: ' + JSON.parse(body)['Actors']);
            console.log('----');
            console.log('Year: ' + JSON.parse(body)['Year']);
            console.log('Runtime: ' + JSON.parse(body)['Runtime']);
            console.log('Rated: ' + JSON.parse(body)['Rated']);
            console.log('==================================================================');
            console.log(' ');

        }
    });
}
