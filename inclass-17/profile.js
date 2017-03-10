
const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadlines)
     app.put('/headline', putHeadlines)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatars)
}
const getHeadlines = (req,res) => {
	res.send(
		{headlines: [
			{username: 'me', headline: 'headline of me'},
			{username: 'user2', headline: 'headline of user2'},
		]
	})
}
const putHeadlines = (req,res) =>{
	res.send(
			{username: 'use1', headline: req.body.headline || 'you did not supply it'}
	)
}

const getEmail = (req, res) => {
	res.send({username: 'me', email: 'someone1@somebody.net'})
}

const putEmail = (req, res) => {
	res.send({
		username: 'Someone1',
		email: req.body.email || 'you did not supply email'
		})
}

const getZipcode = (req, res) => {
	res.send({username: 'me', zipcode: '12345'})
}

const putZipcode = (req, res) => {
	res.send({
		username: 'Someone1',
		zipcode: req.body.zipcode || 'you did not supply zipcode'
		})
}

const getAvatars = (req, res) => {
	res.send(
		{avatars:[
			{username: 'me', avatar: 'url1'},
			{username: 'Someone2', avatar: 'url2'},
			{username: 'Someone3', avatar: 'url3'}
		]
	})
}

const putAvatars = (req, res) => {
	res.send({
		username: 'Someone1',
		avatar: req.body.avatar || 'you did not supply file'
		})
}