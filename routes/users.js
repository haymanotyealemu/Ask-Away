const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');

router.get('/', authentication, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/email/:user_email', async (req, res) => {
  try {
    let userEmail = req.params.user_email;
    let user = await User.findOne({ email: userEmail }).select('-password');
    res.json(user);
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

router.get('/id/:user_id', async (req, res) => {
  try {
    let userId = req.params.user_id;
    let user = await User.findById(userId).select('-password');
    res.json(user);
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
  }
);

router.put(
  '/search',
  [check('searchInput', 'Search is empty').not().isEmpty()],

  async (req, res) => {
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
  }
);

router.put(
  '/change_user/:user_data_to_change',
  authentication,
  [check('changeData', 'Input field is empty').not().isEmpty()],
  async (req, res) => {
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
  }
);

router.put(
  '/verify_password',
  authentication,
  [
    check(
      'verifyPassword',
      'Password must have between 6 to 12 characters'
    ).isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
    try {
      const { verifyPassword } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(404).json({ errors: errors.array() });

      let user = await User.findById(req.user.id);

      let passwordsMatch = await bcrypt.compare(verifyPassword, user.password);

      if (!passwordsMatch)
        return res.status(401).json('Passwords do not match');

      res.json('Password change succesful');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/change_password',
  authentication,
  [
    check(
      'newPassword',
      'Password must have between 6 to 12 characters'
    ).isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
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
  }
);

module.exports = router;
