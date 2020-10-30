const { check } = require('express-validator');

module.exports.registerValidator = [
  check('firstName', 'First Name is empty').not().isEmpty(),
  check('lastName', 'Last name is empty').not().isEmpty(),
  check('userName', 'Username is empty').not().isEmpty(),
  check('email', 'Email is empty').isEmail(),
  check('password', 'Password must be between 6 to 12 characters').isLength({
    min: 6,
    max: 12,
  }),
];

module.exports.loginValidator = [
  check('email', 'Email is empty').isEmail(),
  check('password', 'Password must be between 6 to 12 characters').isLength({
    min: 6,
    max: 12,
  }),
];

module.exports.searchUserValidator = [
  check('searchInput', 'Search is empty').not().isEmpty(),
];

module.exports.changeUserDataValidator = [
  check('changeData', 'Input field is empty').not().isEmpty(),
];

module.exports.verifyPasswordValidator = [
  check(
    'verifyPassword',
    'Password must have between 6 to 12 characters'
  ).isLength({ min: 6, max: 12 }),
];

module.exports.changePasswordValidator = [
  check(
    'newPassword',
    'Password must have between 6 to 12 characters'
  ).isLength({ min: 6, max: 12 }),
];

module.exports.createPostValidator = [
  check('postText', 'Text is required!').not().isEmpty(),
];

module.exports.searchPostValidator = [
  check('searchValue', 'Search is empty').not().isEmpty(),
];

module.exports.addCommentValidator = [
  check('commentText', 'Comment is empty').not().isEmpty(),
];
