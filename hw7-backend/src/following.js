'use strict';
//this is the stub for following
const Profile = require('./model.js').Profile;


const getFollowing = (req, res) => {
	
	const username = req.params.user ? req.params.user : req.username;

	Profile.findOne({username: username},function(err,user){
		if(err){
			console.log(err);
			return;
		}else if(!user){
			res.status(400)
			.send("The user you input is not a registered user")
		}else {
			res.status(200)
			.send({
				username: username,
				following: user.following
			})
		}
	})
	
}

const putFollowing = (req, res) => {
	
	const addUser = req.params.user;

	if(!addUser){
		res.status(400)
		.send("You need to input an name to add a follower")
	}

	const username = req.username;
	
	Profile.find({username: addUser}).exec(function(err,user){
		if(err){
			console.log(err);
			return;
		}else if(!user || user.length === 0){
			res.status(400)
			.send("The person you want to add is not a registered User")
		}else {
			Profile.findOne({username: username},function(err,userObj){
				if(err){
					console.log(err);
					return;
				}else{
					userObj.following.push(addUser);
					userObj.save();
					res.status(200)
					.send({
						username: username,
						following: userObj.following
					})
				}
			})
		}
	})	
}

const deleteFollowing = (req, res) => {
	const deleteUser = req.params.user;

	if(!deleteUser){
		res.status(400)
		.send("You need to input an name to delete a follower")
	}

	const username = req.username;

	Profile.findOneAndUpdate({username: username},{$pull : {following: deleteUser}},{new: true},function(err,user){
		if(err){
			console.log(err);
			return;
		}else {
			res.status(200)
			.send({
				username: username,
				following: user.following
			})
		}
	})

}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}