
const express = require('express')
const bodyParser = require('body-parser')

let articles = [
				{id : 1, author: 'Scott', text: "This is my first article"},
				{id : 2, author: 'Vivid', text: "This is Vivid's article"},
                {id : 3, author: 'Max', text: "This is Max,s article"}
                ]
let id = 4;

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     var new_article = {'articles': [{id: id, author: 'Test', text: req.body.body}]}    
     res.send(new_article)
     articles= [...articles,{id: id, author: 'Test', text: req.body.body}]
     id++;
}

const getArticle = (req, res) => {
	
    var response = { 'articles': articles}
    res.send(response)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})