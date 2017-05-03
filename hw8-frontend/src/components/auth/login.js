//thrown-gather-power
import React,{PropTypes} from 'react'
import { connect } from 'react-redux'
import {updateError,updateSuccess} from '../../actions'
import { localLogin } from './authActions'

const Login = ({localLogin,updateSuccess,updateError}) => {
    let username, password
    return (

      <div className="form-group" id="login">
          <div className="col-sm-4">
            <input type="text" className="form-control" id="exampleInputName3" ref={(node) => { username = node }} 
            placeholder="User Name" required/>
          </div>
          <div className="col-sm-4">
            <input type="password" className="form-control" id="exampleInputPassword1" ref={(node) => { password = node }} 
            placeholder="Password" required/>
          </div>
          <div className= "col-sm-4">
            <input type="submit" id="btn1" className="btn btn-default" value="Login"
            onClick={() => {
              localLogin(username.value, password.value);
              updateSuccess('');
              updateError('');
            }} />
          </div>
      </div>
    )
}
Login.PropTypes = {
    localLogin: PropTypes.func.isRequired
}

export default connect(null,
  (dispatch) => {
    return {
      localLogin: (username,password) => dispatch(localLogin(username,password)),
      updateError: (err) => dispatch(updateError(err)),
      updateSuccess: (err) => dispatch(updateSuccess(err)),
    }
})(Login)