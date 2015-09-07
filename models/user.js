var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt');

var UserSchema = new Schema ({
	email: {
		type: String,
		required: true	
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	about: {
		type: String
		required: false
	}
})

var User = mongoose.model('User', UserSchema);
module.exports = User;