'use strict';
//this is the stub for authentication
const Profile = require('./model.js').Profile;
const User = require("./model.js").User
const md5 = require('md5');
const cookieParser = require('cookie-parser');


const mySecretMessage = "This is Min Zhou's backend secret message";
const sessionUser = {};
const cookieKey = 'sid';


const login = (req,res) => {
	const username = req.body.username;
	const password = req.body.password;

	if(!username || !password){
		res.status(400)
		.send("You cannot login with field missing")
	}
	//see if the user has registered
	User.find({username: username},function(err,user){
		if(err){
			console.log(err);
			return;
		}else if(!user || user.length === 0){
			res.status(401)
			.send("This user has not registered")
		}else {
			const userObj = user[0];
			//see if password is correct
			console.log(userObj);
			if(md5(password + userObj.salt) ===  userObj.hash){
				const sessionKey = md5(mySecretMessage + new Date().getTime() + userObj.username);
				sessionUser[sessionKey] = userObj;

				//ser a cookie
				res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true})
				res.send({
					username: username,
					result: 'success'
				})
			}else {
				res.status(401)
				.send("You password is incorrect")
			}
		}
	})

}

const isLoggedIn = (req,res,next) => {
	const sid = req.cookies[cookieKey];
	if(!sid){
		return res.sendStatus(401)
	}
	const username = sessionUser[sid].username;

	if(username){
		req.username = username;
		next();
	}else{
		res.sendStatus(401);
	}

}


const register = (req,res) => {

	const username = req.body.username;
	const email = req.body.email;
	const dob = new Date(req.body.dob).getTime();
	const zipcode = req.body.zipcode;
	const password = req.body.password;

    if(!username || !email || !dob || !zipcode || !password){
    	res.status(400)
    	.send("You cannot register with fields missing")

    	return;
    }

    // Old User can not register again
    User.find({username: username},function(err,user){
    	if(err){
    		console.log(err);
    		return;
    	}else if(user.length === 0){
    		
    		Profile.create({
				username: username,
				headline: "new User",
				following: [],
				email: email,
				dob: dob,
				zipcode: zipcode,
				avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/New_user_icon-01.svg/2000px-New_user_icon-01.svg.png"
			},function(err,profile){
				if(err){
					console.log(err);
					return;
				}
			})

    		// const random = md5(username + new Date().getTime());

    		const salt = md5(username + new Date().getTime())
			const hash = md5(password + salt)
    		
    		User.create({
    			username:username,
				hash: hash,
				salt: salt
    		},function(err, user){
    			if(err){
    				console.log(err);
    				return;
    			}
    		})

    		res.send({
    			username: username,
    			result: 'success'
    		})


    	}else {
    		res.status(400)
    		.send(`${username} has already been used!`)
    	}
    })


}

const putPassword = (req,res) => {
	const password = req.body.password;

	if(!password){
		res.status(400)
		.send("No password to be updated")
	}

	const username = req.username;
	console.log(username);

	// const random = md5(username + new Date().getTime());

    const salt = md5(username + new Date().getTime())
	const hash = md5(password + salt)

	User.findOneAndUpdate({username: username}, {$set: {salt: salt, hash: hash}}, {new: true},function(err,user){
		if(err){
			console.log(err);
			return;
		}else if(user){
			res.status(200).send("Password successfully updated")
		}else{
			res.status(400)
			.send("No password been found")
		}
	})

}

const logout = (req,res) => {
	
	const sid = req.cookies[cookieKey]
	sessionUser[sid] = undefined;
	res.clearCookie(cookieKey)
	res.status(200).send("OK")
}


module.exports = app => {
	app.use(cookieParser());
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
    app.put('/password', putPassword);
}



