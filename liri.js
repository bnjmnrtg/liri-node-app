var inputString = process.argv[2];

var twitterKeys = require('./keys.js');
var twitter = require('twitter');
var parameters = {screen_name: 'Benjamin Arteaga', count: 2};
var client = new twitter(twitterKeys.twitterKeys);

var spotify = require('spotify');
var songs = '';

// The Twiiter Call
if (inputString == 'tweets'){
	console.log('-----------------------------------------------------------------------');
	client.get('statuses/user_timeline', parameters, function(err, tweets, response){
		if(!err){
			for(i=2;i>=0;i--)
			console.log('Tweet # ' + (2 - i) + ': ' + tweets[i].text);
		}
	})
}

// SpotifySong Calls  !!!!!!!Working!!!!!!!
if (inputString == 'spotify-this-song') {
	for(i=3;i<process.argv.length;i++){
		var song = song + '+' + process.argv[i];
	}
	if(song == ''){
		var song = 'mojo+so+dope';
	}

	spotify.search({type: 'track', query: song}, function(err,data){
		if(!err){
			console.log('--------------------------------------------------------------');
			console.log('Artist: ' + data.tracks.items[0].artists[0].name);
			console.log('Album Name: ' + data.tracks.items[0].album.name);
			console.log('Song Name: ' + data.tracks.items[0].name);
			console.log('Preview Link: ' + data.tracks.items[0].preview_url);
			console.log('---------------------------------------------------------------');
		}
	})
}
