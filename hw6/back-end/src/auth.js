'use strict';
//this is the stub for authentication
const cookieParser = require('cookie-parser')
const md5 = require('md5');
const bodyParser = require('body-parser')
const cookieKey = 'sid'
const User = []

const register = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const dob = new Date(req.body.birth).getTime();
	const zipcode = req.body.zipcode;
	const password = req.body.password;
	if (!username || !email || !dob || !zipcode || !password) {
		res.status(400).send({result: "all fields should be supplied"})
		return
	}
	var salt = Math.random()*1000;
	var hash = md5(password + salt)
	User[username] = {salt, hash}
	res.send({
		username: username, 
		status: "success"
	})
}

const login = (req, res) => {
	
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(400).send("username or password is missing")
		return
	}
	var userObj = User[username];
	if(!userObj){
		res.sendStatus(401)
		return
	}
	var salt = User[username].salt;
	var hash = User[username].hash;

	if(md5(password + salt) === hash){
		res.cookie(cookieKey, generateCode(userObj), 
			{maxAge: 3600*1000, httpOnly: true})
		
		var msg = { 
			username: username, 
			result: 'success'
		}
	    res.send(msg)
	} else{
		res.sendStatus(401)
	}
	
}

function generateCode(userObj) {
	return Math.floor(Math.random()*1000);
}

const putPassword = (req, res) => {
	var newPassword = req.body.password;
	if (!newPassword) {
		res.status(400).send({result: "Please send your password to update"})
		return
	}
	//update the password
	res.status(200).send({
		username: 'mz22test',
		status: 'will not change'
	})
}

const logout = (req, res) => {
	res.clearCookie(cookieKey)
	res.status(200).send("OK")
}


module.exports = app => {
	app.use(cookieParser());
    app.post('/login', login);
    app.put('/logout', logout);
    app.post('/register', register);
    app.put('/password', putPassword);
}



