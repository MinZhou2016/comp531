//Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url).then(res =>res.json())
            .then(res => word(res))
    }
    function word(res){
        var ary = {};
        res['articles'].forEach(function(element){
            ary[element['_id']] = element['text'].split(" ").length;
        })
        // return an object { articleId: wordCount }
        return ary;
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return fetch(url).then(res=>res.json())
            .then(res => word(res))
            .catch(err => {
                return {}
            })
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return fetch(url)
                .then(res => res.json())
                .then(json => maxId(json))
    }

    function maxId(json){
        var Id = json.articles[0]._id
        var maxLength = json.articles[0].text.split(" ").length
        var articles = json.articles
        articles.forEach(function(object){
            if(object.text.split(" ").length > maxLength){
                Id = object._id
            }
        })
        return String(Id)
    }


    exports.inclass = {
        author: "Min_ZHOU",
        countWords, countWordsSafe, getLargest
    }

})(this);