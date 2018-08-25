require("dotenv").config();

var keys = require('./keys.js');

// var spotify = new Spotify(keys.spotify);

var userInput = process.argv.splice(2);

console.log(userInput);