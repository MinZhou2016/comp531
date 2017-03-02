
import Action from '../../actions'

export function delFollower(name) { 
    
    return {
    	type: Action.FOLLOWER_UPDATE,
    	name: name
    }
}