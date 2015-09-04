var express = require('express'),
		bodyParser = require('body-parser'),
		app = express();

		app.use(bodyParser.urlencoded({extended: true}))

		app.get("/signup", function (req, res) {
			res.send('Hello World');
		});











	var listener = app.listen(3000, function () {
		console.log("Yo! Cheggout port " + listener.address().port);
	});