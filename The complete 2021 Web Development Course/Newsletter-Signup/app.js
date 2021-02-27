const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    //console.log(firstName + " " + lastName + " " + email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //turning data into a flatpack version of JSON
    const jsonData = JSON.stringify(data);

    const url =   'https://us1.api.mailchimp.com/3.0/lists/{list_id}';

    const options = {
        method: "POST",
        auth: "joshmdev:{api_key}"
    }

    //basic part of the post request we want to send to mailchimp
    const request = https.request(url, options, function(response){
        
        //depending on If the request worked, we want to return certain a response
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname_ + '/failure.html');
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    //including the data of the person we would like to add
    //This is like adding to the parameters of a request
    request.write(jsonData);
    request.end();
});

app.post('/failure', function(req, res){
    res.redirect("/");
})
