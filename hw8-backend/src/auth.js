'use strict';
//this is the stub for authentication
const Profile = require('./model.js').Profile;
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const User = require("./model.js").User
const md5 = require('md5');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;


const mySecretMessage = "This is Min Zhou's backend secret message";
// const sessionUser = {};
const cookieKey = 'sid';

if (!process.env.REDIS_URL) {
    process.env.REDIS_URL = 'redis://h:pb8a9d2e1dc565ff2a2d60d8d847e37c292d29f502f383ba122cac138c63ba926@ec2-34-206-56-163.compute-1.amazonaws.com:37549'
}
const redis = require('redis').createClient(process.env.REDIS_URL)


const configFacebookAuth = {
	clientID:'766516446830128', 
	clientSecret:'784249cc021bc99cfbb539ba8b26afe4', 
	callbackURL:  'https://final-social-website.herokuapp.com/auth/facebook/callback',
	passReqToCallback: true
}

let originHostUrl = '';

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
			
			if(md5(password + userObj.salt) ===  userObj.hash){
				const sessionKey = md5(mySecretMessage + new Date().getTime() + userObj.username);
				redis.hmset(sessionKey, userObj)

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

	if (req.isAuthenticated()) {
		const usrArr = req.user.username.split('@');
		const authObj = {}
		authObj[`${usrArr[1]}`] = usrArr[0]
		User.findOne({auth: authObj}).exec(function(err,user) {
			if(!user){
				req.username = req.user.username
			} else {
				req.username = user.username
			}
			next()
		})
	}else {
	
		const sid = req.cookies[cookieKey];
		
		if(!sid){
			return res.sendStatus(401);
		}
		// const username = sessionUser[sid].username;

		// if(username){
		// 	req.username = username;
		// 	next();
		// }else{
		// 	res.sendStatus(401);
		// }

		redis.hgetall(sid, function(err, userObj) {
		   	if(err){
		   		throw err;
		   	}
		    if(userObj){
		    	console.log(sid + ' mapped to ' + userObj.username)
		    	req.username = userObj.username
				next()
			}else{
				res.sendStatus(401)
			}
		})
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
	
	if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		//corner case for link acount
		if(req.cookies[cookieKey] !== undefined){
			const sid = req.cookies[cookieKey]
			redis.del(sid)
			res.clearCookie(cookieKey)
		}
		res.status(200)
		.send("OK")
	} else if(req.cookies[cookieKey] !== null){
		const sid = req.cookies[cookieKey]
		redis.del(sid)
		res.clearCookie(cookieKey)
		res.status(200)
		.send("OK")
	}
}

