import React, {PropTypes } from 'react'
import { connect } from 'react-redux'

import { register,fbLogin } from './authActions'

const Register = ({register,fbLogin}) => {
    
    let username,email,birth,zipcode,password,pwconf;
    const onFormSubmit = (event) => {
        event.preventDefault();
        const payload = {
            username:username.value,
            email:email.value,
            birth:birth.value,
            zipcode:zipcode.value,
            password:password.value,
            pwconf:pwconf.value
        }
        register(payload);
    }
    return (
        
            <form onSubmit={onFormSubmit}>
                <fieldset className="form-group">
                <legend><h2>Sign Up</h2></legend>
                <div className="form-group">
                    <div className="col-xs-8 col-md-8" id="register">
                            <input type="text" id="username" className="form-control" placeholder="Username" 
                            pattern="[A-Za-z]+[A-Za-z0-9]*" ref={(node) => username = node }
                            title="Account name can only be upper or lower case letters and numbers, but may not start with a number" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="text" id="email" className="form-control" placeholder="a@b.co" 
                        pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+" ref={(node) => email = node }
                        title="Not a valid Email" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="text" id="zipcode" className="form-control" placeholder="XXXXX" 
                        pattern="\d{5}" ref={(node) => zipcode = node }
                        title="US zipcode should be exactly 5 digits." required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="text" id="birth" className="form-control" placeholder="01-01-1990" 
                        pattern="\d\d-\d\d-\d\d\d\d" ref={(node) => birth = node }
                        title="birth should be the format of 01-01-1990" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="password" id="password" placeholder="New password" ref={(node) => password = node }
                        className="form-control" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="password" id="pwconf" placeholder="Re-enter your password" ref={(node) => pwconf = node }
                        className="form-control" required/>
                    </div>
    				<div className="col-xs-8 col-md-8" id="register">
    	                <input type="submit" id="reg_frm_btn" className="btn btn-info btn-md" value="Register"/>
    	                <input type="reset" id="reg_frm_btn" className="btn btn-danger btn-md" value="Clear"/>
    	            </div>
                    <div className="col-xs-8 col-md-8" id="register">
                       <img src="https://drmqjozm1bc8u.cloudfront.net/images/responsive/fb_login_button.png" 
                        id="img_lgn_fb" onClick = {() => {fbLogin()}}/>
                    </div>
                </div>
                </fieldset>
            </form>
        
    )
}
Register.propTypes = {
    register: PropTypes.func.isRequired
}
export default connect(null,
    (dispatch) => {
        return {
            register: (payload) => dispatch(register(payload)),
            fbLogin: () => dispatch(fbLogin())
        }
    }
)(Register)