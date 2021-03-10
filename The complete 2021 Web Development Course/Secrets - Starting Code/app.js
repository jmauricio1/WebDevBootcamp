const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('secretsDB connection established successfully');
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('user', userSchema);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            if(data){
                if(data.password === password){
                    res.render('secrets');
                }
            }
        }
    });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save((err) => {
        if(!err){
            res.render('secrets');
        }
        else{
            console.log(err);
        }
    });
});

app.listen(3000, () => { 
    console.log('Server is running on port: 3000');
});