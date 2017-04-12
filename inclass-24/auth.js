

const redis = require('redis').createClient(
	'redis://h:p58e9dc78c2c67ad2c232a5ea339afcc3dc0d9f3337cb24a03db0864a988b60f5@ec2-34-206-56-163.compute-1.amazonaws.com:27939')

var users = [];

const login = (req,res) => {
	
	var username = req.body.username;
	var password = req.body.password;

	var salt = userObj.salt;
	var hash = userObj.hash;

	if(md5(password + salt) === hash){
		const sessionKey = md5("This is my secret!" + new Date().getTime())
		redis.hmset(sessionKey, userObj)
		res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
		res.send({ 
				username: username, 
				result: 'success'
			})
		}
	})
}


function isLoggedIn(req, res, next){
	
	var sessionKey = req.cookie[cookieKey]

    redis.hgetall(sessionKey, function(err, userObj) {
    	
    	if(userObj){
    		username = userObj.username
		}
		else{
			res.redirect('/login')
		}
    })
	
}

