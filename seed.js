var db = require("./models");
//var ourQuotes = require("./quotes.json");


  // db.Quote.create(quotes, function(err, quotes) {
  //   if (err) {
  //     return console.log(err);
  //   };
  //   console.log("Added", quotes.length, "quotes");
  // });


// Checks userlist
	db.User.find({}, function(err, dbList) {
		if(err) {return console.log(err); }
		console.log("\nDatabase length: " + dbList.length);
		dbList.forEach(function(dbEntry) {
			console.log(dbEntry);
		});
	});


// //CLEARS database
// db.User.remove({}, function(err, user) {
// 	if (err) {console.log(err)
// 	};
// 	process.exit(0);
// })