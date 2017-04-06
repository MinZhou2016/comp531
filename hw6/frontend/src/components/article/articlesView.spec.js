import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ArticlesView} from './articlesView'
import {NewArticle} from './newArticle'
import Reducer from '../../reducers'
import { searchKeyword } from './articleActions';

const state = {
    pageState: {page: ''},
    errors: {addFollowerError : '',updateFileError: '',updateFileSuccess:''},
    showComponent: {headlineEditShow: false,showFollowerInput: false},
    activeArticle: {id: '',showCom: false,showEdit: false },
    articles:{articles:{},searchKeyword:'', avatars: {} },
    profile: {username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''},
    followers:{ followers: {}}
}

describe('ArticlesView (component tests)', ()=>{

    it('should render articles', ()=>{

        const articles = [{_id: 1, author: 'mz22', date: '03/22/2017', comments: [], avatar:[], text:[], img:[]}]
        const searchKeyword = (word) => dispatch(searchKeyword(word))

        const node = shallow(
            <div>
                <ArticlesView username='mz22' articles={articles} searchKeyword/>
            </div>
        )
        expect(node.children().length).to.equal(1)

    })

    let articles = {1:{_id:1,author:'mz22', text:'text1'}}  
    let addAricle = {_id:2,author:'mz22', text:'text2'}
    let newArticles = {...articles,2: addAricle}

    it('should dispatch actions to create a new article',()=> {
        expect(Reducer(Reducer(undefined, {type:'UPDATE_ARTICLES', newArticles: articles}), {type:'ADD_ARTICLE', article: addAricle }))
       .to.eql({...state, articles: {...state.articles, articles:newArticles }})
    })

})