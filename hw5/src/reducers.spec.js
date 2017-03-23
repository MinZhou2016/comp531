import {expect} from 'chai'

import Action from './actions'
import Reducer, {errors, articles} from './reducers'
import {filterFunction} from './components/article/articlesView'


describe('Validate reducer (no fetch requests here)', ()=> {
	it('should initialize state', ()=>{
		expect(Reducer(undefined,{})).to.eql({
			pageState: {page: ''},
		    errors: {addFollowerError : '',updateFileError: '',updateFileSuccess:''},
		    showComponent: {headlineEditShow: false,showFollowerInput: false},
		    activeArticle: {id: '',showCom: false,showEdit: false },
		    articles:{articles:{},searchKeyword:'', avatars: {} },
		    profile: {username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''},
		    followers:{ followers: {}}
		})
	})

	it('should state success (for displaying success message to user)',()=> {
		expect(errors(undefined,{type:Action.UPDATE_PROFILE_SUCCESS, payload:'success message'}))
		.to.eql({addFollowerError : '',updateFileError: '',updateFileSuccess:'success message'})
	})

	it('should state error (for displaying error message to user)',()=> {
		expect(errors(undefined,{type:Action.UPDATE_PROFILE_ERROR, payload:'error message'}))
		.to.eql({addFollowerError :'',updateFileError: 'error message',updateFileSuccess:''})
	})

	it('should set the articles',()=> {
		expect(articles(undefined,{type:Action.UPDATE_ARTICLES, newArticles:{
			1:{_id:1, text:'Becoming a web developer', author:'mz22',date:'03/22/2017'}
		}}))
		.to.eql({searchKeyword:'', articles:{1:{_id:1, text:'Becoming a web developer', author:'mz22',date:'03/22/2017'}}, avatars: {}})
	})

	it('should set the search keyword',()=> {
		expect(articles(undefined,{type:Action.SEARCH_KEYWORD, keyword:'search keyword'}))
		.to.eql({articles:{}, searchKeyword:'search keyword', avatars: {}})
	})

	it('should filter displayed articles by the search keyword',()=> {
		const articles = {1:{_id:1, text:'hello world!', author:'mz22', date:'03/22/2016'},
						  2:{_id:2, text:'hello javascript', author:'mz22', date:'03/22/2016'}}
		const keyword = 'world'
		expect(filterFunction(articles,keyword)).to.eql([{_id:1, text:'hello world!', author:'mz22', date:'03/22/2016'}]);
	})
})