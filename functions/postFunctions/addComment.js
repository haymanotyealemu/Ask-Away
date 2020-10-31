let Post = require('../../models/Post');
let User = require('../../models/User');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const { commentText } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let post = await Post.findById(req.params.post_id);
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json('User not found');
    }
    if (!post) {
      return res.status(404).json('Post not found');
    }

    let newComment = {
      commentText,
      firstName: user.firstName,
      avatar: user.avatar,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json('Comment is added');
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
};
