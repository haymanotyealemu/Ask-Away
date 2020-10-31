const express = require("express");
const router = express.Router();

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

router.get('/user_email/:email', getUserByEmail);

router.get('/allusers', getUsers);

router.get('/user_by_id/:user_id', getUsersById);

router.post('/register', registerValidator, registerUser);

router.post('/login', loginValidator, loginUser);

router.put('/search_by_username', searchUserValidator, searchUserByUsername);

router.put(
  '/change_user_data/:user_data_to_change',
  authentication,
  changeUserDataValidator,
  changeUserData
);

router.put(
  '/check_actual_password',
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










// let User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// // A library to generate Gravatar URLs in Node.js Based on gravatar specs -
// const gravatar = require('gravatar');
// const authentication = require('../middleware/authentication');

// // Here we start the get requests
// //Here we define to find a user by id by passing the middleware authentication 
// router.get('/', authentication, async (req, res) => {
//     try {
//         let user =  await User.findById(req.user.id).select('-password');
//         res.json(user);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('Server error');
        
//     }
// });

// // route to get a user by Email
// router.get('/user_email/:email', async (req, res) => {
//     try {
//         let userEmail = req.params.email;
//         let user =  await User.findOne({email: userEmail}).select('-password');
//         res.json(user);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('Server error');
        
//     }
// });
// // route to get a user by ID
// router.get('/user_by_id/:user_id', async (req, res) => {
//     try {
//         let userId = req.params.id;
//         let user =  await User.findById(userId).select('-password');
//         res.json(user);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('Server error');
        
//     }
// });

// // route to get all users
// router.get('/allusers', async (req, res) => {
//     try {
//         let users =  await User.find().select('-password');
//         res.json(users);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send('Server error');
        
//     }
// });
// //****************************************************************************************************************************** */
// // We start the post route

// // Here we start the user register or signup request route
// router.post('/register', [
//     // here we check the inputs validation using express-validator
//     check('firstName', 'First Name is empty').not().isEmpty(),
//     check('lastName', 'Last name is empty').not().isEmpty(),
//     check('userName', 'Username is empty').not().isEmpty(),
//     check('email', 'Email is empty').isEmail(),
//     check('password', 'Password must be between 6 to 12 characters').isLength({
//         min: 6,
//         max: 12,
//     }),
//     ],
//     async (req, res) => {
//         try {
            
//             let {firstName, lastName, userName, email,password} = req.body;
//             let user =  await User.findOne({ email }).select('-password');
//             let fetchedUserName  = await User.findOne({ userName}).select('-password');
//             let errors = validationResult(req);
//             if (!errors.isEmpty()){
//                     return res.status(400).json({ errors: errors.array() });
//                 };
            
//              // here we start checking if the user exist or not and when we take the email for checking we don't need to have the  password.
//             if(user){
//                 return res.status(401).send("User has already existed"); 
//             };
//             // here we crosscheck the new registering users username with the existed username in our database
//             if(fetchedUserName === userName){
//                 return res.status(401).send("User name is already has been taken");   
//             }
//             // here we can access the mew user avatar from the users email account or the default one specification
//             const avatar = gravatar.url(email, {
//                 r: "pg",
//                 d: "mm",
//                 s: "200"
//             });
//             let newUser = new User({
//                 firstName,
//                 lastName,
//                 userName,
//                 email,
//                 password,
//                 avatar
//             });
//             // we hash the password
//             const salt = await bcrypt.genSalt(10);
//             let hashedPassword = await bcrypt.hash(password, salt);
//             newUser.password = hashedPassword;
//             // here we save the new user who register successfully to the database.
//             await newUser.save();
//             // here we gonna create the jsonwebtoken to our new user and store in the localstorage
//             const payload = {
//                 user : {
//                     id: newUser._id,
//                 }
//             };
//             jwt.sign(payload, config.get('jsonWebTokenSecret'), {expiresIn: 3600}, (err, token) => {
//                 if(err)throw err;
//                 res.json({token});
//             });
//         }catch (error){
//             console.error(error.message);
//             return res.status(500).send("Server error");
//         };
//     } 
// );

// // Here we start the user login route
// router.post('/login', [
//     check('email', 'Email is empty').isEmail(),
//     check('password', 'Password must be between 6 to 12 characters').isLength({
//         min: 6,
//         max: 12,
//     }),
//     ],
//     async (req, res) => {
//         try {
//             // The user use the email and password to login
//             let { email,password } = req.body;
//             let errors = validationResult(req);
//             if (!errors.isEmpty()){
//                     return res.status(400).json({ errors: errors.array() });
//                 };
//             //
//             let user = await User.findOne({ email });
//             if(!user){
//                 return res.status(404).send("User does not exist with this Email address!")
//             }
//             // here we check the password from our database
//             let checkPasswordMatch = await bcrypt.compare(password, user.password);
//             if(!checkPasswordMatch){
//                 return res.status(401).json("Password You Entered do not match!");
//             }
//             const payload = {
//                 user : {
//                     id: user._id,
//                 }
//             };
//             jwt.sign(payload, config.get('jsonWebTokenSecret'), {expiresIn: 3600}, (err, token) => {
//                 if(err)throw err;
//                 res.json({token});
//             });
//         }catch (error){
//             console.error(error.message);
//             return res.status(500).send("Server error");
//         };
//     } 
// );
// //********************************************************************** */
// // We start the put routes
// // Here we define the route for changing the user data i.e the firstName, lastName and userName requested by the user
// router.put('/change_user_data/:user_data_to_change', authentication, [check('changeUserData', "Input is empty").not().isEmpty()], async(req, res) => {
//     try {
//         const { changeUserData } = req.body;
//         let user=  await User.findById(req.user.id).select('-password');
//         let errors = validationResult(req);
//         if (!errors.isEmpty()){
//                 return res.status(400).json({ errors: errors.array() });
//             };
//         if(!user) return res.status(404).json('User not found');
//         let userDataToChange = req.params.user_data_to_change.toString();
//         if(user[userDataToChange] === changeUserData.toString()){
//             return res.status(401).json('This data already exists');
//         }
//         user[userDataToChange] = changeUserData.toString();
//         await user.save();
//         res.json('Data has been updated');
//     } catch (error) {
//         console.error(error.message);
//             return res.status(500).json("Server error");
//     }
// });
// //****************************************************************************** */
// // here we start to enable users to update their password.
// //First we make check the user request to change password with the actual password that belongs to that user from the database whether it matchs or not(check Actual Password)
// router.put("/check_actual_password", authentication, [check('passwordToCheck', 'Password has to be between 6 to 12 characters').isLength({
//     min: 6,
//     max: 12,
// })], async(req, res)=>{
//     try {
//         let { passwordToCheck } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()){
//                 return res.status(400).json({ errors: errors.array() });
//             };
//         let user = await User.findById(req.user.id);
//         let passwordMatch = await bcrypt.compare( passwordToCheck, user.password);
//         if(!passwordMatch){
//             return res.status(401).json('Password does not match');
//         }
//         res.json('Success');
//     } catch (error) {
//         console.error(error.message);
//             return res.status(500).json("Server error");
//     }
// });
// // then we start to handle the user request to change the password.(Change the user Password).
// router.put("/change_password", authentication, [check('newPassword', 'New Password must be between 6 to 12 characters').isLength({
//     min: 6,
//     max: 12,
// })], async(req,res) => {
//     try {
//         let { newPassword } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()){
//                 return res.status(400).json({ errors: errors.array() });
//             };
//         let user = await User.findById(req.user.id);
//         // we hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(newPassword, salt);
//         user.password = hashedPassword;
//         await user.save();
//         res.json("Congratulation You Change Your Password Successfully");

//     } catch (error) {
//         console.error(error.message);
//             return res.status(500).json("Server error");
//     }
// });

// // search the user by user name
// router.put("/search_by_username", [check('userNameFromSearch', 'Search is empty').not().isEmpty()], async (req, res) => {
//     try {
//         let { userNameFromSearch } = req.body;
//         let errors = validationResult(req);
//         if (!errors.isEmpty()){
//             return res.status(400).json({ errors: errors.array() });
//         };
//         let users = await User.find().select('-password');
//         let findUserByUserName = users.filter((user) => user.userName.toString().toLowerCase().split(" ").join("") === userNameFromSearch.toString().toLowerCase().split(" ").join(""));
//         res.json(findUserByUserName);
    
//     } catch (error) {
//     console.error(error.message);
//         return res.status(500).json("Server error");
    
//     }
// });

// module.exports = router;