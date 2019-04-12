const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'c6809cf73e9a9c6cbdcc2e57dfd4547b';
let city = argv.c || 'Jakarta';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function(error, response, body){
  if (error) {
    console.log('Error : ', error);
  } else {
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});