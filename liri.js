//requirements
require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");

//separate user input from first args of argv
var userInput = process.argv.splice(2);

//separate command from search inputs
var liriCommand = userInput[0];
var searchParams = userInput.splice(1).map(elem => elem.toLocaleLowerCase()).join('+');

//command variables 
var concert = 'concert-this';
var spotify = 'spotify-this-song';
var movie = 'movie-this';
var doWhat = 'do-what-it-says';

//function that makes a request to bandsInTown and returns required information
function callBandsTown() {
  request("https://rest.bandsintown.com/artists/" + searchParams + "/events?app_id=codingbootcamp", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    var eventsArr = JSON.parse(body);
	
  	eventsArr.forEach(function(event) {
      console.log('This event is at: ' + event.venue.name)
      console.log('The location of the venue is in ' +  event.venue.city + ', ' + event.venue.country);
      console.log('Time of event: ' +  moment(event.datetime).format('MM/DD/YYYY'));
    })
  }
});
}

//function that makes a request to spotify and returns required information
function callSpotify() {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: searchParams }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log(data); 
  });
}

//function that makes a request to OMDB and returns required information
function callOmdb() {
  request("http://www.omdbapi.com/?apikey=trilogy&t=" + searchParams, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    var movieObj = JSON.parse(body);
    console.log('The title of the movie is: ' + movieObj.Title);
    console.log('This movie was released in: ' + movieObj.Year);
    console.log('The IMDB Rating of the movie is: ' + movieObj.imdbRating);
    console.log('The Rotten Tomatoes Rating of the movie is: ' + movieObj.Ratings[1]);
    console.log('This movie was produced in: ' + movieObj.Country);
    console.log('This movie is in: ' + movieObj.Language);
    console.log('The plot of the movie is: ' + movieObj.Plot);
    console.log('Actors: ' + movieObj.Actors);
  }
});
}

//function that makes a request to random.txt and returns required information
function callTxt() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    //assign command and search based on contents of random.txt
    liriCommand = dataArr[0];
    searchParams = dataArr[1];
    return checkCommand(liriCommand);
  });
}

//check liriCommand against list of possible commands and call corresponding API
function checkCommand(intendedCommand) {
  var validCommand;
  if (intendedCommand === concert) {
    validCommand = true;
    callBandsTown();
  } else if (intendedCommand === spotify) {
    validCommand = true;
    callSpotify();
  } else if (intendedCommand === movie) {
    validCommand = true;
    callOmdb();
  } else if (intendedCommand === doWhat) {
    validCommand = true;
    callTxt();
    
  } else {
    validCommand = false;
    console.log('Invalid Command');
  }
  
  return validCommand;
}

//function call to check user command and run program 
checkCommand(liriCommand);



  