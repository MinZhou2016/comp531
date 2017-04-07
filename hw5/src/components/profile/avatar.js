import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


const Avatar = ({img}) => {
 
    return (
        <div>
            <div className="container avatar">
                <div className="image-user">
                    <img className="img-circle img-avatar" src={img}/>
                </div>
                <div className="upload-avatar">
                    <label className="user-label" htmlFor="own-img" >
                        Upload new Image <i className="fa fa-file-image-o" aria-hidden="true"></i>
                    </label>
                    <input type="file" id="own-img" accept="image/*"/>
                </div>
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