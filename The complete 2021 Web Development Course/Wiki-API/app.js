const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

//Make sure to have the server running on the cloud first or use 'mongod' in git bash if running locally
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

//Remember, mongoose will make the first parameter, lowercase and plural so we don't have to when we write the code
const Article = mongoose.model("article", articleSchema);

//#region All Articles
//route chaning so we don't have to write app.thing all the time
app.route("/articles")
  .get((req, res) => {
    Article.find((err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save((err) => {
      if (!err) {
        res.redirect("/articles");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });
//#endregion

//#region Specific Article
app.route('/articles/:articleID')
  .get((req, res) => {
      Article.findById(req.params.articleID, (err, data) => {
          if(!err){
              res.send(data);
          }
          else{
              res.send(err);
          }
      });
  })
  .put((req, res) => {
      Article.update(
        { _id: req.params.articleID}, 
        {title: req.body.title, content: req.body.content}, 
        {overwrite: true},
        (err) => {
            if(!err){
                res.send('Successfully updated article with ID: ' + req.params.articleID);
            }
        });
  })
  .patch((req, res) => {
      Article.update(
        {_id: req.params.articleID}, 
        {$set: req.body}, 
        (err) => {
            if(!err){
                res.send('Successfully updated body of article with ID: ' + req.params.articleID)
            }
            else{
                res.send(err);
            }
        });
  })
  .delete((req, res) => {
      Article.findByIdAndDelete(req.params.articleID, (err) => {
          if(!err){
              res.send('Successfully deleted article.');
          }
          else{
              res.send(err);
          }
      });
  });
//#endregion