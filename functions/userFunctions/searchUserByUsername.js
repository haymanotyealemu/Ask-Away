const { validationResult } = require('express-validator');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    let { searchValue } = req.body;
    let errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });

    let users = await User.find().select('-password');
    let searchUsers = users.filter(
      (user) =>
        user.userName.toString().toLowerCase().split(' ').join('') ===
        searchValue.toString().toLowerCase().split(' ').join('')
    );
    res.json(searchUsers);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
