require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');


// var spotify = new Spotify(keys.spotify);

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


//check liriCommand against list of possible commands
function checkCommand(intendedCommand) {
  var validCommand;
  if (intendedCommand === concert) {
    validCommand = true;
    callBandsTown();
  } else if (intendedCommand === spotify) {
    validCommand = true;
  } else if (intendedCommand === movie) {
    validCommand = true;
  } else if (intendedCommand === doWhat) {
    validCommand = true;
  } else {
    validCommand = false;
    console.log('Invalid Command');
  }
  
  return validCommand;
}

checkCommand(liriCommand);
callSpotify();

  //if valid command perfom associated task
  // function getTask(input) {
  //   if (checkCommand(input) && input === concert) {

  //   }
  // }


  