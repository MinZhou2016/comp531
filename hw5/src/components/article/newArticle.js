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
			
		<div>
            <div><h4>Anything New You Wanna Post</h4></div>
            <textarea className="form-control" rows="3"
                placeholder="Post Something Here..."
                ref={(node) => {article = node} } >
            </textarea>
            <form className="form-inline">
                <div className="form-group">
                   	<i className="fa fa-picture-o fa-lg pull-left" aria-hidden="true" ></i>
                    <input type="file" id="articleImage" accept="image/*" />
                </div>
                <button className="btn btn-md btn-danger pull-right"
                    onClick={postArticle}>Post</button>
            </form>
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