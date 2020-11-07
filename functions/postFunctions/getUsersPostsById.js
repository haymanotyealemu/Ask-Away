const Post = require('../../models/Post');
// get user post by id
module.exports = async (req, res) => {
  try {
    let posts = await Post.find({ user: req.params.user_id });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
