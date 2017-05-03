import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { uploadArticle, uploadArticleContainsImage ,showImage} from './articleActions';

const NewArticle = ({showImage,uploadArticle,uploadArticleContainsImage,uploaded_image}) => {
	let article,imageValue;

    const handleImageChange = (e)=> {
        e.preventDefault()
        let reader = new FileReader();
        reader.onloadend = () => {
            showImage(reader.result);
        }
        if (e.target.files.length !== 0) {
            let file = e.target.files[0];
            reader.readAsDataURL(file);
        }
    }
    const postArticle = () => {
        if(article && article.value){
            if(imageValue.files[0]){
                uploadArticleContainsImage(article.value,imageValue.files[0]);
            }else{
                uploadArticleContainsImage(article.value,undefined);
            }
            article.value = '';
            imageValue.value='';
            showImage('');
        }
    }
	return(
		<div className="article-post">
            <div className="post-title"><h4>Anything New You Wanna Post</h4></div>
            <textarea className="form-control" rows="4"
                id="newarticle"
                placeholder="Post Something Here..."
                ref={(node) => {article = node} } >
            </textarea>
            {   !uploaded_image ? '' :
                <div>
                    <img className="img-thumnail" src={uploaded_image} alt="ing" width="50px" height="50px"/>
                    <i className="fa fa-trash-o img-delete" aria-hidden="true" onClick={() => {
                        imageValue.value='';
                        showImage('');
                     }}></i>
                </div>
            }
            <div className="post-group">
                <div className="Img-choose">
                   	<label className="ui_button" htmlFor="articleImage">
                        <i className="fa fa-picture-o fa-lg" aria-hidden="true" ></i>Add Picture
                    </label>
                    <input type="file" id="articleImage" accept="image/*" onChange={e => handleImageChange(e)} ref={node => imageValue=node} />
                </div>
                <div className="btn-right">
                    <button className="btn btn-md btn-primary clear-btn" onClick={() => article.value=''}>Clear</button>
                    <button className="btn btn-md btn-danger post-btn" onClick={postArticle}>Post</button>
                </div>
            </div>
        </div>

	)
}
export default connect(
    (state) => {
        return {
            uploaded_image: state.showComponent.uploaded_image
        }
    }, 
	(dispatch) => {
		return {
			uploadArticleContainsImage: (payload,img) => dispatch(uploadArticleContainsImage(payload,img)),
            uploadArticle: (payload) => dispatch(uploadArticle(payload)),
            showImage: (img) => dispatch(showImage(img))
        }
	}

)(NewArticle)



