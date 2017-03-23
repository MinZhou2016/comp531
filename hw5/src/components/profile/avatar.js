import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


const Avatar = ({img}) => {
 
    return (
        <div className="container">
                <div className="row">
                    <img className="image-circle" src={img}/>
                </div>
                <div className="row">
                    <em>Upload new profile avatar</em>
                    <input type="file" accept="image/*"/>
                </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            img: state.profile.avatar
        }
    }
)(Avatar)