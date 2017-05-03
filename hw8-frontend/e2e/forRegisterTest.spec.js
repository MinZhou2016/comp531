import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import registerInfo from './forRegisterTest'

describe('End-to-End Test: Register new user', () => {
	
	before('should register', (done) => {
	        go().then(registerInfo.register).then(done)
	})

	it('-should return success of the register process', (done) => {
		var username = registerInfo.newUserInfo.username;
		sleep(300)
        .then(findId('successMessage').getText()
        	.then(text => {
                expect(text).to.equal(`Success! You create a user named "${username}". But you cannot login with it now. Login with username: 'mz22', password : 'thrown-gather-power'`)
            })
            .then(done))
    })
})