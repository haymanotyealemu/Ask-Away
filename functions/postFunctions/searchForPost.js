let Post = require('../../models/Post');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const { searchValue } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(404).json({ errors: errors.array() });
  try {
    let posts = await Post.find();
    if (searchValue === '' || searchValue === null) {
      res.status(401).json(posts);
    } else {
      let postsBySearch = posts.find(
        (post) =>
          post.postText.toString().toLowerCase().split(' ').join('') ===
          searchValue.toString().toLowerCase().split(' ').join('')
      );
      res.json(postsBySearch);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
