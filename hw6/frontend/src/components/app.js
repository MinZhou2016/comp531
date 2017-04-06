import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Profile from './profile/profile'
import Main from './main/main'
import Nav from './main/nav'



export const App = ({location}) => {

    let page
    
    switch(location) {
        case 'main': page = <Main/>; break;
        case 'profile': page = <Profile/>; break;
        default: page = <Landing/>; break;
    }
    if(location == ''){

        return (
            <div>
                { page }
            </div>

        )
     }
    return (
        <div>
            <Nav />
            { page }
        </div>
    )


    
}

export default connect(
    (state) => {
        return {
            location: state.pageState.page
        }
    }
)(App)