const request = require('request')
const qs = require('querystring')
const express = require('express')
const cookieParser = require('cookie-parser')
const md5 = require('md5');
const session =require('express-session')
const passport = require('passport')

const FacebookStrategy = require('passport-facebook').Strategy;

const callbackURL = 'http://localhost:3000/auth/callback'

const config = {
	clientID:'766516446830128', 
	clientSecret:'784249cc021bc99cfbb539ba8b26afe4', 
	callbackURL
}

const cookieKey = 'sid'
const User = []

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
		
		const msg = { 
			username: username, 
			result: 'success'
		}
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
	res.send({
		username: username, 
		status: "success"
	})
}

const log_out = (req, res) => {
	res.status(200).send("OK")
}

const putPassword = (req, res) => {
	var newPassword = req.body.password;
	
	if (!newPassword) {
		res.status(400).send({result: "Input a password to update"})
		return
	}
	//update the password
	res.status(200).send({
		username: 'mz22',
		status: 'can not save the password in database'
	})
}

//use Facebook Strategy to login
passport.serializeUser(function(user, done){
	User[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = User[id]
	done(null,user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))

function logout(req,res){
	req.logout();
	req.redirect('/')
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		next()
	}
	else{
		res.redirect('/login')
	}
}

function profile(req,res){
	res.send({'ok now what?':req.user})
}

module.exports = app => {
	app.use(cookieParser());
    app.post('/login', login);
    app.put('/logout', log_out);
    app.post('/register', register);
    app.put('/password', putPassword);

    app.use(session({secret:'hahjdahjfjdfbsafshfjds'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
}

