const { validationResult } = require('express-validator');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const { changeData } = req.body;
    const errors = validationResult(req);
    let user = await User.findById(req.user.id).select('-password');

    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });

    if (!user) return res.status(404).json('User not found');

    let dataToChange = req.params.user_data_to_change.toString();

    if (user[dataToChange] === changeData.toString())
      return res.status(401).json('This data already exists');

    user[dataToChange] = changeData.toString();

    await user.save();

    res.json('Data has been updated');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
