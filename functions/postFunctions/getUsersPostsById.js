const Post = require('../../models/Post');

module.exports = async (req, res) => {
  try {
    let posts = await Post.findById({ user: req.params.user_id });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
