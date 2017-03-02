import React from 'react'
import { connect } from 'react-redux'

import { localLogin } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    return (

      <form className="form-group" id="login">
          <div className="col-sm-4">
            <input type="text" className="form-control" id="exampleInputName3" ref={(node) => { username = node }} 
            placeholder="User Name" required/>
          </div>
          <div className="col-sm-4">
            <input type="password" className="form-control" id="exampleInputPassword1" ref={(node) => { password = node }} 
            placeholder="Password" required/>
          </div>
          <div className= "col-sm-4">
            <button type="submit" id="btn1" className="btn btn-default active" onClick={() => { dispatch(localLogin(username.value, password.value)) }}>
            Login</button>
          </div>
      </form>
    )
}

export default connect()(Login)