const express = require('express');
const router = express.Router();
let Post = require('../models/Post');
let User = require('../models/User');
const authentication = require('../middleware/authentication');
const { check, validationResult } = require('express-validator');

const {
  createPostValidator,
  searchPostValidator,
  addCommentValidator,
} = require('../middleware/express-validator/expressValidator');
const getPosts = require('../functions/postFunctions/getPosts');
const getMostLikedPosts = require('../functions/postFunctions/getMostLikedPosts');
const getMostRecentPosts = require('../functions/postFunctions/getMostRecentPosts');
const getMostCommentedPost = require('../functions/postFunctions/getMostCommentedPost');
const getPostById = require('../functions/postFunctions/getPostById');
const getUsersPostsById = require('../functions/postFunctions/getUsersPostsById');
const getUserPosts = require('../functions/postFunctions/getUserPosts');
const createPost = require('../functions/postFunctions/createPost');
const searchForPost = require('../functions/postFunctions/searchForPost');
const addLike = require('../functions/postFunctions/addLike');
const addComment = require('../functions/postFunctions/addComment');
const likeComment = require('../functions/postFunctions/likeComment');

const removeLikeFromPost = require('../functions/postFunctions/removeLikeFromPost');
const removeComment = require('../functions/postFunctions/removeComment');
const deletePost = require('../functions/postFunctions/deletePost');
const removeLikeFromComment = require('../functions/postFunctions/removeLikeFromComment');

router.get('/', getPosts);

router.get('/most_liked', getMostLikedPosts);

router.get('/most_recent', getMostRecentPosts);

router.get('/most_comments', getMostCommentedPost);

router.get('/:post_id', getPostById);

router.get('/user_posts/:user_id', getUsersPostsById);

router.get('/user_posts', authentication, getUserPosts);

router.post('/', authentication, createPostValidator, createPost);

router.put('/search_for_post', searchPostValidator, searchForPost);

router.put('/likes/:post_id', authentication, addLike);

router.put(
  '/add_comment/:post_id',
  authentication,
  addCommentValidator,
  addComment
);

// route for liking our comments
router.put('/like_comment/:post_id/:comment_id', authentication, likeComment);

// route to delete post
router.delete('/delete_post/:post_id', authentication, deletePost);

// route to remove like from a post
router.delete(
  '/remove_like_from_post/:post_id/:like_id',
  authentication,
  removeLikeFromPost
);

// route to delete a comment
router.delete(
  '/remove_comment/:post_id/:comment_id',
  authentication,
  removeComment
);

// route to remove like from comment
router.delete(
  '/remove_like_from_comment/:post_id/:comment_id/:like_id',
  authentication,
  removeLikeFromComment
);

module.exports = router;
