import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import Action, { url } from '../../actions'
import { localLogin, logout } from './authActions'

describe('Validate Authentication (involves mocked requests)', () => {

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	
	it('should login with the given netid and password successfully', (done)=>{

        const username = 'mz22'
        const password = 'thrown-gather-power'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

     
        localLogin(username, password)(
            (action)=>{
                                   
                    expect(action).to.eql({
                        type:'LOGIN_LOCAL',
                        username
                   })
         
                    done()
            }
        )
    })


     it('should show error when the user and password is not right', (done)=>{

        const username = 'wrongusername'
        const password = 'wrongpassword'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

     

        localLogin(username, password)(
            (action)=>{
                    expect(action).to.eql({
                        type:'UPDATE_PROFILE_ERROR',
                        payload : `There was an error logging in as ${username}`
                   })
       
                    done()
            }
        )
    })


    it('should log out successfully', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })


        logout()(
            (action)=>{
                expect(action).to.eql({
                    type:'NAV_OUT'
                })
                done()
            }
        )
        
    })


})