passport.use(new FacebookStrategy(configFacebookAuth,
	function(req, token, refreshToken, profile, done){
		const username = profile.displayName + "@" + profile.provider
		//check if the user is login
		const sid = req.cookies[cookieKey]
		if(!sid){
			User.findOne({username: username}).exec(function(err, user) {
				if(!user || user.length === 0){
					const userObj = new User({username: username, authId: profile.id})
					new User(userObj).save(function (err, usr){
						if(err) return console.log(err)
					})
					const profileObj = new Profile({username: username, headline: "login by facebook", following:[], email: null, zipcode: null, dob: new Date(1999,09,09).getTime(),
					 avatar: "http://www.freeiconspng.com/uploads/-created-by-adobe-social-to-launch-with-facebook-integration--the-drum-7.png"})
					new Profile(profileObj).save(function (err, usr){
						if(err) return console.log(err)
					})
				}
				return done(null, profile)
			})
		} else {
			//no login user link loal user
			redis.hgetall(sid, function(err, userObj) {
				const localUser = userObj.username
				Article.update({author:username}, { $set: { 'author': localUser}}, { new: true, multi: true }, function(){})
				Article.update({'comments.author' : username}, { $set: {'comments.$.author': localUser}}, { new: true, multi: true }, function(){})
				Comment.update({author:username}, { $set: { 'author': localUser}}, { new: true, multi: true }, function(){})
				Profile.findOne({username: username}).exec(function(err, profileData){
					if(profileData){
						const oldFollowingArr = profileData.following
						Profile.findOne({username: localUser}).exec(function(err, newProfile) {
							if(newProfile){
								
								const newFollowingArr = newProfile.following.concat(oldFollowingArr)
								Profile.update({username: localUser}, {$set: {'following': newFollowingArr}}, function(){})
							}
						})
						
						Profile.update({username: username}, {$set: {'following':[]}}, function(){})
					}
				})
				User.findOne({username: localUser}).exec(function(err, user){
					if(user){
						let authObj = {}
						authObj[`${profile.provider}`] = profile.displayName
						User.update({username: localUser}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
					}
				})
			})
			return done(null, profile)
		}
	}
))

const merge = (req, res) => {
	const username = req.body.regUsername;
	const password = req.body.regPassword;

	if (!username || !password) {
		res.status(400).send("can not get your username")
		return
	}

	User.find({username: username}).exec(function(err, users){
        if (!users || users.length === 0){
            res.sendStatus(400)
            return
        }
        const userObj = users[0]
		if(!userObj){
			res.status(400).send("can not get your user")
		}
		const salt = userObj.salt;
		const hash = userObj.hash;

		if(md5(password + salt) === hash){
			//update thrid party user profile
			Article.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi: true}, function(){})
			Article.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, { new: true, multi: true }, function(){})
			Comment.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi: true }, function(){})
			Profile.findOne({username: req.username}).exec(function(err, profile){
				if(profile){
					const oldFollowingArr = profile.following
					Profile.findOne({username: username}).exec(function(err, newProfile) {
						if(newProfile){
							//concat follower
							const newFollowingArr = newProfile.following.concat(oldFollowingArr)
							Profile.update({username: username}, {$set: {'following': newFollowingArr}}, function(){})
						}
					})
					//else delete the profile record
					Profile.update({username: req.username}, {$set: {'following':[]}}, function(){})
				}
			})
			User.findOne({username: username}).exec(function(err, user){
				if(user){
					const usrArr = req.username.split('@');
					const authObj = {}
					authObj[`${usrArr[1]}`] = usrArr[0]
					User.update({username: username}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
				}
			})
			res.status(200).send({ username: username, result: 'success'})
		} else{
			res.status(401).send("incorrect password!")
		}
	})
}

const unlink = (req, res) => {
	const username = req.username;
	const company = req.body.company;

	User.findOne({username: username}).exec(function(err, user){
		if(user.auth.length !== 0){
			User.findOne({username: username}).exec(function(err,user){
				let authArr = user.auth
				authArr = authArr.filter(function (obj) {
					return Object.keys(obj)[0] !== company;
				})
				User.update({username: username}, {$set: {'auth': authArr}}, {new: true}, function(){})
				res.status(200).send({result: 'successfully unlink ' + company})
			})
		} else {
			res.status(400).send("no link account")
		}
	})
}

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	User.findOne({authId: id}).exec(function(err, user) {
		done(null, user)
	})
})

const successFun = (req,res) => {
	console.log(originHostUrl)
	res.redirect(originHostUrl)
}

const errorFun = (err,req,res,next) => {
    if(err) {
        res.status(400);
        res.send({err: err.message});
    }
}

const locationFun = (req, res, next) => {
	if(originHostUrl === ''){
		originHostUrl = req.headers.referer
	}
	next()
}



module.exports = app => {
	app.use(cookieParser());

	app.use(locationFun)
	app.use(session({secret:'thisIsMySecretMessage', resave: false, saveUninitialized: false}))
    app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/login/facebook'}), successFun, errorFun)


    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);

    app.use('/link/facebook', passport.authorize('facebook', {scope:'email'}))
    app.post('/unlink', unlink)
	app.post('/merge', merge)


    app.put('/logout', logout);
    app.put('/password', putPassword);
}



