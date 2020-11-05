const Post = require('../../models/Post');

// get user posts by middleware

module.exports = async (req, res) => {
  try {
    let posts = await Post.find({ user: req.params.user_id});
    // let userPosts = posts.filter(
    //   (post) => post.user.toString() === req.user.id.toString()
    // );
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
