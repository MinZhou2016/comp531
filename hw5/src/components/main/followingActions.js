import Promise from 'bluebird';
import Action, { resource, addFollowerError } from '../../actions';

export function showInputBar(){
      return {
            type: Action.INPUT_FOLLOWER_SHOW
      }
}
export function delFollower(name) { 
	return fetchFollowers('DELETE', name);
}
export function addFollower(name) { 
	return fetchFollowers('PUT', name);
}


export function fetchFollowers(method,name){
	return (dispatch, getState) => {
		if(method === 'PUT' && getState().followers.followers[name]){
			return dispatch(addFollowerError(`Already add Follower ${name}`));
		}
		resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
		.then(r => {
			
			if (method == 'PUT' && r.following.indexOf(name) < 0) {
                return dispatch(addFollowerError(`${name} is not a valid user`))
            }
            //transfer array to string 
            const followerList = r.following.join(',');
            // transfer array to object
            const followers = r.following.reduce((acc, cur) => {
            	acc[cur] = {name: cur};
            	return acc;
            }, {});
            // put headline to the object

            const headline = resource('GET', `headlines/${followerList}`)
            				.then(r => {
            					r.headlines.forEach(e => {
            						const userObject = followers[e.username];
            						if(userObject){
            							userObject.headline = e.headline;
            						}
            					})
            				})

            //put avatar to the object
            const avatar = resource('GET', `avatars/${followerList}`)
            				.then(r => {
            					r.avatars.forEach(e => {
            						const userObject = followers[e.username];
            						if(userObject){
            							userObject.avatar = e.avatar;
            						}
            					})
            				})

            Promise.all([headline, avatar]).then(() => {
            	dispatch({type: Action.UPDATE_FOLLOWER, followers});
            })

		})
		.catch((err) => {
			dispatch(addFollowerError(`Cannot get your followers ${err}`));
		})
	}
}