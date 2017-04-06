/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
        .then(res=>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body=>{
            expect(body.articles.length).to.be.at.least(3)
            len = body.articles.length
        })
        .then(done)
        .catch(err=>{
            throw new Error(err)
        })
 	}, 200)

    it('should return an article with a specified id', (done) => {
        fetch(url("/articles/1"))
        .then(res =>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body=>{
            expect(body.articles.length).to.eql(1)
        })
        .then(done)
        .catch(err=>{
           throw new Error(err)
        })
    }, 200)

    it('should return nothing for an invalid id', (done) => {
        // call GET /articles/id where id is not a valid article id, perhaps 0
        fetch(url("/articles/-1"))
            .then(res => {
                expect(res.status).to.eql(200)  
                return res.text()
            })
            .then(body => {
                expect(JSON.parse(body)).to.eql([])
            })
            .then(done)
            .catch(done)

    }, 200)

	it('should add an article and test the new id and text', (done) => {

		const postArticle = {text: 'new posted article'}

        fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(postArticle)
        })
        .then((res)=>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then((body)=>{
            expect(body.articles[0].text).to.eql(postArticle.text)
        })
        fetch(url("/articles"))
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            expect(body.articles.length).to.eql(len + 1)
        })
        .then(done)
        .catch(done)
 	}, 200)

});