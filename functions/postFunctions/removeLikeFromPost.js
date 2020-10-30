let Post = require('../../models/Post');

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json('Post not found');

    const removeLike = post.likes.filter(
      (like) => like.id.toString() !== req.params.like_id.toString()
    );

    post.likes = removeLike;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
