import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.newUserInfo = {
    username: 'MinZhou',
    email: 'a@b.edu',
    zipcode: '11111',
    birth: '11-11-1900',
    password: '12',
    pwconf: '12'
}
exports.register = () => 
    sleep(500)
    .then(findId('username').clear())
    .then(findId('email').clear())
    .then(findId('zipcode').clear())
    .then(findId('birth').clear())
    .then(findId('password').clear())
    .then(findId('pwconf').clear())
    .then(findId('username').sendKeys(exports.newUserInfo.username))
    .then(findId('email').sendKeys(exports.newUserInfo.email))
    .then(findId('zipcode').sendKeys(exports.newUserInfo.zipcode))
    .then(findId('birth').sendKeys(exports.newUserInfo.birth))
    .then(findId('password').sendKeys(exports.newUserInfo.password))
    .then(findId('pwconf').sendKeys(exports.newUserInfo.pwconf))
    .then(findId('reg_frm_btn').click())
    .then(sleep(2000))
