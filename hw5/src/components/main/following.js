import React,{PropTypes } from 'react';
import { connect } from 'react-redux';
import {addFollower, delFollower,showInputBar} from './followingActions';

const Followers = ({followers,error,delFollower,addFollower,showFollowerInput,showInputBar}) => {

	let newFollower;
		return (
			<div>
			<ul>
				<li><h4>Follower List <i className="fa fa-plus" onClick={() => showInputBar()}></i></h4></li>
				<li>{!showFollowerInput ? '':
						<form className="form-froup" onSubmit={(event) => {
							event.preventDefault();
							if(newFollower && newFollower.value){
								addFollower(newFollower.value);
								newFollower.value = '';
								if(error.length === 0){
									showInputBar();
								}
							}
						}}>
							<input className="form-control" type="text" placeholder="Input the follower's name" ref={(node) => { newFollower = node }} />
							<input type="submit" className="btn btn-primary btn-xs" value="Add"/>
						</form>
				}</li>
				<li>{error.length == 0 ? '' :
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }</li>
				<li>{ Object.keys(followers).sort().map((f) => followers[f]).map((follower) => 
			            <div className="row" key={follower.name}>
					        <div className="col-md-3 col-xs-3">
					            <img className="img-follower img-thumbnail" alt="Image-coming..." src={ follower.avatar }/>
					        </div>
					        <div className="col-md-9 col-xs-9">
					            <div><strong>{ follower.name }</strong></div>
					            <div><em>{ follower.headline }</em></div>
					        </div>
					        <span><i className="fa fa-trash pull-right" onClick={() => delFollower(follower.name) }></i></span>
					    </div> 
				)}</li>
			</ul>
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