const Post = require('../../models/Post');
// route to get all Posts
module.exports = async (req, res) => {
  try {
    let posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
