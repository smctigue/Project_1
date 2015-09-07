var express = require('express'),
	app = express();
	bodyParser = require('body-parser'),
	path = require("path"),
  _ = require("underscore"),
  views = path.join(process.cwd(), "views/");

var db = require("./models");

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(views + "index.html"));
});

app.get("/signup", function (req, res) {
	res.send('Signup coming soon...');
});









var listener = app.listen(3000, function () {
	console.log("Yo! Cheggout port " + listener.address().port);
});