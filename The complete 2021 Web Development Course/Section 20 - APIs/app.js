const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req, res){
    const query = req.body.cityName;
    const apiKey = '69d0bcda4ecac29ccc74f87514bec81f';
    const units = req.body.units;
    const url = 'https://api.openweathermap.org/data/2.5/weather?units=' + units + '&q=' + query + '&appid=' + apiKey;

    //sending a request to the open weather api with api key and logging the response
    https.get(url, function(response){
        //Checking the status code from the request
        //console.log(response.statusCode);

        //accessing the 'data' part of the response
        response.on("data", function(data){
            var info = JSON.parse(data);
            console.log(info);

            //grabbing different parts of the data
            const temp = info.main.temp;
            const weatherDescription = info.weather[0].description;
            const weatherIcon = 'http://openweathermap.org/img/wn/' + info.weather[0].icon + '.png';

            res.write('<h1>The temperature in' + query + ' is ' + temp + ' ' + units + '.</h1>');
            res.write('<h2>It is ' + weatherDescription + '.</h2>');
            res.write('<img src="' + weatherIcon + '"></img>');
            res.send();
        });
    });
    //Cannot have a second res.send in any given app.____ thing
    //res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function(){
    console.log('Server is running on port: 3000');
});