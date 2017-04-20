import Action, { resource, updateError, updateSuccess, navToMain, navToOut} from '../../actions'

import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile, validateProfile } from '../profile/profileActions'


export function localLogin(username,password) {
    return (dispatch) => {
        resource('POST', 'login', { username,password})
        .then((response) => {
            dispatch({
                type: Action.LOGIN_LOCAL, 
                username: response.username
            })
            dispatch(initialVisit())
        }).catch((err) => {
            dispatch(updateError(`There was an error logging in as ${username}`))
        })
    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
        .then(dispatch({type:'NAV_OUT'}))
        .catch((err) => {
            dispatch({type: Action.LOGIN_LOCAL, username: undefined})
            dispatch(navToOut())
        })
    }
}
export function initialVisit() {

    return (dispatch) => {
        resource('GET', 'headlines').then((response) => {
            dispatch(navToMain())
            dispatch({
                type: Action.UPDATE_HEADLINE,
                username: response.headlines[0].username,
                headline: response.headlines[0].headline
            })
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        }).catch((err) => {
        })
    }
}

export function register({username, email, birth, zipcode, password, pwconf}) {
    return (dispatch) => {
        if (!username || !email || !birth || !zipcode || !password || !pwconf) {
            return dispatch(updateError('All fields must be supplied'))
        }

        const err = validateProfile({username, email, birth, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }
        const dob = birth;
        resource('POST', 'register', {username, email, dob, zipcode, password})
        .then((response) => {
            return dispatch(updateSuccess(`Success!  You create a user named "${response.username}".You can login rightnow`))
        }).catch((err) => {
            return dispatch(updateError("There was an error registering, perhaps your username is already taken?"))
        })
    }
}