import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({username, onProfile,navToProfile,navToMain,logout}) => (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">RiceBook</a>
        </div>
        <div className="collapse navbar-collapse navbar-right" id="myNavbar">
          <ul className="nav navbar-nav">        
              { onProfile ?
                <li><a href="#" onClick={() => navToMain()}><i className="fa fa-home" aria-hidden="true"></i> Home</a></li> :
                <li><a href="#" onClick={() => navToProfile()}><i className="fa fa-user" aria-hidden="true"></i> Profile</a></li>
              }
              <li><a href="#" onClick={() => logout()}><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</a></li>
          </ul>
        </div>
      </div>
    </nav>
)

export default connect(
  (state) => {
    return {
      onProfile: state.pageState.page == 'profile',
      username: state.profile.username
    }
  },
  (dispatch) => {
    return {
      navToMain: () => dispatch(navToMain()),
      navToProfile: () => dispatch(navToProfile()),
      logout: () => dispatch(logout())
    }
  }

)(Nav)