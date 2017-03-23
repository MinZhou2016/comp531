import moment from 'moment'
import React,{ PropTypes} from 'react';
import { connect } from 'react-redux';
import { editArticle } from './articleActions';
import {commentChange } from '../../actions';

const Comment= ({date,avatar,author,username,text,articleId,commentId,commentChange,editArticle}) => {

	let newComment='';
	const commentDate = moment(new Date(date));
		return(
			<div className="media">
				  <div className="media-left media-top">
				      <img className="media-object img-circle" src={avatar} alt="Image-coming..." />
				  </div>
				  <div className="media-body">
				    <h4 className="media-heading">{author}</h4>
				    <h6 className="media-heading">{commentDate.format('MM-DD-YYYY')} {commentDate.format('HH:mm:ss')}</h6>
				    <div onInput={(event) => {
				    	if(event.target.innerText !== text){
				    		newComment = event.target.innerText;
				    	}
				    }}
					     contentEditable={username === author}
					     dangerouslySetInnerHTML={{__html: text}}
					     title={username == author ? 'click to edit' : ''}>
					</div>
					{
						!(username === author)?'':
						<button type="button" className="btn btn-danger" onClick={() => {
							if(newComment !== ''){
								editArticle(articleId,newComment,commentId);
								newComment ='';
							}
						}}>Update</button>
					}
				  </div>
			</div>
		)
}
Comment.propTypes = {
  editArticle: PropTypes.func.isRequired,
  commentChange:PropTypes.func.isRequired
}
export default connect(null,
	(dispatch) => {
		return {
			editArticle: (articleId,comment,commentId) => dispatch(editArticle(articleId,comment,commentId)),
			commentChange: () => dispatch(commentChange())
		}
	}
)(Comment);


