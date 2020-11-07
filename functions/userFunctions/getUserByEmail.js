const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    let userEmail = req.params.email;
    let user = await User.findOne({ email: userEmail }).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
