import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { editArticle } from './articleActions';
import Comment from './comment';
import Action from '../../actions';
import { sortActions } from './articlesView';

const Article = ({_id,date,avatar,author,username,text,comments,editArticle,activeId,activeShow,activeEdit,forceActive,img}) => {
	
	let newArticle,newComment;

	const sortComments = sortActions(comments);
	
	const articleDate = moment(new Date(date));

	const postNewComment = () => {
		if(newComment && newComment.value){
			editArticle(_id,newComment.value,-1);
			newComment.value='';
			forceActive(_id,true,false);
		}
	}
		return (
			<div className="article">
				<div className="media">
				  <div className="media-left media-top">
				      <img className="media-object img-circle" src={avatar} alt="Image-coming..." />
				  </div>
				  <div className="media-body">
				    <h4 className="media-heading">{author}</h4>
				    <h6 className="media-heading">{articleDate.format('MM-DD-YYYY')} {articleDate.format('HH:mm:ss')}</h6>
				    <div className="article-content" 
				         onInput={(event) => {
				    	    if(event.target.innerText !== text){
				    		    newArticle = event.target.innerText;
				    	    }
				         }}
					     contentEditable={username === author}
					     dangerouslySetInnerHTML={{__html: text}}
					     title={username == author ? 'click to edit' : ''}>
					</div>
					{!img ?'':
						<div className="media-left media-top article-avatar">
					      <img className="media-object img-thumnail" src={img} alt="Image-coming..." />
					    </div>
				    }
				  </div>
				</div>
				<div className="btn-group btn-group-justified" role="group" aria-label="...">
				  <div className="btn-left btn-group" role="group">
				    <button type="button" className="btn btn-default" onClick={() => {
				    	if(_id == activeId){
				    		forceActive(_id,!activeShow,activeEdit);
				    	}else {
				    		forceActive(_id,true,false);
				    	}
				    }}>Comments</button>
				  </div>
				  <div className="btn-group" role="group">
				    <button type="button" className="btn btn-default" onClick={() => {
				    	if(_id == activeId){
				    		forceActive(_id,activeShow,!activeEdit);
				    	} else {
				    		forceActive(_id,false,true);
				    	}
				    }}>Add Comment</button>
				  </div>
				  {
				  	!(username === author)? '':
				  	<div className="btn-group btn-right" role="group">
				    	<button type="button" className="btn btn-default" onClick={() => {
				    		if(newArticle && newArticle !== ''){
				    			editArticle(_id,newArticle);
				    			newArticle = '';
				    		}
				    	}}>Edit</button>
				    </div> 
				  }
				</div>
				{
					!(activeId == _id && activeEdit) ?'':
					<div className="comment-post">
						<textarea className="form-control" rows="3" placeholder="Post your comments here" 
							      ref={(node) => {newComment= node}}>
						</textarea>
						<div className="post-group">
							<div className="btn-right">
								<button className="btn btn-md btn-primary clear-btn" onClick={() => newComment.value=''}>Clear</button>
								<button className="btn btn-md btn-danger post-btn" onClick={postNewComment}>Post</button>
							</div>
						</div>
					</div>
				}
				{
					!(activeId == _id && activeShow) ?'':
						sortComments.map((comment) =>
						    <div className='comment' key={comment.commentId}>
					            <Comment articleId={_id} username={username}
					              commentId={comment.commentId} author={comment.author} date={comment.date}
					              text={comment.text} avatar={comment.avatar} />
				            </div>
				    )
				}
				
			</div>
		)
}
export default connect(
	(state) => {
		return{
			activeId: state.activeArticle.id,
			activeShow: state.activeArticle.showCom,
			activeEdit: state.activeArticle.showEdit
		}
	},
	(dispatch) => {
		return {
			editArticle: (articleId,message,commentId) => dispatch(editArticle(articleId,message,commentId)),
			forceActive: (id,show,edit) => dispatch({type: Action.FORCE_ACTIVE,id: id, show: show,edit:edit})
		}
	}
)(Article);


