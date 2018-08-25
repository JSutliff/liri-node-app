require("dotenv").config();

var keys = require('./keys.js');

// var spotify = new Spotify(keys.spotify);

var userInput = process.argv.splice(2);
console.log(userInput);

var liriCommand = userInput[0];
var searchParams = userInput.splice(1).map(elem => elem.toLocaleLowerCase()).join('+');

var concert = 'concert-this';
var spotify = 'spotify-this-song';
var movie = 'movie-this';
var doWhat = 'do-what-it-says';

//call appropriate APIs
function callBandsTown() {
  
}



//check liriCommand against list of possible commands
function checkCommand(intendedCommand) {
  var validCommand;
  if (intendedCommand === concert) {
    validCommand = true;
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

  //if valid command perfom associated task
  // function getTask(input) {
  //   if (checkCommand(input) && input === concert) {

  //   }
  // }

