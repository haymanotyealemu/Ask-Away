let Post = require('../../models/Post');

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json('Post not found');

    if (post.user.toString() !== req.user.id.toString())
      return res.status(401).json('You are not allowed to do that! ');

    await post.remove();

    res.json('Post has been deleted!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
