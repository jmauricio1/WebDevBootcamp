const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const cors = require('cors');
const _ = require('lodash');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use(cors());
// app.use(express.json);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
  {
      useNewUrlParser: true, 
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//#region Item Schema
const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('item', itemSchema);
//#endregion

//#region 
/*
const clean = new Item({
  name: "Clean"
});

const eat = new Item({
  name: 'Eat'
});

const sleep = new Item({
  name: 'Sleep'
});

Item.insertMany([clean, eat, sleep], (err) => {
  if(err){
    console.log(err);
  }
  else{
    console.log('Saved to db successfully');
  }
});
*/
//#endregion

//#region List Schema 
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model('list', listSchema);
//#endregion

const item1 = new Item({
  name: '<-- Click the box to delete'
});

const item2 = new Item({
  name: 'Enter something and click the plus button'
});
const defaultItems = [item1, item2];

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
  //res.render("list", {listTitle: "Today", newListItems: ['something']});
  /*
  Item.find((err, items) =>{
    if(err){
      console.log(err);
    }
    else{
      res.render("list", {listTitle: "Today", newListItems: items});
    }
  });
  */
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  //This gets the value(list name) from the paramater list, from the submit button
  const listName = req.body.list;

  const addItem = new Item({
    name: item
  });

  if(listName === "Today"){
    addItem.save();
    res.redirect('/');
  }
  else{
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(addItem);
      foundList.save();
      res.redirect('/' + listName);
    });
  }
  //#region 
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
  //#endregion
});

//#region my post delete
app.post('/delete', (req, res) => {
  const itemID = req.body.oldItem;
  const listName = req.body.listName;

  //Just grabbing the id of what was checked off inside off our list
  console.log(itemID);

  if(listName === "Today"){
    Item.findByIdAndRemove(itemID, (err) => {
      if(err){
        console.log(err);
      }
      else{
        console.log('Successfully removed item checked.')
        res.redirect('/');
      }
    });
  }
  else{
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: 
        {_id: itemID}
      }
    }, (err, foundList) =>{
      if(!err){
        res.redirect('/' + listName);
      }
    });
  }
  //#endregion

  //#region 
  // Item.findByIdAndRemove(itemID, (err) => {
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log('Successfully removed item checked.')
  //     res.redirect('/');
  //   }
  // });
  //#endregion
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get('/:listName', (req, res) => {
  const tempListName = _.capitalize(req.params.listName);

  List.findOne({name: tempListName}, (err, foundList) => {
    if(!err){
      if(!foundList){
        //console.log('Doesnt exist');
        const list = new List({
          name: tempListName,
          items: defaultItems
        });
      
        list.save();

        res.redirect("/" + tempListName);
      }
      else{
        //console.log('Exists');
        res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port: 3000");
});