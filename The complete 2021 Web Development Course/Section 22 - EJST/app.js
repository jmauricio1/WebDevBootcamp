const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){

    var today = new Date();
    var currentDay = today.getDay();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[currentDay];

    //Express going to look for a file called views, then list
    res.render('list', {
        kindOfDay: day 
     });
});

app.listen(3000, function(){
    console.log('Server running on port: 3000');
});