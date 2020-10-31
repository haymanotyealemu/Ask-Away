const { validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  try {
    let { passwordToCheck } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });

    let user = await User.findById(req.user.id);

    let passwordsMatch = await bcrypt.compare(passwordToCheck, user.password);

    if (!passwordsMatch) return res.status(401).json('Passwords do not match');

    res.json('Password change succesful');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
