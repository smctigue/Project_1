var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt');


// USER model
var UserSchema = new Schema ({
	email: {
		type: String,
		required: true	
	},
	passwordDigest: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	about: {
		type: String
	}
})

UserSchema.statics.createSecure = function (email, password, cb) {
	var _this = this;
	bcrypt.hash(password, 10, function (err, hash) {
		var user = {
			email: email,
			passwordDigest: hash,
			createdAt: Date.now()
		};
		_this.create(user, cb);
	});
};

UserSchema.statics.authenticate = function (email, password, cb) {
	this.findOne({email: email}, function (err, user) {
		if (user === null) {
			cb("Cannot find user", null);
		} else if (user.checkPassword(password)) {
			cb(null, user);
		} else {
			cb("Incorrect password", user)
		}
	});
};

UserSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
