import Action, { updateError, resource } from '../../actions'

export function validateProfile({username, email,zipcode, password, pwconf}) {
    if (username) {
        if (!username.match('^[a-zA-Z][a-zA-Z0-9]+')) {
            return 'Invalid username.  Must start with a letter and can only contains letters and numbers.'
        }
    }

    if (email) {
        if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
            return 'Invalid email.  Must be like a@b.co'
        }
    }

    if (zipcode) {
        if (!zipcode.match('^[0-9]{5}$')) {
            return 'Invalid zipcode.  Must be 5 digits in length, e.g., 77005'
        }
    }

    if (password || pwconf) {
        if (password !== pwconf) {
            return 'Password do not match'
        }
        // enforce strong passwords!
    }

    return ''
}

export function updateHeadline(headline) {
    return updateField('headline', headline)
}

export function updateProfile({email, dob, zipcode, password, pwconf}) {
    return (dispatch) => {
        const err = validateProfile({email, dob, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }
        dispatch(updateField('email', email))
        dispatch(updateField('zipcode', zipcode))
        dispatch(updateField('password', password))
    }
}


function updateField(field, value) {
        if (value) {
            const action = { type: Action.UPDATE_PROFILE }  
            switch(field) {
                case 'avatars':
                    action.avatar = value; break;
                case 'email':
                    action.email = value; break;
                case 'zipcode':
                    action.zipcode = value; break;
                case 'headline':
                    action.headline = value; break;
            }
            if (field == 'password')
                    return updateError('will not change password')
                else
                    return action
    }
}

