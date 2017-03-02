import Action, { updateError, updateSuccess, navToMain, navToOut, } from '../../actions'
import { validateProfile } from '../profile/profileActions'



export function localLogin(username, password) {
    return navToMain();
}

export function logout() {
    return navToOut();
}

export function register({username, email,zipcode, password, pwconf}) {
        if (!username || !email|| !zipcode || !password || !pwconf) {
            return updateError('All fields must be supplied')
        }

        const err = validateProfile({username, email,zipcode, password, pwconf})
        if (err.length > 0) {
            return updateError(err)
        }
        return updateSuccess(`Success!  You can now log in as "${username}".`)
        
}
