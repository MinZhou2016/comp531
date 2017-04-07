'use strict';
//this is the stub for following

let followings = [
        {username:"mz22", followings:["mz22test", "sep1"]},
        {username:"mz22test", followings:["mz22", "sep1"]},
        {username:"sep1", followings:["mz22", "mz22test"]}
]

const getFollowing = (req, res) => {
	if (!req.user) {
		req.user = 'mz22'
	}
	const username = req.params.user ? req.params.user : req.user;
	const follower = followings.filter(
		follower => {return follower.username == username}
	);

	res.status(200).send(follower);
}

const putFollowing = (req, res) => {
	
	const username = req.params.user
	
	if(!username){
		res.status(400).send({result: "Input a username to add follower"});
		return;
	}
	const target = followings.filter(follower => {

            if(follower.username == 'mz22') {
            	if(follower.followings.indexOf(username) === -1)
                follower.followings.push(username);
                return true;
    		}
	})
	res.status(200).send(target)
}

const deleteFollowing = (req, res) => {
	const username = req.params.user
	if(!username){
		res.status(400).send({result: "you should send a username to delete follower"});
		return;
	}
	let target = followings.filter(follower =>{
            
            if(follower.username == 'mz22') {
            	let index = follower.followings.indexOf(username)
            	if(index !== -1)
                follower.followings.splice(index, 1)
                return true;
            }
    })
	res.status(200).send(target)
}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}