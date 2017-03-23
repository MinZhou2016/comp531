import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import ProfileForm from './profileForm';
import Avatar from './avatar';

const Profile = ({err, suc}) => {
    return (
        <div>
            <div className="jumbotron">
            	<Avatar/>
            </div>
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
            <div className="container">
                <ProfileForm/>
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