'use strict';
//this is the stub for article
const Article = require("./model.js").Article;
const Profile = require('./model.js').Profile;
const Comment = require('./model.js').Comment;
const md5 = require('md5')
const ObjectId = require('mongoose').Types.ObjectId;


const getArticles = (req,res) => {
	
	if(req.params.id){
		 Article.find(ObjectId(req.params.id)).exec(function(err, articles){
	        if (!articles || articles.length === 0){
	            User.findOne(ObjectId(req.params.id)).exec(function(err, user) {
	                if(!user || user.length === 0){
	                    res.status(401).send("The Id does not exit in db")
	                } else {
	                    Article.find({author: user.username}).exec(function(err, articles){
	                        res.status(200)
	                        .send({
	                        	articles: articles
	                        })
	                        return
	                    })
	                }
	            })
	        } else {
		        const articlesObj = articles[0]
		        res.status(200).send({articles: [articlesObj]})
		    }
	    })
	}else {
		// Profile.findOne({username: req.username},function(err,user){
		// 	if(err){
		// 		console.log(err);
		// 		return;
		// 	}else if(!user){
		// 		res.status(400)
		// 		.send("You need to log in")
		// 	}else {
		// 		let userArray = [req.username,...user.following];
		// 		Article.find({author: {$in:userArray}}).limit(10).sort('-date').exec(function(err,articles){
		// 			if(err){
		// 				console.log(err);
		// 				return;
		// 			}else{
		// 				res.status(400)
		// 				.send({
		// 					articles:articles
		// 				})
		// 			}
		// 		})
		// 	}
		// })
		Article.find({}).exec(function(err, articles){
	        res.status(200).send({articles: articles})
	    })
	}
}

const putArticle = (req,res) => {

	const commentId = req.body.commentId
	if(!req.params.id){
		res.status(401)
		.send("The Id does not exit in db")
	}else {
		Article.findById(req.params.id,function(err,article){
			if(!article){
				res.status(400)
				.send("The Id does not exit in db")
			}else if(commentId){
				if(commentId === '-1'){
					//This means that we need to add comment
					const random = md5(req.username + new Date().getTime());
					const commentObj = new Comment({
						commentId: random, 
						author: req.username, 
						date: new Date(),
						text: req.body.text
					})
					commentObj.save(function(err,comments){
						if(err){
							console.log(err)
						}
					})
					Article.findByIdAndUpdate(req.params.id,{$addToSet: {comments: commentObj}},{upsert: true, new: true},function(err,article){
						if(err){
							console.log(err);
							return;
						}else{
							res.status(200)
							.send({
								articles: [article]
							})
						}
					})
				}else{
					//This means we need to update the comment
					Comment.findOne({commentId: commentId},function(err,comment){
						if(err){
							console.log(err);
							return;
						}else if(!comment){
							res.status(401)
							.send("The comment Id is not in database")
						}else if(comment.author !== req.username){
							res.status(401)
							.send("You are not the author of the comment")
						}else{
							Comment.update({commentId: commentId},{$set: { text: req.body.text }},{ new: true }, function(err, comments){})
							Article.findOneAndUpdate({_id: req.params.id, 'comments.commentId': commentId},
							 { $set: { 'comments.$.text': req.body.text }}, { new: true }, function(err, article){
							 	if(err){
							 		console.log(err)
							 	}else {
							 		res.status(200)
							 		.send({articles: [article]});
							 	}
							 })
						}
					})
				}
			}else {
				if(article.author === req.username){
					Article.findByIdAndUpdate(req.params.id,{ $set: { text: req.body.text }}, { new: true }, function(err, article){
						if(err){
							console.log(err);
							return;
						}else{
							res.status(200)
							.send({
								articles: [article]
							})
						}
					})
				}else{
					res.status(401)
					.send("You are not the author of the article")
				}
			}
		})
	}
	
}

const postArticle = (req, res) => {
	const newArticle = req.body.text;
	const username = req.username;
	const image = null;

	if(!newArticle){
		res.status(400)
		.send("You need to input an article")
	}else{
		Article.create({
			author: username,
			text: newArticle,
			date: new Date(),
			img: req.body.img
		},function(err,article){
			if(err){
				console.log(err);
				return;
			}else {
				res.status(200)
				.send({
					articles:[article]
				})
			}
		})
	}
}


module.exports = (app) =>{
	app.get("/articles/:id*?", getArticles)
	app.put("/articles/:id",putArticle)
	app.post("/article",postArticle)
}