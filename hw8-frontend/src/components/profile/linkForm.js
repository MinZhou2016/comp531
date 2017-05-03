import React from 'react';
import {connect} from 'react-redux';

import { linkAccount,linkFacebook,unlinkAccount } from './profileActions'

const LinkForm = ({username,linkAccount,linkFacebook,unlinkAccount}) => {

    let linkname,password;
	const onFromSubmit = (event) => {
		event.preventDefault();
		const payload={
			regUsername: linkname.value,
			regPassword: password.value
		}
		linkAccount(payload);
	}

	return(
		<div>
			{
				!username.split('@')[1]?
				<div>
					<div className="form-group row">
		                <button className="btn btn-danger" type="button" id="linkFacebookBtn" onClick={() => {linkFacebook()}}>Link Facebook</button>
		            </div>
		            <div className="form-group row">
		                <button className="btn btn-danger" type="button" id="linkFacebookBtn" onClick={() => {unlinkAccount('facebook')}}>Unlink Facebook</button>
		            </div>
				</div>
				: <form onSubmit={onFromSubmit}>
					<div className="form-group row">
		                <label className="col-sm-3 form-control-label" htmlFor="username"> Link Username:</label>
		                <div className="col-sm-6">
		                    <input className="form-control" id="username" type="text" placeholder="username to link" ref={(node) => {linkname = node}} />
		                </div>
		            </div>
		            <div className="form-group row">
		                <label className="col-sm-3 form-control-label" htmlFor="password"> Link Password:</label>
		                <div className="col-sm-6">
		                    <input className="form-control" id="password" type="text" placeholder="password to link" ref={(node) => {password = node}} />
		                </div>
		            </div> 
		            <div className="form-group row">
		                <button className="btn btn-primary" type="submit" id="linkBtn">Link</button>
		            </div>  
				</form>
			}
		</div>
	)

}

export default connect(
	(state) => {
		return{
			username: state.profile.username || ''
		}
	},
	(dispatch) => {
		return{
			linkAccount: (payload) => dispatch(linkAccount(payload)),
			linkFacebook: () => dispatch(linkFacebook()),
			unlinkAccount: (name) => dispatch(unlinkAccount(name))
		}
	}
)(LinkForm)