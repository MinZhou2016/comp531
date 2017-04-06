import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NewArticle from './newArticle';
import { searchKeyword } from './articleActions';
import Article from './article';

const ArticlesView = ({articles,username,searchKeyword}) => {
	
	const sortArticles = sortActions(articles);
	let keyword = ''
	return (
		<div>
			<NewArticle />
			<div className="search">
				<input type="text" className="form-control search-bar" placeholder="Search Bar:  Input keyword to search" 
						ref={(node) => keyword = node } 
						onChange={() => searchKeyword(keyword.value)}/>
			</div>
			{ sortArticles.map((article) =>
		        <Article key={article._id} _id={article._id} username={username} author={article.author}
		          date={article.date} avatar={article.avatar} img={article.img}  text={article.text}
		          comments={article.comments}/>
	        )}
	    </div>
	)
}

ArticlesView.propTypes = {
  username: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    ...Article.propTypes
  }).isRequired).isRequired,
  searchKeyword: PropTypes.func.isRequired
}
export function filterFunction(oldArticles, keyword){

	const articleList = sortActions(Object.keys(oldArticles).map((_id)=> oldArticles[_id]))
	
	if(keyword && keyword.length !==0){
	    return articleList.filter((item)=>{
	      return item.text.toLowerCase().indexOf(keyword.toLowerCase()) >=0 ||
	           item.author.toLowerCase().indexOf(keyword.toLowerCase()) >=0
	    })
	  }
	  return articleList;
}
export function sortActions(items){
	return items.sort((a,b) => {
		if (a.date < b.date){
		          return 1
		        }
		        if (a.date > b.date){
		          return -1
		        }
		        return 0
		})
}

export default connect(
	(state) => {

		const articleAvatars = state.articles.avatars
    	const articleKeyword = state.articles.searchKeyword
    	const oldArticles = state.articles.articles

        const newArticles = filterFunction(oldArticles,articleKeyword);
    	const articles = newArticles.map((ele) => {
	      return {...ele, avatar: articleAvatars[ele.author], comments: ele.comments.map((c) => {
	        return { ...c, avatar: articleAvatars[c.author] }
	      })}
	    })
		return {
			 username: state.profile.username,
      		 articles
		}
	},
	(dispatch) => {
		return {
			searchKeyword: (word) => dispatch(searchKeyword(word))
		}
	}
)(ArticlesView);
