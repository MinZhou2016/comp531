'use strict';

// this is profile.js which contains all user profile 
// information except passwords which is in auth.js

const uploadImage = require('./uploadCloudinary')

const profiles = [
		{	username : 'Scott', 
			email : 'foo@bar.com',
			zipcode:  12345,
			avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
			dob: Date.parse('1980-01-01'),
			headline: "This is my headline!"
		},
		{	username : 'mz22', 
			email : 'mz22@rice.edu',
			zipcode: 77031,
			avatar: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTas_QZbc3dYPh5zikUqlbtcu-gaLUyPYutG6Mw4z_T7NoUcWxNMDpyhV8',
			dob: Date.parse('1994-10-09'),
			headline: "Become a web developer"
		},
		{	username: 'mz22test',
			email : 'mz22test@rice.edu',
			zipcode: 77050,
			avatar: 'http://www.rice.edu/_images/rice-logo.jpg',
			dob: Date.parse('1990-01-01'),
			headline: "Become a web developer"
		}
]

const getHeadlines = (req, res) => {
	if (!req.user) {
		req.user = 'mz22'
	}
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	var headlines = users.map(user => {
		let target = profiles.filter(p =>{return p.username == user})
		return {
			username: user,
			headline: target[0].headline
		}
	})
	res.send({headlines})
}

const putHeadline = (req, res) => {
	const user = 'mz22'
	const headline = req.body.headline
	if (!headline) {
		res.status(400).send('Input a new headline to update')
	}
	let target = profiles.filter(p =>{
		p.headline = headline
		return p.username == user
	})
	res.status(200).send({
		username: user, 
		headline: target[0].headline
	})
}

const getEmail = (req, res) => {
	if (!req.user) {
		req.user = 'mz22'
	}
	const user = req.params.user ? req.params.user : req.user
	let target = profiles.filter(p =>{
		return item.username == user
	})
	res.status(200).send({
		username: user, 
		email: target[0].email
	})
}

const putEmail = (req,res) => {
	const user = 'mz22'
	const email = req.body.email
	if (!email) {
		res.status(400).send('Input an email to update')
	}
	let target = profiles.filter(p =>{
		p.email = email
		return p.username == user
	})
	res.status(200).send({
		username: user,
		email: target[0].email
	})
}

const getZipcode = (req, res) => {
	if (!req.user) {
		req.user = 'mz22'
	}
	const user = req.params.user ? req.params.user : req.user
	let target = profiles.filter(p =>{
		return p.username == user
	})
	res.status(200).send({
		username: user, 
		zipcode: target[0].zipcode
	})
}

const putZipcode = (req,res) => {
	const user = 'mz22'
	const zipcode = req.body.zipcode
	if (!zipcode) {
		res.status(400).send('Input a new zipcode to update')
	}
	let target = profiles.filter( p =>{
		p.zipcode = zipcode
		return p.username == user
	})
	res.status(200).send({
		username: user,
	    zipcode: target[0].zipcode
	})
}

const getAvatars = (req, res) => {
	if (!req.user) {
		req.user = 'mz22'
	}
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	
	const avatars = users.map(user => {
		let target = profiles.filter(p =>{
			return item.username == user
		})
		return {
			username: user, 
			avatar: target[0].avatar
		}
	})
	res.send({avatars})
}

const putAvatar = (req,res) => {
	const user = 'mz22'
	const avatar = req.body.avatar
	if (!avatar) {
		res.status(400).send('Input a avatar to update')
	}
	let target = profiles.filter(p =>{
		p.avatar = avatar
		return p.username == user
	})
	res.status(200).send({
		username: user, 
		avatar: target[0].avatar
	})
}

const getDob = (req, res) => {
	if (!req.user) {
		req.user = 'mz22'
	}
	
	const user = req.params.user ? req.params.user : req.user
	let target = profiles.filter(p =>{
		return p.username == user
	})
	res.status(200).send({
		username: user, 
		dob: target[0].dob
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
     app.put('/avatar', uploadImage('avatar'),putAvatar)

     app.get('/dob', getDob)
}