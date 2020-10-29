const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const authentication = require('../middleware/authentication');
const { check, validationResult } = require('express-validator');
// route to get all Posts
router.get('/', async (req, res) => {
  try {
    let posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
});
// route to get the most liked post 
router.get('/most_liked', async (req, res) => {
  try {
    // orders from most liked comment to least liked
    let posts = await Post.find().sort({ likes: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
});
//  route to get the most recent post
router.get('/most_recent', async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
});
// route to get the most commented post
router.get('/most_comments', async (req, res) => {
  try {
    let posts = await Post.find().sort({ comments: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
}); 
// route to get a single post
router.get('/:post_id', async (req, res) => {
  try {
    let posts = await Post.findById(req.params.post_id);
    res.json(posts);
  } catch (error) {
    console.error(error.message); 
    return res.status(500).json('Server error');
  }
});
// 
router.get('/user_posts/:user_id', async (req, res) => {
  try {
    let posts = await Post.find({ user: req.params.user_id });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
});
//
router.get('/user_posts', authentication, async (req, res) => {
  try {
    let posts = await Post.find();
    let userPosts = posts.filter(
      (post) => post.user.toString() === req.user.id.toString()
    );
    res.json(userPosts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
});
//*************************************************************************************** */
//  here we start the post request
router.post(
  '/',
  authentication,
  [check('postText', 'Text is required!').not().isEmpty()],
  async (req, res) => {
    let { postText } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      let user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json('User not found');
      let newPost = new Post({
        postText,
        userName: user.userName,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.save();
      res.json('Post created');
    } catch (error) {
      console.error(error.message);
      return res.status(500).json('Server error');
    }
  }
);
//*************************************************************************************** */
// Here we start the put requests
router.put(
  '/search_for_post',
  [check('searchValue', 'Search is empty').not().isEmpty()],

  async (req, res) => {
    const { searchValue } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });
    try {
      let posts = await Post.find();
      if (searchValue === '' || searchValue === null) {
        res.status(401).json(posts);
      } else {
        let postsBySearch = posts.find(
          (post) =>
            post.postText.toString().toLowerCase().split(' ').join('') ===
            searchValue.toString().toLowerCase().split(' ').join('')
        );
        res.json(postsBySearch);
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);
// route to add likes
router.put('/likes/:post_id', authentication, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json('Post was not found!');

    if (post.likes.find((like) => like.user.toString() === req.user.id))
      return res.status(401).json('Post has already been liked!');

    let newLike = {
      user: req.user.id,
    };

    post.likes.unshift(newLike);

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});
// route for adding the comments
router.put("/add_comment/:post_id", authentication, [check('commentText', 'Comment is empty').not().isEmpty()], async (req, res) => {
  const { commentText } = req.body;
  const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      let post = await Post.findById(req.params.post_id);
      let user =  await User.findById(req.user.id);
      if(!user){
        return res.status(404).json('User not found');
      }
      if(!post){
        return res.status(404).json('Post not found');
      }

      let newComment = {
        commentText,
        userName: user.userName,
        avatar: user.avatar
      }
      post.comments.unshift(newComment);
      await post.save();
      res.json("Comment is added")
    } catch (error) {
      console.error(error.message);
    return res.status(500).json('Server error');
    }
});
module.exports = router;
