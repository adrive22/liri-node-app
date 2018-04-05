//this is pulling from the .env file. It is part of the dotenv package on the npm website
require("dotenv").config();

var fs=require("fs-extra");
//var spotify = new Spotify(keys.spotify);
//This Twitter info is from NPM website for Twitter API
var Twitter=require("twitter");
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var keys = require("./keys.js");
var request=require("request");
var defaultSong= "The Sign, Ace of Base";


//taking in the commands from bash//
var command=process.argv[2];


//song or movie input//
var x = process.argv[3];


//arguments//
switch(command){
	//tweet command//
	case "my-tweets":
		showTweets();
	break;
	//spotify command//
//	case "spotify-this-song":
//		if(x){
		// 	spotifySong(x);
		// }else{
		// 	spotifySong(defaultSong);
		// }
	//break;
	//movie command//
	case "movie-this":
		if(x){
			omdbData(x);
		}else{
			omdbData("Mr. Nobody");
		}
	break;
	//txt document command//
	case "do-what-it-says":
		doIt();
	break;

	default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  	break;
	}

//functions//

//tweet function//
function showTweets(){
//creating a variable to input to the Twitter API for screen name and count//
var params = {screen_name: 'agr1Hasn0Name'};
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
  	for (var i=0; i<tweets.length; i++){
    console.log(tweets[i].text);
	}
  }
});
}


function omdbData(x){
//api key + input data
var url="http://www.omdbapi.com/?t=" + x + "&apikey=afe849bb"
//requesting the information and creating function with data
	request(url, function (error, response, body) {
//converting body of return data into JSON 
  var json = JSON.parse(body);
 //console logging data
  console.log("Title: " + json.Title)
  console.log("Year Released: " + json.Year)
  console.log("Rating: " + json.Rated)
  if (json.Ratings[1]){
    console.log("Rotten Tomatoes Rating: " + json.Ratings[1].Value)
    }else{ 
    console.log("No Rotten Tomatoes Rating")
  }
  console.log("Actors: " + json.Actors)
  console.log("Country Produced: " + json.Country)
  console.log("Language: " + json.Language)
  console.log("Plot: " + json.Plot); 
});


}


function doIt(x){
	//reading the random.txt file
	fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
  } else{
  	//creating an array by splitting the text up by commas
  	var dataArray=data.split(",")

  		if(dataArray[0]==="my-tweets") {
  			var screenName=dataArray[1];
  			showTweets(screenName);
  		}
  		else if(dataArray[0]==="movie-this") { 
  		 	var movieName=dataArray[1];
  		 	omdbData(movieName);
  		 };
  		
  }
})
}















