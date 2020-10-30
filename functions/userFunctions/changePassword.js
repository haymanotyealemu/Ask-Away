const { validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const errors = validationResult(req);
    let user = await User.findById(req.user.id).select('-password');

    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.json('Password updated');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
