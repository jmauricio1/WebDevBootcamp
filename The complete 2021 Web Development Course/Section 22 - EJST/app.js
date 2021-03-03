const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = [];

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res){

    var today = new Date();
    var currentDay = today.getDay();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //var day = days[currentDay];

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    var day = today.toLocaleDateString("en-US", options)

    //Express going to look for a file called views, then list
    res.render('list', {
        kindOfDay: day, 
        newListItem: items
     });
});

app.post('/', function(req, res){
    items.push(req.body.newItem);
    res.redirect('/');
});

app.listen(3000, function(){
    console.log('Server running on port: 3000');
});