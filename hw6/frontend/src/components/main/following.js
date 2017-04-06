import React,{PropTypes } from 'react';
import { connect } from 'react-redux';
import {addFollower, delFollower,showInputBar} from './followingActions';

const Followers = ({followers,error,delFollower,addFollower,showFollowerInput,showInputBar,fetchArticles}) => {

	let newFollower;
	const onFormSubmit = (event) => {
		event.preventDefault();
		if(newFollower && newFollower.value){
			addFollower(newFollower.value);
			newFollower.value = '';
		    if(error.length === 0){
				showInputBar();
			}
		}
	}
	const orderedFollowers = Object.keys(followers).sort().map((f) => followers[f]);
		return (
			<div>
				<div className="follower-list">
					<div className="follwer-header">
					     <h4>Follower List <i className="fa fa-plus show-input" onClick={() => showInputBar()}></i></h4>
					</div>
					{!showFollowerInput ? '':
						<div>
							<form className="form-inline" onSubmit={onFormSubmit}>
								<input className="fol-input" type="text" placeholder="Input the follower's name" ref={(node) => { newFollower = node }} />
								<input type="submit" className="btn btn-primary fol-btn" value="Add"/>
							</form>
						</div>
					}
					{error.length == 0 ? '' :
	                    <div className="alert alert-danger">
	                        {error}
	                    </div>
	                }
	                <div className="follower-group">
					{ orderedFollowers.map((follower) => 
				        <div className="follower" name="individual-follower" key={follower.name}>
						    <div className="follower-img">
						        <img className="fol-img img-thumbnail" alt="Image-coming..." src={ follower.avatar }/>
						    </div>
						    <div className="right" >
							    <div className="information">
							        <div><strong>{ follower.name }</strong></div>
							        <div className="fol-headline"><em>{ follower.headline }</em></div>
							    </div>
							    <div className="delete">
								    <button className="del-btn" 
								    onClick={() => {delFollower(follower.name)}}><i className="fa fa-trash"></i></button>
							    </div>
						    </div>
						</div> 
					)}
					</div>
				</div> 
			</div>      
		)
}

Followers.propTypes = {
    followers: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    showFollowerInput: PropTypes.bool.isRequired,
    delFollower: PropTypes.func.isRequired,
    addFollower: PropTypes.func.isRequired,
    showInputBar: PropTypes.func.isRequired
}

export default connect(
	(state) => {
		return {
			followers: state.followers.followers,
			error: state.errors.addFollowerError,
			showFollowerInput: state.showComponent.showFollowerInput
		}
	},
	(dispatch) => {
		return {
			delFollower: (name) => dispatch(delFollower(name)),
			addFollower: (name) => dispatch(addFollower(name)),
			showInputBar: () => dispatch(showInputBar())
		}
	}
)(Followers)