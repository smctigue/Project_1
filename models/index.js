var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project_1");

module.exports.User = require("./user");