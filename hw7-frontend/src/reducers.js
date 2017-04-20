import { combineReducers } from 'redux';
import Action from './actions';

export function showComponent(state= {headlineEditShow: false,showFollowerInput: false,uploaded_image:''},action){
  switch(action.type){
    case Action.HEADLINE_EDIT: 
      return {...state, headlineEditShow: !state.headlineEditShow}
    case Action.INPUT_FOLLOWER_SHOW:
      return {...state, showFollowerInput: !state.showFollowerInput}
    case Action.UPLOAD_SUCCESS:
      return {...state, uploaded_image: action.image}
    default:
      return state;
  }
}
export function activeArticle(state ={id: '',showCom: false,showEdit: false },action){
    switch(action.type){
      case Action.FORCE_ACTIVE:
        return {...state,id: action.id,showCom: action.show,showEdit: action.edit};
      default:
        return state;
    }
}
export function profile(state={username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''}, action){
	switch (action.type){
		case Action.UPDATE_HEADLINE:
    case Action.LOGIN_LOCAL:
          return { ...state, username: action.username, headline: action.headline }

    case Action.UPDATE_PROFILE:
        if (action.headline) return { ...state, headline: action.headline }
        if (action.avatar) return { ...state, avatar: action.avatar }
        if (action.zipcode) return { ...state, zipcode: parseInt(action.zipcode) }
        if (action.email) return { ...state, email: action.email }
        if (action.dob) return { ...state, dob: action.dob }
		default: 
			return state;
	}
}

export function pageState(state={page: ''}, action){

	switch(action.type){
		case Action.NAV_MAIN:
			return{...state, page: 'main'}
    case Action.NAV_PROFILE:
      return{...state, page: 'profile'}
    case Action.NAV_OUT:
      return{...state, page:''}
		default:
		    return state;
		}
}

export function followers(state = { followers: {} }, action) {
    switch(action.type) {
        case Action.UPDATE_FOLLOWER:
            return { ...state, followers: action.followers }

        default:
            return state
    }
}

export function errors(state = {addFollowerError : '',updateFileError: '',updateFileSuccess:''}, action){
	switch(action.type) {
		case Action.ADD_FOLLOWER_ERROR: 
			return {...state, addFollowerError: action.payload }
    case Action.UPDATE_PROFILE_ERROR:
      return {...state, updateFileError:action.payload }
    case Action.UPDATE_PROFILE_SUCCESS:
      return {...state, updateFileSuccess:action.payload }
    default:
      return state
  }
}

export function articles(state = {articles: {}, searchKeyword: '', avatars: {} }, action){
	switch(action.type){
		case Action.SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword}
        case Action.UPDATE_ARTICLES:
        	return {...state, articles: action.newArticles}
        case Action.UPDATE_AVATARS:
          console.log(action.curAvatars)
        	return {...state, avatars: action.curAvatars}
        case Action.ADD_ARTICLE:
        	const articles = { ...state.articles }
          articles[action.article._id] = action.article
          return { ...state, articles}
        case Action.EDIT_ARTICLE:
          const oldArticles = {...state.articles}
          if (action.article !== undefined) {
            oldArticles[action.article._id] = action.article
          }
          return {...state, articles: oldArticles}
        default:
        	return state;
	}
}
const Reducer = combineReducers({
	pageState,profile,followers,errors,articles,showComponent,activeArticle
})

export default Reducer;
