'use strict';

const request = require('request')
const express = require('express')
const cookieParser = require('cookie-parser')
const md5 = require('md5');
const session =require('express-session')
const passport = require('passport')

const FacebookStrategy = require('passport-facebook').Strategy;

const callbackURL = 'http://localhost:3000/auth/callback'

const redis = require('redis').createClient('redis://h:p58e9dc78c2c67ad2c232a5ea339afcc3dc0d9f3337cb24a03db0864a988b60f5@ec2-34-206-56-163.compute-1.amazonaws.com:27939')

const config = {
	clientID:'766516446830128', 
	clientSecret:'784249cc021bc99cfbb539ba8b26afe4', 
	callbackURL
}

const cookieKey = 'sid'

const User = require('./model.js').User

var users = [];

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

	User.find({username: username}).exec(function(err, users){
        if (users === null || users.length === 0){
            res.sendStatus(401)
            return
        }
        userObj = users[0]
		if(!userObj){
			res.sendStatus(401).send("This User is not in database")
		}
		var salt = userObj.salt;
		var hash = userObj.hash;

		if(md5(password + salt) === hash){
			const sessionKey = md5("This is my secret!" + new Date().getTime() + userObj.username)
			redis.hmset(sessionKey, userObj)
			res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
			res.send({ username: username, result: 'success'})
		} else{
			res.sendStatus(401)
		}
	})
}
function register(req, res) {

	var username = req.body.username;
	var email = req.body.email;
	var dob = req.body.dob;
	var zipcode = req.body.zipcode;
	var password = req.body.password;
	if (!username || !email || !dob || !zipcode || !password) {
		res.status(400).send({result: "You have something missing"})
		return
	}

	User.find({username: username}).exec(function(err, users){
		if(users.length !== 0) {
			res.status(400).send(`${username} has already been registered.`)
			return
		} else {
			const salt = md5(username + new Date().getTime())
			const hash = md5(password + salt)
			const userObj = new User({username: username, salt: salt, hash: hash, auth:[]})
			new User(userObj).save(function (err, usr){
				if(err) return console.log(err)
			})
			res.send({
				username: username,
				result: 'success'
			})
		}
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
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = users[id]
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
	var sessionKey = req.cookie[cookieKey]
	if (!sessionKey){
        return res.sendStatus(401)
    }
    redis.hgetall(sessionKey, function(err, userObj) {
    	if(err) {
    		console.log('${err} happen')
    	}
    	console.log(sessionKey + 'mapped to ' + userObj)
    	if(userObj){
    		username = userObj.username
			next()
		}
		else{
			res.redirect('/login')
		}
    })
	
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
