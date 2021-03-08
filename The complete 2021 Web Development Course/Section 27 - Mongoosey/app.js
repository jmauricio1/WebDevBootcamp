const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () =>{
    console.log('Server is running on port: 3000');
})

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
    {
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

//Schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//The first parameter is the name of the model and best to be singular instead of plural
//We are using the fruitSchema as our model in order to make new fruit documents
//first parameter will also applies lodash and will take out spaces and lowercase everything before applying to db
const Fruit = mongoose.model('fruit', fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Depending on the apple, they have can have reall good sking with a crisp taste, or just be bland."
});

//Saving a fruit document inside of a fruit collection, inside of our db
//fruit.save();

const kiwi = new Fruit({
    name: 'Kiwi',
    score: 5,
    review: "Never really ate it a lot, but it was good when I had it."
});

const strawberry = new Fruit({
    name: 'Strawberry',
    score: 9,
    review: "Sweet and sour, and almost perfect."
});

//Inserting multiple documents at once
//First parameter is an array of documents/objects you want to add
//Second parameter is basically an error/success function
/*
Fruit.insertMany([kiwi, strawberry], (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Successfully saved all fruits to db');
    }
});
*/

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model('person', peopleSchema);

const person = new Person({
    name: 'John',
    age: 37
});

//person.save();

//This is not going to work because it does not pass the data validation check (required)
const coconut = new Fruit({
    name: "Coconut",
    score: 9,
    review: "From the tree of life"
});
//coconut.save();

const pineapple = new Fruit({
    name: "Pineapple",
    score: 8,
    review: "Super good with li hing mui"
});

//pineapple.save();

const tempPerson = new Person({
    name: "Amy",
    age: 24,
    favoriteFruit: pineapple
});
tempPerson.save();

//Reading all the documents from the fruits collection
Fruit.find((err, fruits) =>{
    if(err){
        console.log(err);
    }
    else{
        //console.log(fruits);
        fruits.forEach(element => {
            console.log(element.name);
        });
    }
});


/*
Updating multiple values of a single entity

Fruit.updateOne({
        _id: "60455dd239c51e1908b21f56"
    },
    {
        name: "Coconut",
        review: "From the tree of life."
    },
    (err) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully updated the document");
        }
    });
    */


    /*
    Deleting a single entity from its id
    Fruit.deleteOne({_id: "60455dd239c51e1908b21f56"}, (err) =>{
        if(err){
            console.log('There was a problem with deleting the current document.');
        }
        else{
            console.log('Delete successful.');
        }
    });
    */