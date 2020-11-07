let Post = require('../../models/Post');
let User = require('../../models/User');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  let { postText } = req.body;
  let errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    let user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json('User not found');

    let newPost = new Post({
      postText,
      firstName: user.firstName,
      avatar: user.avatar,
      user: req.user.id,
    });

    await newPost.save();

    res.json('Post created');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
