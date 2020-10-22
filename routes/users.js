const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
let User = require('../schemas/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');

router.get('/', async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/get_user_by_email/:user_email', async (req, res) => {
  try {
    let users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/users', async (req, res) => {
  try {
    let users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.post(
  '/register',
  [
    check('firstName', 'First Name is empty').not().isEmpty(),
    check('lastName', 'Last name is empty').not().isEmpty(),
    check('userName', 'Username is empty').not().isEmpty(),
    check('email', 'Email is empty').isEmail(),
    check('password', 'Password must be between 6 to 12 characters').isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res) => {
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

      const payload = {
        user: {
          id: newUser._id,
        },
      };

      jwt.toString(
        payload,
        config.get('SECRET_KEY'),
        { expiresIn: 3600 },
        (error, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Email is empty').isEmail(),
    check('password', 'Password must be between 6 to 12 characters').isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      let errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      if (!user) {
        return res.status(404).send('User does not exist');
      }

      let passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) return res.status(401).json('Passwords do not match');

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.toString(
        payload,
        config.get('SECRET_KEY'),
        { expiresIn: 3600 },
        (error, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
