import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';

const Action = {
	NAV_MAIN: 'NAV_MAIN',
	UPDATE_FOLLOWER: 'UPDATE_FOLLOWER',
	ADD_FOLLOWER_ERROR: 'ADD_FOLLOWER_ERROR',
    SEARCH_KEYWORD:'SEARCH_KEYWORD',
    UPDATE_ARTICLES: 'UPDATE_ARTICLES',
    ADD_ARTICLE:'ADD_ARTICLE',
    EDIT_ARTICLE:'EDIT_ARTICLE',
    UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',
    UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
    UPDATE_HEADLINE:'UPDATE_HEADLINE',
    LOGIN_LOCAL:'LOGIN_LOCAL',
    UPDATE_PROFILE:'UPDATE_PROFILE',
    UPDATE_AVATARS: 'UPDATE_AVATARS',
    HEADLINE_EDIT: 'HEADLINE_EDIT',
    INPUT_FOLLOWER_SHOW: 'INPUT_FOLLOWER_SHOW',
    NAV_OUT:'NAV_OUT',
    NAV_PROFILE:'NAV_PROFILE',
    FORCE_ACTIVE: 'FORCE_ACTIVE'


}

export function navToMain(){
	return {
		type: Action.NAV_MAIN
	}
}

export function addFollowerError(error){
	return {
		type: Action.ADD_FOLLOWER_ERROR,
		payload: error
	}
}

export function updateError(error) { 
    return { 
        type: Action.UPDATE_PROFILE_ERROR,
        payload: error 
    }
}
export function updateSuccess(success) { 
    return { 
        type: Action.UPDATE_PROFILE_SUCCESS, 
        payload: success 
    }
}
export function navToProfile() { 
    return { 
        type: Action.NAV_PROFILE 
    }
}
export function navToOut() { 
    return { 
        type: Action.NAV_OUT 
    }
}
export function headlineEdit() { 
    return { 
        type: Action.HEADLINE_EDIT
    }
}




export const url = 'https://webdev-dummy.herokuapp.com';

export function resource(method, endpoint, payload, submitJson = true) {
    const options = {credentials: 'include', method}
    if (submitJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload
    }
    return fetch(`${url}/${endpoint}`, options)
    .then((response) => {
        if (response.status == 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`
            throw new Error(message)
        } else {
            return response.json()
        }
    })
}

export default Action;