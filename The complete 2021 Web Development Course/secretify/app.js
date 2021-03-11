const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
//const encrypt = require('mongoose-encryption');'
//const md5 = require('md5');
//const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
require("dotenv").config();

const saltRounds = 10;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//Check documentation to see what this does
app.use(
  session({
    secret: process.env.OMG,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("secretsDB connection established successfully");
});

const secret = process.env.OMG;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

//This is used to salt and hash our passwords, and to save users into mongodb
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//We are currently only going to encrypt the password using the key from .env
/* This is if we were to use mongoose-encryption

userSchema.plugin(encrypt, {
        secret: secret, 
        encryptedFields: ['password']
    });
    */

const User = mongoose.model("user", userSchema);

passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      uerProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  //#region Cookies and Passport
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
  //#endregion

  //#region Hashing and Passwords
  /*
  const username = req.body.username;
  const password = req.body.password;
  //#region 
  //const password = md5(req.body.password);

  /* For md5 and regular encryption
  User.findOne({ email: username }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        if (data.password === password) {
          res.render("secrets");
        }
      }
    }
  });

 //#endregion

  //This is with the bcrypt
  User.findOne({ email: username }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
          if (result === true) {
            res.render("secrets");
          }
          else{
            res.render('login');
          }
        });
      }
    }
  });
  */
  //#endregion
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", (req, res) => {
  //   if (req.isAuthenticated()) {
  //     res.render("secrets");
  //   } else {
  //     res.redirect("login");
  //   }
  User.find({ secret: { $ne: null } }, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
});

app.post("/register", (req, res) => {
  //#region Passport and Cookies
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    }
  );
  //#endregion

  //#region Passwords and Hashing
  /*Normal user creation
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    */
  //Creating a user and hashing password with md5

  /*
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });

    newUser.save((err) => {
      if (!err) {
        res.render("secrets");
      } else {
        console.log(err);
      }
    });
  });
  */

  /*
  Hashing password with md5
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password),
  });

  newUser.save((err) => {
    if (!err) {
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
  */
  //#endregion
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("login");
  }
});

app.post("/submit", (req, res) => {
  const submittedSecret = req.body.secret;

  //See user credentials
  //console.log(req.user);

  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(() => {
          res.redirect("/secrets");
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
