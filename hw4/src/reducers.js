import { combineReducers } from 'redux'
import Action from './actions'

const followerJson = require('./data/followers.json')
export function followers(state = { followers: followerJson.followers }, action) {
    switch(action.type) {
        case Action.FOLLOWER_UPDATE:
            return { ...state, followers: [] }

        default:
            return state
    }
}

const articleJson = require('./data/articles.json')
export function articles(state = { articles: articleJson.articles, searchKeyword: '', avatars: {} }, action) {
    switch(action.type) {
        case Action.EDIT_ARTICLE:
        case Action.ADD_ARTICLE:
            const articles = { ...state.articles }
            articles[action.article.id] = action.article
            return { ...state, articles }

        case Action.UPDATE_ARTICLES:
            return { ...state, articles: action.articles }

        case Action.SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword}

        case Action.UPDATE_AVATARS:
            return { ...state, avatars: action.avatars }

        default:
            return state
    }
}
const profileJson = require('./data/profile.json')
export function profile(state = profileJson.profile, action) {
    switch (action.type) {

        case Action.UPDATE_HEADLINE:
        case Action.LOGIN_LOCAL:
            return { ...state, username: action.username, headline: action.headline }

        case Action.UPDATE_PROFILE:
            if (action.headline) return { ...state, headline: action.headline }
            if (action.avatar) return { ...state, avatar: action.avatar }
            if (action.zipcode) return { ...state, zipcode: parseInt(action.zipcode) }
            if (action.email) return { ...state, email: action.email }
            if (action.gender) return { ...state, gender: action.gender }
        default:
            return state
    }
}


export function common(state = { error:'', success:'', location:'' }, action) {
    const clean = { error: '', success: '' }
    switch (action.type) {
        case Action.SUCCESS:
            return { ...state, ...clean, success: action.success }
        case Action.ERROR:
            return { ...state, ...clean, error: action.error }

        case Action.NAV_PROFILE:
            return { ...state, ...clean, location: 'profile'}
        case Action.NAV_MAIN:
            console.log("yes");
            return { ...state, ...clean, location: 'main' }
        case Action.NAV_OUT:
            return { ...state, ...clean, location: '' }

        default:
            return { ...state, ...clean }
    }
}

const Reducer = combineReducers({
     followers, common, profile,articles
})

export default Reducer
