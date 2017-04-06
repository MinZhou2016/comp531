import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.credentials = {
    username: 'mz22test',
    password: 'quick-phrase-fifth'
}

exports.login = () => 
    sleep(500)
    .then(findId('exampleInputName3').clear())
    .then(findId('exampleInputPassword1').clear())
    .then(findId('exampleInputName3').sendKeys(exports.credentials.username))
    .then(findId('exampleInputPassword1').sendKeys(exports.credentials.password))
    .then(findId('btn1').click())
    .then(sleep(2000))
exports.navToProfile = () =>
    sleep(500)
    .then(findId('navProfile').click())



