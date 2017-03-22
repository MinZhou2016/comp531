/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(r => {
			expect(r.status).to.eql(200)
            return r.json()
		})
		.then(body => {
			expect(Object.keys(body).length).to.be.above(2)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		const test1 = {author:'t1',text: 'Article of t1'}
        const test2 = {author:'t2',text: 'Article of t2'}

        fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(test1)
        })
        .then(r =>{
            expect(r.status).to.eql(200)
            return r.json()
        })
        .then((article) => {
            expect(article).to.have.ownProperty('id')
            expect(article.text).to.eql(test1.text)
            expect(article.author).to.eql(test1.author)
            
            return article.id
        })
        .then(id => {
                fetch(url('/article'),{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(test2)
                })
                .then(res => {
                    expect(res.status).to.eql(200)
                    return res.json()
                })
                .then(body => {
                    expect(body).to.have.ownProperty('id')
                    expect(body.text).to.eql(test2.text)
                    expect(body.author).to.eql(test2.author)
                    expect(body.id).to.eql(id+1)
                })
            }
        )
        .then(done)
        .catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		fetch(url('/articles'))
        .then(res=>{
            return Object.keys(res.json())[0]
        })
        .then((key)=>{
            fetch(url(`/articles/${key}`))
            .then(res=>{
                expect(Object.keys(res)).to.have.length(1)
            })
        })
        .then(done)
        .catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/-1"))
		.then(res => {
            expect(Object.keys(res.json)).to.have.length(0)
        })
		.then(done)
		.catch(done)
	}, 200)

});