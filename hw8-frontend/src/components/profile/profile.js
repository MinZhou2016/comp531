import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import ProfileForm from './profileForm';
import LinkForm from './linkForm';
import Avatar from './avatar';

const Profile = ({err, suc}) => {
    return (
        <div className="profile">
            <Avatar/>
            <div className="container">
                { err.length == 0 ? '' :
                    <div className="alert alert-danger">
                        <div id="errorMessage">{err}</div>
                    </div>
                }
                { suc.length == 0 ? '' :
                    <div className="alert alert-success">
                        <div id="successMessage">{suc}</div>
                    </div>
                }
            </div>
            <div className="profile-form container">
                <ProfileForm/>
                <LinkForm />
            </div>
        </div>
    )
}
Profile.propTypes = {
    err: PropTypes.string.isRequired,
    suc: PropTypes.string.isRequired
}
export default connect(
    (state) => {
            return { 
                err: state.errors.updateFileError, 
                suc: state.errors.updateFileSuccess 
            }
})(Profile)