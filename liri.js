var inputString = process.argv[2];

var twitterKeys = require('./keys.js');
var twitter = require('twitter');
var parameters = { screen_name: 'Benjamin Arteaga', count: 2 };
var client = new twitter(twitterKeys.twitterKeys);

var spotify = require('spotify');
var song = '';

// The Twiiter Call
if (inputString == 'tweets') {
    console.log('-----------------------------------------------------------------------');
    client.get('statuses/user_timeline', parameters, function(err, tweets, response) {
        if (!err) {
            for (var i = 0; i < 2; i++) {
                console.log('Tweet # ' + ( i + 1 ) + ': ' + tweets[i].text);
            }

        }
    })
}

// SpotifySong Calls  !!!!!!!Working!!!!!!!
if (inputString == 'spotify') {
    for (i = 3; i < process.argv.length; i++) {
        var song = song + '+' + process.argv[i];
    }
    if (song == '') {
        song = process.argv[3];
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (!err) {
            console.log('--------------------------------------------------------------');
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Album Name: ' + data.tracks.items[0].album.name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('---------------------------------------------------------------');
        }
    })
}
