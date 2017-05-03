import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import Action, { url } from '../../actions'

let profileActions

describe('Validate Profile actions (mocked requests)', () => {


  beforeEach(() => {
      if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
      }
      profileActions = require('./profileActions')
  })

  afterEach(() => {
      if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
      }
  })

  it('should update headline', (done) => {

      const username = 'mz22'
      const headline = 'new headline'

      mock(`${url}/headline`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { username, headline }
      })

      profileActions.updateHeadline(headline)(
        fn => fn(action => {
        expect(action).to.eql({ 
          headline, type:'UPDATE_PROFILE'
        })
        done()
      }))

  })

  it('should fetch the user proile information', (done) => {
  
      const avatar = 'avatar'
      const zipcode = '77005'
      const email = 'mz22@rice.edu'


      mock(`${url}/avatars`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { avatars : [{avatar}] }
      })

      mock(`${url}/zipcode`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { zipcode }
      })  
      
      mock(`${url}/email`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { email }
      })

      
      var tmp = 0;
      profileActions.fetchProfile()(
        fn => fn(action => {
         

                if (tmp == 0){
                    expect(action).to.eql({
                        avatar:avatar, type:'UPDATE_PROFILE'
                    })
                    tmp++                 
                }
                else if (tmp == 1){

                    expect(action).to.eql({
                        zipcode, type:'UPDATE_PROFILE'
                    })
                    tmp++
                }
                else if (tmp == 2){

                    expect(action).to.eql({
                        email, type:'UPDATE_PROFILE'
                    })
                    tmp++
                    done()
                }
                
      }))

  })

})