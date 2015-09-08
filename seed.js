var db = require("./models");

db.User.find({}, function(err, dbList) {
	if(err) {return console.log(err); }
	console.log("\nDatabase length: " + dbList.length);
	dbList.forEach(function(dbEntry) {
		console.log(dbEntry.email);
	});
	process.exit(0);
});