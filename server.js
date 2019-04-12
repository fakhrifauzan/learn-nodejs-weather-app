const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const apiKey = 'c6809cf73e9a9c6cbdcc2e57dfd4547b';

app.use(express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index', {weather: null, error: null})
})

app.post('/', function(req, res){
  let city = req.body.city 
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
  request(url, function(error, response, body){
    if (error) {
      res.render('index', {weather: null, error: 'Error, please try again'})
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'})
      } else {
        let message = `It's ${weather.main.temp} degrees Celsius in ${weather.name}!`;
        res.render('index', {weather: message, error: null});
      }
    }
  })
})

app.listen(3000, function(){
  console.log('Weather App listening on port 3000!')
})