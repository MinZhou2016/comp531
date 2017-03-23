import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { uploadArticle } from './articleActions';

const NewArticle = ({uploadArticle}) => {
	let article;

    const postArticle = () => {
        if(article && article.value){
            uploadArticle(article.value);
            article.value = ''
        }
    }
	return(
			
		<div className="container">
            <div><h4>Anything New You Wanna Post</h4></div>
            <textarea className="form-control" rows="3"
                placeholder="Post Something Here..."
                ref={(node) => {article = node} } >
            </textarea>
            <div>
               	<i className="fa fa-picture-o fa-lg pull-left" aria-hidden="true" ></i>
                <input type="file" id="articleImage" accept="image/*" />
                <button className="btn btn-md btn-danger pull-right"
                onClick={postArticle}>Post</button>
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