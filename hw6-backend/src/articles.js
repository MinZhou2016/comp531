'use strict';
//this is the stub for article

let articles = [
        {id : 1, author: 'Scott',text: "This is my first article", date:new Date(), comment:[]},
        {id : 2, author: 'Vivid', text: "This is Vivid's article", date:new Date(), comment:[]},
        {id : 3, author: 'Max', text: "This is Max,s article", date:new Date(), comment:[]}
]
let curId = 4;

const getArticle = (req,res) =>{
	if(req.params.id) {
		const article = articles.filter(article => {return article.id == req.params.id || article.author == req.params.id});
		if(article.length !== 0){
			res.status(200).send({articles: article});
		}else {
			res.send([]);
		}
	}else {
		res.status(200).send({articles:articles});
	}
}

const postArticle = (req,res) => {
	if(req.body.text){
		const newAddArticle = {id: curId, author:"mz22test", text: req.body.text, date: new Date(),comment:[]};
		curId++;
		articles.push(newAddArticle);
		res.status(200).send({articles: [newAddArticle]});
	}else {
		res.status(400).send("You Post Nothing!!");
	}
}

const putArticle = (req,res) => {

	if (!req.params.id || req.params.id > nextID) {
    	res.sendStatus(400).send('Can not update article that not exist');
    } else {
    	const article = articles.filter(article =>{
            if(article.id == req.params.id) {
                article.text = req.body.text
                return true;
            }
        })
        res.status(200).send({articles: article});
    }
}

module.exports = (app) =>{
	app.get('/articles/:id*?', getArticle)
    app.put('/articles/:id', putArticle)
    app.post('/article', postArticle)
}