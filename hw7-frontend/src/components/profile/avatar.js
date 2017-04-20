import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadUserAvatar } from './profileActions'

const Avatar = ({img,uploadUserAvatar}) => {

    let file;

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        if(e.target.files.length !== 0){
            file = e.target.files[0];
            reader.readAsDataURL(file);
        }
        if(file){
            uploadUserAvatar(file);
        }
    }
 
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
                    <input type="file" id="own-img" accept="image/*" onChange={(e) => handleImageChange(e)} />
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
    },
    (dispatch) =>{
        return{
            uploadUserAvatar: (avatar) => dispatch(uploadUserAvatar(avatar))
        }
    }
)(Avatar)