const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//this is used so that i can use the css file
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log('Server running on port: 3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log(firstName + " " + lastName + " " + email);
});


