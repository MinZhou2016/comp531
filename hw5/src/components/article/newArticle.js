import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { uploadArticle } from './articleActions';

const NewArticle = ({uploadArticle}) => {
	let article;

    const postArticle = (event) => {
        event.preventDefault();
        if(article && article.value){
            uploadArticle(article.value);
            article.value = ''
        }
    }
	return(
			
		<div className="article-post">
            <div className="post-title"><h4>Anything New You Wanna Post</h4></div>
            <textarea className="form-control" rows="4"
                placeholder="Post Something Here..."
                ref={(node) => {article = node} } >
            </textarea>
            <div className="post-group">
                <div className="Img-choose">
                   	<label className="ui_button" htmlFor="articleImage">
                        <i className="fa fa-picture-o fa-lg" aria-hidden="true" ></i>Add Picture
                    </label>
                    <input type="file" id="articleImage" accept="image/*" />
                </div>
                <div className="btn-right">
                    <button className="btn btn-md btn-primary clear-btn" onClick={() => article.value=''}>Clear</button>
                    <button className="btn btn-md btn-danger post-btn" onClick={postArticle}>Post</button>
                </div>
            </div>
        </div>

	)
}
export default connect(null, 
	(dispatch) => {
		return {
			uploadArticle: (payload) => dispatch(uploadArticle(payload))
        }
	}

)(NewArticle)