var inputString = process.argv[2];

var twitterKeys = require('./keys.js');
var twitter = require('twitter');
var parameters = { screen_name: 'Benjamin Arteaga' };
var client = new twitter(twitterKeys.twitterKeys);

var request = require('request');
var movie = '';

var spotify = require('spotify');
var song = '';

var fs = require('fs')

// The Twiiter Call  !!!!!!!!!!!!WORKING!!!!!!!!!!!!!!!!!!
if (inputString == 'my-tweets') {
    console.log('==========================Twiiter===================================');
    client.get('statuses/user_timeline', parameters, function(err, tweets) {
        if (!err) {
            for (var i = 0; i < tweets.length; i++) {
                // console.log(tweets[i])
                console.log('Tweet # ' + (tweets.length - i) + ': ' + tweets[i].text);
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

//OMDB Calls!!!!!!!!!!!!!!!!WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (inputString == 'movie-this') {
    for (var i = 3; i < process.argv.length; i++) {
        var movie = movie + '+' + process.argv[i];
    }
    if (movie == '') {
        movie = 'Mr+Nobody'
    }
    request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function(error, response, body) {

        if (!error && response.statusCode == 200) {
            console.log('==========================OMDB===================================');
            console.log('Title: ' + JSON.parse(body)['Title']);
            console.log('----');
            console.log('IMDB Rating: ' + JSON.parse(body)['imdbRating']);
            console.log('----');
            console.log('Plot: ' + JSON.parse(body)['Plot']);
            console.log('----');
            console.log('Actors: ' + JSON.parse(body)['Actors']);
            console.log('----');
            console.log('Year: ' + JSON.parse(body)['Year']);
            console.log('----');
            console.log('Runtime: ' + JSON.parse(body)['Runtime']);
            console.log('----');
            console.log('Rated: ' + JSON.parse(body)['Rated']);
            console.log('==================================================================');
            console.log(' ');

        }
    });
}

//Do what it says!!!!!!!!!!!!!!!!
 if (inputString == 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        // console.log(data)
        var dataArr = data.split(',');
        // console.log(dataArr)
        var command = dataArr[0];
        var media = dataArr[1];
        // console.log(command)
            if (command == 'my-tweets') {
                // console.log(command)
                console.log('==========================Twiiter===================================');
                client.get('statuses/user_timeline', parameters, function(err, tweets) {
                    if (!err) {
                        for (var i = 0; i < tweets.length; i++) {
                            // console.log(tweets[i])
                            console.log('Tweet # ' + (tweets.length - i) + ': ' + tweets[i].text);
                            console.log('-----------------------------------------------------------------------');
                        }
                    }
                })
            }

            if (command == 'spotify-this-song') {
                // console.log("dfdfs")
                var song = media;
                if (song == '') {
                    song = 'whats+my+age+again';
                }
            

                spotify.search({ type: 'track', query: song }, function(error, data) {
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

            if (command == 'movie-this') {
                // console.log(media)
                var movie = media;
                request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log('==========================OMDB===================================');
                        console.log('Title: ' + JSON.parse(body)['Title']);
                        console.log('----');
                        console.log('IMDB Rating: ' + JSON.parse(body)['imdbRating']);
                        console.log('----');
                        console.log('Plot: ' + JSON.parse(body)['Plot']);
                        console.log('----');
                        console.log('Actors: ' + JSON.parse(body)['Actors']);
                        console.log('----');
                        console.log('Year: ' + JSON.parse(body)['Year']);
                        console.log('----');
                        console.log('Runtime: ' + JSON.parse(body)['Runtime']);
                        console.log('----');
                        console.log('Rated: ' + JSON.parse(body)['Rated']);
                        console.log('==================================================================');
                        console.log(' ');
                    }
                })

            }


        
    })

}
