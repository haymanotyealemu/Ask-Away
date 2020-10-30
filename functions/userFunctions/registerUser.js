const { validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');

module.exports = async (req, res) => {
  try {
    let { firstName, lastName, userName, email, password } = req.body;
    let user = await User.findOne({ email }).select('-password');

    const userNameDatabase = await User.findOne({ userName }).select(
      '-password'
    );

    let errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (user) {
      return res.status(401).send('User already exists');
    }

    if (userNameDatabase === userName) {
      return res.status(401).send('Username already in use');
    }

    if (user) {
      return res.status(401).send('User already exists');
    }

    const avatar = gravatar.url(email, {
      r: 'pg',
      d: 'mm',
      s: '200',
    });

    let newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password,
      avatar,
      createdAt: new Date().toISOString(),
    });

    const salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(password, salt);

    newUser.password = hashedPassword;

    await newUser.save();
    res.json('user registered');

    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      config.get('SECRET_KEY'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
