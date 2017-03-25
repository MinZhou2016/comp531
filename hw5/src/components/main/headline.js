import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateHeadline } from '../profile/profileActions';
import {headlineEdit} from '../../actions';

const HeadLine = ({username,avatar,headline,headlineEditShow,updateHeadline,headlineEdit}) =>{
	let newHeadline;
	
	const onFormSubmit = (event) => {
		event.preventDefault();
	    if(newHeadline && newHeadline.value){
			updateHeadline(newHeadline.value);
			newHeadline.value ='';
			headlineEdit();
		}
	}
	return(
		<div>
			<ul>
				<li>
					<img className="img-head img-thumbnail" alt="Image-coming" src={avatar} />
				</li>
				<li >Name: <b>{username}</b></li>
				<li>Headline:</li>
				<li><b>{headline}</b><span className="glyphicon glyphicon-edit" aria-hidden="true" onClick={() => headlineEdit()}></span></li>
				{!headlineEditShow ? '':
					<form className="form-froup" onSubmit={onFormSubmit}>
						<input className="form-control" type="text" placeholder="Change the headline" ref={(node) => { newHeadline = node }}  />
						<input type="submit" className="btn btn-warning btn-xs" value="Update"/>
					</form>
				}
			</ul>
		</div>
	)
}
HeadLine.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    headline: PropTypes.string,
    headlineEditShow:PropTypes.bool.isRequired,
    updateHeadline: PropTypes.func.isRequired,
    headlineEdit:PropTypes.func.isRequired
}
export default connect(
	(state) => {
		return {
			username: state.profile.username,
			headline: state.profile.headline,
			avatar : state.profile.avatar,
			headlineEditShow: state.showComponent.headlineEditShow
		}
	},
	(dispatch) => {
		return {
			updateHeadline: (term) => dispatch(updateHeadline(term)),
			headlineEdit: () => dispatch(headlineEdit())
		}
	}
)(HeadLine);