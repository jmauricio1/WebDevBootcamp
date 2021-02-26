const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//express can use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    //res.send("<h1>Welcome to the Calculator</h1>");
    //console.log(__dirname);

    //Sending back the index.html file to show on the home page
    //__dirname constant that holds the current file path
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("The result of the calculation is " + result);
});

app.get('/bmi', function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post('/bmi', function(req, res){
    var weight = Number(req.body.num1);
    var height = Number(req.body.num2);

    var output = Math.ceil((weight / (height * height)) * 703);
    res.send("Your BMI is " + output);
});

app.listen('3000', function(){
    console.log("Server running on port: 3000");
});