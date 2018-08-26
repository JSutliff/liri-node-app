require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var userInput = process.argv.splice(2);

var liriCommand = userInput[0];
var searchParams = userInput.splice(1).map(elem => elem.toLocaleLowerCase()).join('+');

var concert = 'concert-this';
var spotify = 'spotify-this-song';
var movie = 'movie-this';
var doWhat = 'do-what-it-says';

//call appropriate APIs
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

function callSpotify() {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: searchParams }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log(data); 
  });
}

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

function callTxt() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data (a single string)
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    liriCommand = dataArr[0];
    searchParams = dataArr[1];
    return checkCommand(liriCommand);
  
  });
}

//check liriCommand against list of possible commands
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

checkCommand(liriCommand);


  //if valid command perfom associated task
  // function getTask(input) {
  //   if (checkCommand(input) && input === concert) {

  //   }
  // }


  