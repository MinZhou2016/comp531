'use strict'

const md5 = require('md5');
const cookieParser = require('cookie-parser');

var cookieKey = 'sid'
var User = []


function generateCode(userObj) {
	return Math.floor(Math.random()*1000);
}


const login = (req,res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
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
		var msg = { username: username, result: 'success'}
	    res.send(msg)
	} else{
		res.sendStatus(401)
	}
}
function register(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var salt = Math.random()*1000;
	var hash = md5(password + salt)
	User[username] = {salt, hash}
	res.send({username: username, status: "success"})
}

module.exports = app => {
	app.use(cookieParser());
    app.post('/register', register);
    app.post('/login', login);
}