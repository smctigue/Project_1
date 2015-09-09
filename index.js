var express = require('express'),
  app = express();
bodyParser = require('body-parser'),
  path = require('path'),
  _ = require('underscore'),
  keygen = require('keygenerator'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  views = path.join(process.cwd(), "views/");

var db = require("./models");

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

// ROUTES
app.get("/", function(req, res) {
  res.sendFile(path.join(views + "index.html"));
});

app.use(
  session({
    secret: keygen._({
      specials: true
    }),
    resave: false,
    saveUninitialized: true
  })
);

app.use(function(req, res, next) {
  req.login = function(user) {
    req.session.userId = user._id;
  };
  req.currentUser = function(cb) {
    db.User.findOne({
        _id: req.session.userId
      },
      function(err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  }
  next();
});

// Sign Up
app.get("/signup", function(req, res) {
  res.sendFile(path.join(views, "signup.html"));
});

app.post(["/signup"], function signup(req, res) {
  var user = req.body.user;
  var email = user.email;
  var password = user.password;
  db.User.createSecure(email, password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/signup");
    } else {
      req.login(user);
      res.redirect("/profile");
    }
  });
});

// Sign In
app.get("/signin", function(req, res) {
  res.sendFile(path.join(views, "signin.html"));
});

app.post(["/sessions", "/signin"], function login(req, res) {
  var user = req.body.user;
  var email = user.email;
  var password = user.password;
  db.User.authenticate(email, password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      req.login(user);
      // res.cookie("guid", user._id, { signed: true });
      res.redirect("/profile");
    }
  });
});

// HOME
app.get("/home", function(req, res) {
  res.sendFile(path.join(views, "home.html"));
});

// PROFILE
app.get("/profile", function(req, res) {
  res.sendFile(path.join(views, "profile.html"));
});

app.get("/profile", function userShow(req, res) {
  req.currentUser(function(err, user) {
    if (user === null) {
      res.redirect("/signup");
    } else {
      res.render("profile", {
        user: currentUser
      });
    }
  })
});

app.delete(["/sessions", "/logout"], function(req, res) {
  req.logout();
  res.redirect("/");
});

// QUOTES JSON
app.get("/users", function(req, res) {
  db.Quote.find({},
    function(err, quotes) {
    	if (err) {
    		res.send(err);
    	}
      res.send(quotes);
    });
});

app.post("/users", function(req, res) {
  var newQuote = req.body;
  db.Quote.create(newQuote, function(err, quote) {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.send(quote);
  })
});

app.delete("/users/:id", function(req, res) {
  var id = req.params.id;
  db.Quote.remove({
    _id: id
  }, function(err, quote) {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.sendStatus(200);
  })
});



var listener = app.listen(3000, function() {
  console.log("Yo! Cheggout port " + listener.address().port);
});