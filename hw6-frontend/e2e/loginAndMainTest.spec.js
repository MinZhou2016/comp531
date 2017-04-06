'use strict';
import { expect } from 'chai'
import { go, sleep, findId, By, findClassName, findElements, driver} from './selenium'
import MainPage from './loginAndMainTest'

describe(' End-to-End Test: MainPage', () => {

    before('should log in', (done) => {
        go().then(MainPage.login).then(done)
    })

    it('-should log in as the test user', (done) => {
        sleep(500)
        .then(findClassName('username').getText()
        	.then(text => {
                expect(text).to.equal(`${MainPage.credentials.username}`)
            }))
        .then(done)
    })
    it("-should create new article and validate article appears in feed", (done) => {
        sleep(500)
        .then(findId("newarticle").clear()) 
        .then(findId("newarticle").sendKeys('This is a new end to end test article.'))
        .then(findClassName('post-btn').click())
        .then(sleep(500))
        .then(findClassName('article-content').getText()   
            .then(text => {
                expect(text).to.equal('This is a new end to end test article.')
            }))
        .then(done)
    })

    it('-should edit an article and validate the article text has updated', (done) => {
        sleep(500)
        .then(findClassName('article-content').clear())
        .then(findClassName('article-content').sendKeys('This is a new edited article'))
        .then(findClassName('editArticle-btn').click())
        .then(sleep(500))
        .then(findClassName('article-content').getText()    
            .then(text => {
                expect(text).to.equal('This is a new edited article')
            }))
        .then(done)
    })

    it('-should update the status headline and verify the change', (done) => {
        sleep(500)
        .then(findClassName('headline').click())
        .then(findClassName('headline-input').sendKeys('This is a test headline'))
        .then(findClassName('headline-submit').click())
        .then(sleep(500))
        .then(findClassName('headline').getText()
            .then(text => {
                expect(text).to.equal('This is a test headline')
            }))
        .then(done)
    })

    it('-should count the number of followed users', (done) => {
        sleep(500)
        .then(findElements('[name="individual-follower"]')
            .then(followers => {
                console.log(followers)
                expect(followers.length).to.be.at.least(2)
            }))
        .then(done)
    })

    it('-should add the user "Follower" to the list of followed user and verify the count increases by one', (done) => {
        sleep(500)
        .then(findElements('[name="individual-follower"]')
        .then(followers => {
            let folNumber = followers.length
            findClassName('show-input').click()
            .then(findClassName('fol-input').sendKeys("Follower"))
            .then(findClassName('fol-btn').click())
            .then(sleep(500))
            .then(findElements('[name="individual-follower"]')
                .then(followers => {
                expect(followers.length).to.equal(folNumber + 1)
            }))
        }))
        .then(done)
    })

    it('-should remove the user "Follower" from the list of followed user and verify the count decreases by one', (done) => {
        sleep(500)
        .then(findElements('[name="individual-follower"]')
                .then(followers => {
                    let folNUmber = followers.length
                    driver.executeScript("arguments[0].click();", findClassName('del-btn')) 
                    .then(sleep(500))
                    .then(findElements('[name="individual-follower"]')
                    .then(followers => {
                        expect(followers.length).to.equal(folNUmber - 1)
                    }))
        }))
        .then(done)
    })

    it('-should search for "Only One Article Like This" and verify only one article show, and verify the author', (done) => {
        sleep(500)
        .then(findClassName('search-bar').clear())
        .then(findClassName('search-bar').sendKeys('Only One Article Like This'))
        .then(sleep(500))
        .then(findClassName('author').getText()
                .then(author => {
                    expect(author).eql('mz22test')
                }))
        .then(findClassName('search-bar').clear())
        .then(done)
    })

    after('Navigate to Profile Page', (done) => {
        MainPage.navToProfile().then(done)
    })
})