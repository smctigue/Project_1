var express = require('express'),
	app = express();
	bodyParser = require('body-parser'),
	path = require('path'),
  _ = require('underscore'),
  keygen = require('keygenerator'),
  session = require('express-session'),
  views = path.join(process.cwd(), "views/");

var db = require("./models");

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(views + "index.html"));
});

app.use(
  session({
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

// Sign In/Out
app.get("/signin", function (req, res) {
  res.sendFile(path.join(views, "signin.html"));
});

app.use(function (req, res, next) {
  req.login = function (user) {
    req.session.userId = user._id;
  };
  req.currentUser = function (cb) {
    db.User.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  next(); 
});

// Signup
app.get("/signup", function (req, res) {
  res.sendFile(path.join(views, "signup.html"));
});

app.post(["/users", "/signup"], function signup(req, res) {
  var user = req.body.user;
  var email = user.email;
  var password = user.password;
  db.User.createSecure(email, password, function(err, user) {
    req.login(user);
    res.redirect("/profile"); 
  });
});

app.post(["/sessions", "/login"], function login(req, res) {
  var user = req.body.user;
  var email = user.email;
  var password = user.password;
  db.User.authenticate(email, password, function (err, user) {
    req.login(user);
    res.redirect("/profile"); 
  });
});

app.get("/profile", function userShow(req, res) {
  req.currentUser(function (err, user) {
    if (user === null) {
      res.redirect("/signup")
    } else {
      res.send("Hello " + user.email + "!");
    }
  })
});




var listener = app.listen(3000, function () {
	console.log("Yo! Cheggout port " + listener.address().port);
});