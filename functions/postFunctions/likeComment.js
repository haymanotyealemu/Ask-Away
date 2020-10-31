let Post = require('../../models/Post');

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(401).json('post not found');
    }
    const commentFromPost = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id.toString()
    );
    if (!commentFromPost) return res.status(404).json('Comment not found');
    let newLike = {
      user: req.user.id,
    };
    commentFromPost.likes.unshift(newLike);

    await post.save();
    res.json('Comment liked');
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
};
