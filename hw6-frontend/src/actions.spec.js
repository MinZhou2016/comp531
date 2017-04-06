import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action, {url, updateError, updateSuccess, navToProfile, navToMain, navToOut, resource} from './actions'

describe('Validate actions (these are functions that dispatch actions)', () => {

	let Action, actions
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		Action = require('./actions').default
  		actions = require('./actions') 
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${url}/login`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})

		resource('GET', 'sample').then((response) => {
			expect(response.articles).to.exist;
		})
		.then(done)
		.catch(done)
	})


	it('resource should give me the http error', (done)=> {
		const username = 'mz22';
		const password = 'wrong password';
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).catch((err) => {
			expect(err.toString()).to.eql('Error: Error in POST login {}')
		})
		.then(done)
		.catch(done)
	})


	it('resource should be POSTable', (done)=> {
		const username = 'mz22'
		const password = 'thrown-gather-power'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).then((response) => {
			expect(response).to.eql({username: "mz22", result: "success"})
		})
		.then(done)
		.catch(done)
	})


	it('should update error message that displaying error mesage to user', ()=>{
		const errorMessage = 'This is an error message';
		const expectAction = {
			type: Action.UPDATE_PROFILE_ERROR,
			payload: errorMessage
		}
		expect(updateError(errorMessage)).to.eql(expectAction);
	})


	it('should update success message that displaying success message to user', ()=>{
		const successMsg = 'This is a success message';
		const expectAction = {
			type: Action.UPDATE_PROFILE_SUCCESS,
			payload: successMsg
		}
		expect(updateSuccess(successMsg)).to.eql(expectAction);
	})


	it('should navigate (to profile, main, or landing)', ()=>{
		expect(navToProfile()).to.eql({type: Action.NAV_PROFILE});
		expect(navToMain()).to.eql({type: Action.NAV_MAIN});
		expect(navToOut()).to.eql({type: Action.NAV_OUT});
	})
})