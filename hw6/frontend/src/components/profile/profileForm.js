import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './profileActions'

const ProfileForm = ({updateProfile,olddob,oldEmail,oldZipcode}) => {
    let email,zipcode,password,pwconf;
    
    const onFormSubmit = (event) => {
         event.preventDefault();
            const payload = {
                email:email.value == oldEmail ? '' : email.value,
                dob: '',
                zipcode:zipcode.value == oldZipcode ? '' : zipcode.value,
                password:password.value,
                pwconf:pwconf.value
            }
        updateProfile(payload);
    }

    return (
        <form onSubmit={onFormSubmit}>
            
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="dob">Birth (No Changed)</label>
                <div className="col-sm-6">
                    <input className="form-control" id="dob" type="text" placeholder={olddob}
                        disabled/>
                </div>
            </div>            
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="email">email</label>
                <div className="col-sm-6">
                    <input className="form-control" id="email" type="text" placeholder={oldEmail}
                        ref={(node) => email = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="zipcode">zipcode</label>
                <div className="col-sm-6">
                    <input className="form-control" id="zipcode" type="text" placeholder={oldZipcode}
                        ref={(node) => zipcode = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="password">password</label>
                <div className="col-sm-6">
                    <input className="form-control" id="password" type="password" placeholder="password"
                        ref={(node) => password = node }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" htmlFor="pwconf">password confirmation</label>
                <div className="col-sm-6">
                    <input className="form-control" id="pwconf" type="password" placeholder="password"
                        ref={(node) => pwconf = node }/>
                </div>
            </div>

            <div className="form-group row">
                <button className="btn btn-primary profile-btn" type="submit" id="update">Update</button>
            </div>
        </form>
    )
}

ProfileForm.propTypes = {
    oldZipcode: PropTypes.number.isRequired,
    olddob: PropTypes.string.isRequired,
    oldEmail: PropTypes.string.isRequired,
    updateProfile: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
            olddob: state.profile.dob
        }
    },
    (dispatch) => {
        return {
            updateProfile: (payload) => dispatch(updateProfile(payload))
        }
    }
)(ProfileForm)