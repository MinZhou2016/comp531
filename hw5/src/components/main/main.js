import React, { Component } from 'react';
import HeadLine from './headline';
import Followers from './following';
import ArticlesView from '../article/articlesView';

const Main = () =>{
		return (
			<div className="main container-fluid">
				<div className="row">
					<div className="col-md-2">
						<HeadLine />
						<Followers />
					</div>
					<div className="col-md-8">
						<ArticlesView />
					</div>
				</div>
			</div>
		)
}

export default Main;

