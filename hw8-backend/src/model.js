var mongoose = require('mongoose');
require('./db.js')


const profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [String],
	email: String,
	dob: String,
	zipcode: String,
	avatar: String
})

var userSchema = new mongoose.Schema({
	username:String,
	hash: String,
	salt: String,
	auth: [],
    authId: String
})

var commentSchema = new mongoose.Schema({
	commentId: String,
	text: String,
	date: Date,
	author: String
})

var articleSchema = new mongoose.Schema({
	author: String,
	img:String,
	text: String,
	date: Date,
	comments: [commentSchema]
})

exports.Profile = mongoose.model("Profile",profileSchema);
exports.User = mongoose.model("User",userSchema);
exports.Comment = mongoose.model('Comment', commentSchema)
exports.Article = mongoose.model('Article', articleSchema)