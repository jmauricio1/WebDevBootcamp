const { response } = require('express');
const express = require('express');

//represents express module bound to variable name 'app'
const app = express();

//Getting the home page route
//Callback function is what to do when this request is being called
//Usually use req for request and rep for response
app.get('/', function(request, response){
    
    //Printing out details of the HTTP request to the server
    //console.log(request);
    response.send("<h1>Hello World</h1>");
});

app.get('/contact', function(req, res){
    res.send("<h1>Contact Page</h1>");
});

app.get('/about', function(req, res){
    res.send("My name Felipe. I am 12.");
})

//Express runs on specific port I want it on
//Runs callback function if working
app.listen(3000, function(){
    console.log("Server running on port: 3000");
});