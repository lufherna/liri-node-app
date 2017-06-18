var keys = require('./keys.js');
var Twitter = require('twitter')
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var T = new Twitter(
	keys
);

var spotify = new Spotify({
	id: '6f4efcaa0fe8401e9c74d0e85d58605d',
	secret: '814916766bfe4e14b4309f6793bb4b11'
});

var inputString = process.argv;

var commands = inputString[2];
var thirdCommand = inputString[3];


	switch (commands) {
		//runs twitter case
		case 'my-tweets':

				twitterT();
			 break;

		//works
		case 'spotify-this-song': 
			if (thirdCommand === undefined) {
				console.log("Couldn't find what you were looking for, but check this song out. The Sign by Ace of Base:");
				thirdCommand = "The Sign Ace of Base";
				searchSong();
			} else {

				searchSong();
			}

		break; 

		//calls out omdb function
		case 'movie-this':
			if (thirdCommand === undefined) {
				console.log("Couldn't find what you were looking for, but here is the info for Mr.Nobody:");
				thirdCommand = "Mr. Nobody";
				findMovie();
			} else {

				findMovie();
			}
			
			break;

		//calls out readfile function
		case 'do-what-it-says':
			readF();
			
		break;


	}

	//=========================twitter function 

	function twitterT(){
			var params = {screen_name: 'MclovinLois', count: 20};
			T.get('statuses/user_timeline', params, function(error, tweets) {
				for (var i = 0; i < tweets.length; i++){
					  if (!error) {
			   			 console.log(tweets[i].text + ". This Tweet was created on: " + tweets[i].created_at);
					  		}
						} 
					});
				} 

	//============================omdb function
		function findMovie(){
				var queryUrl = "http://www.omdbapi.com/?t=" + thirdCommand + "&y=&plot=short&apikey=40e9cece";
					request(queryUrl, function(error, response, body){
						if (!error && response.statusCode === 200) {
							console.log("Movie Title: " + JSON.parse(body).Title);
							console.log("Year Released: " + JSON.parse(body).Year);
							console.log("Rating: " + JSON.parse(body).Rated);
							console.log("Actors: " + JSON.parse(body).Actors);
							console.log("Language: " + JSON.parse(body).Language);
							console.log("Country: " + JSON.parse(body).Country);
							console.log("Plot: " + JSON.parse(body).Plot);
							}
						  })
					}	
	//===========================spotify function
		function searchSong(){
				spotify.search({ type: 'track', query: thirdCommand, limit: 1 }, function(err, data) {
						if (err) {
							    return console.log('Error occurred: ' + err);
							  }
						//loops through the data array
						for (var i = 0; i < data.tracks.items.length; i++) {

							var items = data.tracks.items[i];

							//artists name
							console.log(items.album.artists[i].name);

							//song name
							console.log(items.album.name);

							//link
							console.log(items.album.uri)

							//album name
							console.log(items.name)
							}
						});
					}

	//===========================do what it says function
		function readF() {
				fs.readFile('random.txt', 'utf8', function (err, data){
					if (err) {
						return console.log(err)
					}

					//split data in txt file
					var splitData = data.split(',');
					//change command to reflect first index of array
					thirdCommand = splitData[1];

					searchSong();
					})
				}


//unnecessary stuff below



/*if (commands === 'my-tweets') {
		var params = {screen_name: 'MclovinLois'};
	T.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

} */

//if (commands === 'spotify-this-song') {


//}

/*if (commands === 'movie-this') {

	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";
		console.log(queryUrl);
			request(queryUrl, function(error, response, body){
				if (!error && response.statusCode === 200) {
					console.log(response)
				}

			if (movieTitle = '') {
				queryUrl = "http://www.omdbapi.com/?t=" + 'Mr.Nobody' + "&y=&plot=short&apikey=40e9cece";
				console.log(response);
				console.log('You should watch it! It is on NetFlix')
				}
			  })
			}

if (commands === 'do-what-it-says') {


}*/