let Post = require('../../models/Post');

module.exports = async (req, res) => {
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
};
