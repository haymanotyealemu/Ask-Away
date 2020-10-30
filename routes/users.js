const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
const getUserByMiddleware = require('../functions/userFunctions/getUserByMiddleware');
const getUserByEmail = require('../functions/userFunctions/getUserByEmail');
const getUsers = require('../functions/userFunctions/getUsers');
const getUsersById = require('../functions/userFunctions/getUserById');
const registerUser = require('../functions/userFunctions/registerUser');
const {
  registerValidator,
  loginValidator,
  searchUserValidator,
  changeUserDataValidator,
  verifyPasswordValidator,
  changePasswordValidator,
} = require('../middleware/express-validator/expressValidator');

const loginUser = require('../functions/userFunctions/loginUser');
const searchUserByUsername = require('../functions/userFunctions/searchUserByUsername');
const changeUserData = require('../functions/userFunctions/changeUserData');
const checkPassword = require('../functions/userFunctions/checkPassword');
const changePassword = require('../functions/userFunctions/changePassword');

router.get('/', authentication, getUserByMiddleware);

router.get('/email/:user_email', getUserByEmail);

router.get('/users', getUsers);

router.get('/id/:user_id', getUsersById);

router.post('/register', registerValidator, registerUser);

router.post('/login', loginValidator, loginUser);

router.put('/search', searchUserValidator, searchUserByUsername);

router.put(
  '/change_user/:user_data_to_change',
  authentication,
  changeUserDataValidator,
  changeUserData
);

router.put(
  '/verify_password',
  authentication,
  verifyPasswordValidator,
  checkPassword
);

router.put(
  '/change_password',
  authentication,
  changePasswordValidator,
  changePassword
);

module.exports = router;
