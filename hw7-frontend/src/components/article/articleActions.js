import Action, { resource } from '../../actions';

export function searchKeyword(keyword) {
    return { type: Action.SEARCH_KEYWORD, keyword }
}

//function to upload both image and text message
export function uploadArticleContainsImage(message,file){
	return (dispatch) => {
		
		//Using Form data to upload the img and message
		const fd = new window.FormData();
		fd.append('text', message);
        fd.append('image', file);
        resource('POST', 'article', fd,false)
        .then((response) => {
            const article = response.articles[0]
            dispatch({
             type: Action.ADD_ARTICLE,
              article 
            })
        })
    }
}

//function to only upload text message
export function uploadArticle(message) {
    return (dispatch) => {
        const payload = { text: message }
        resource('POST', 'article', payload)
        .then((response) => {
            const article = response.articles[0]
            dispatch({ 
            	type: Action.ADD_ARTICLE,
            	 article 
            })
        })
    }
}

export function showImage(image){
	return {type: Action.UPLOAD_SUCCESS, image};
}


export function fetchArticles(){
	return (dispatch, getState) => {
		resource('GET', 'articles')
		.then(r => {
			const newArticles = r.articles.reduce((acc, cur) => {
				acc[cur._id]= cur;
				return acc;
			},{})

			dispatch({type : Action.UPDATE_ARTICLES, newArticles})
			// get current Avatars
			const curAvatars = getState().articles.avatars;

			//find all the author(including the articles' author and comments' author) that has not store the avatar in the state.articles.avatars
			const authors = new Set(r.articles.reduce((acc, cur) => {
                acc.push(cur.author)
                cur.comments.map((cur) => cur.author).forEach((author) => acc.push(author))
                return acc
            }, []).filter((author) => !curAvatars[author]))

			//get these authors' avatar and store them in the state.articles.avatars
			const userList = [...authors].join(',');
			resource('GET',`avatars/${userList}`)
			.then(r => {
				r.avatars.forEach((ele) => {
					curAvatars[ele.username] = ele.avatar;
				})
				dispatch({type: Action.UPDATE_AVATARS, curAvatars});
			})

		})
	}
}

export function editArticle(id, text,commentId){
	return (dispatch) => {
        const payload = { text: text }
        if (commentId) payload.commentId = commentId.toString();
        resource('PUT', `articles/${id}`, payload)
        .then((response) => {
            const article = response.articles[0]
            dispatch({ type: Action.EDIT_ARTICLE, article })
        })
    }
}