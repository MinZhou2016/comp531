import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
        	this.username.value= null
            this.email.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (
        
            <form onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                    username:this.username.value,
                    email:this.email.value,
                    zipcode:this.zipcode.value,
                    password:this.password.value,
                    pwconf:this.pwconf.value
                }
                this.props.dispatch(register(payload))
            }}>
                <fieldset className="form-group">
                <legend><h2>Sign Up</h2></legend>
                <div className="form-group">
                    <div className="col-xs-8 col-md-8" id="register">
                            <input type="text" id="username" className="form-control" placeholder="Username" 
                            pattern="[A-Za-z]+[A-Za-z0-9]*" ref={(node) => this.username = node }
                            title="Account name can only be upper or lower case letters and numbers, but may not start with a number" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="text" id="email" className="form-control" placeholder="a@b.co" 
                        pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+" ref={(node) => this.email = node }
                        title="Not a valid Email" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="text" id="zipcode" className="form-control" placeholder="XXXXX" 
                        pattern="\d{5}" ref={(node) => this.zipcode = node }
                        title="US zipcode should be exactly 5 digits." required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="password" id="password" placeholder="New password" ref={(node) => this.password = node }
                        className="form-control" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
                        <input type="password" id="pwconf" placeholder="Re-enter your password" ref={(node) => this.pwconf = node }
                        className="form-control" required/>
                    </div>
                    <div className="col-xs-8 col-md-8" id="register">
    	                <div class="radio">
    						<label className="col-md-4">
    							<input type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="..."/> Female
    						</label>
    						<label className="col-md-4">
    							<input type="radio" name="blankRadio" id="blankRadio2" value="option2" aria-label="..."/> Male
    						</label>
    					</div>
    				</div>
    				<div className="col-xs-8 col-md-8" id="register">
    	                <input type="submit" id="reg_frm_btn" className="btn btn-success" value="Register"/>
    	                <input type="reset" id="reg_frm_btn" className="btn btn-info" value="Clear"/>
    	            </div>
                </div>
                </fieldset>
            </form>
        
    )}
}

export default connect()(Register)