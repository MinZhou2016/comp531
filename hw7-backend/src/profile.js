'use strict';

// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
const Profile = require('./model.js').Profile;

const getHeadlines = (req, res) => {
	const users = req.params.users;

	const userArray = users? users.split(','):[req.username];

	Profile.find({username : {$in: userArray}},function(err,elements){
		if(err){
			console.log(err);
			return;
		}else if(!elements || elements.length === 0 || elements.length !== userArray.length){
			res.status(400)
			.send("The users you input is not registered users")
		}else {
			const headlines = elements.reduce(function(pre,cur){
				pre.push({
					username: cur.username,
					headline: cur.headline
				})
				return pre;
			},[])
			res.status(200)
			.send({
				headlines: headlines
			})

		}
	})
}

const putHeadline = (req, res) => {

	const headline = req.body.headline;
	const username = req.username;

	if(headline){
		Profile.findOneAndUpdate({username: username},{headline: headline},{ new: true },function(err,user){
			if(err){
				console.log(err);
				return;
			}else if(user){
				res.status(200)
				.send({
					username: username,
					headline: headline
				})
			}else {
				res.sendStatus(401);
			}
		})
	}else {
		res.status(400)
		.send("You need to input a new headline")
	}
	
}

const getEmail = (req, res) => {

	const user = req.params.user;

	const username = user? user: req.username;

	Profile.findOne({username: username},function(err,user){
		if(err){
			console.log(err);
			return;
		}else if(user){
			res.status(200)
			.send({
				username:username,
				email: user.email
			})
		}else {
			res.status(400)
			.send("The user you input is not a registered user")
		}
	})
	
}

const putEmail = (req,res) => {

	const username = req.username;
	const email = req.body.email;

	if(email){
		Profile.findOneAndUpdate({username: username},{email:email},{new: true},function(err,user){
			if(err){
				console.log(err);
				return;
			}else if(user){
				res.status(200)
				.send({
					username:username,
					email: email
				})
			}else {
				res.status(400)
				.send("The user is not logged in")
			}
		})
	}else {
		res.status(401)
		.send("You need to input a new Email to update")
	}
	
}

const getZipcode = (req, res) => {

	const user = req.params.user;

	const username = user? user: req.username;

	Profile.findOne({username: username},function(err,user){
		if(err){
			console.log(err);
			return;
		}else if(user){
			res.status(200)
			.send({
				username:username,
				zipcode: user.zipcode
			})
		}else {
			res.status(400)
			.send("The user you input is not a registered user")
		}
	})
	
}

const putZipcode = (req,res) => {

	const username = req.username;
	const zipcode = req.body.zipcode;

	if(zipcode){
		Profile.findOneAndUpdate({username: username},{zipcode:zipcode},{new: true},function(err,user){
			if(err){
				console.log(err);
				return;
			}else if(user){
				res.status(200)
				.send({
					username:username,
					zipcode: zipcode
				})
			}else {
				res.status(400)
				.send("The user is not logged in")
			}
		})
	}else {
		res.status(401)
		.send("You need to input a new zipcode to update")
	}
	
}

const getAvatars = (req, res) => {
	
	const users = req.params.users;

	const userArray = users? users.split(','):[req.username];

	Profile.find({username : {$in: userArray}},function(err,elements){
		if(err){
			console.log(err);
			return;
		}else if(!elements || elements.length === 0 || elements.length !== userArray.length){
			res.status(400)
			.send("The users you input is not registered users")
		}else {
			const avatars = elements.reduce(function(pre,cur){
				pre.push({
					username: cur.username,
					avatar: cur.avatar
				})
				return pre;
			},[])
			res.status(200)
			.send({
				avatars: avatars
			})

		}
	})
}

const putAvatar = (req,res) => {
	
	const avatar = req.body.avatar;
	const username = req.username;

	if(avatar){
		Profile.findOneAndUpdate({username: username},{avatar: avatar},{ new: true },function(err,user){
			if(err){
				console.log(err);
				return;
			}else if(user){
				res.status(200)
				.send({
					username: username,
					avatar: avatar
				})
			}else {
				res.sendStatus(401);
			}
		})
	}else {
		res.status(400)
		.send("You need to upload a new avatar")
	}
}

const getDob = (req, res) => {
	const username = req.username;

	Profile.findOne({username: username}).exec(function(err,user){
		res.status(200)
		.send({
			username:username,
			dob:user.dob
		})
	})
}

module.exports = app => {
     app.get('/headlines/:users?', getHeadlines)
     app.put('/headline', putHeadline)

     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatar)

     app.get('/dob', getDob)
}