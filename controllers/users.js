const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// A library to generate Gravatar URLs in Node.js Based on gravatar specs -
const gravatar = require('gravatar');
const authentication = require('../middleware/authentication');

// Here we start the get requests
//Here we define to get a user by id by passing the middleware authentication 
router.get('/', authentication, async (req, res) => {
    try {
        let user =  await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
        
    }
});

// route to get a user by Email
router.get('/user_email/:email', async (req, res) => {
    try {
        let userEmail = req.params.email;
        let user = await (await User.findOne({email: userEmail}).select('-password'));
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
        
    }
});
// route to get a user by ID
router.get('/user_id/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await (await User.findById(userId).select('-password'));
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
        
    }
});
// Here we start the user register request route
router.post('/register', [
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
            //object desturacturing
            let {firstName, lastName, userName, email,password} = req.body;
            let errors = validationResult(req);
            if (!errors.isEmpty()){
                    return res.status(400).json({ errors: errors.array() });
                };
                //
            // here we can access the user avatar from the users email account or the default one specification.
            const avatar = gravatar.url(email, {
                r: "pg",
                d: "mm",
                s: "200"
            });
            let newUser = new User({
                firstName,
                lastName,
                userName,
                email,
                password,
                avatar
            });
            
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            newUser.password = hashedPassword;
            // here we save the new user that created to the database.
            await newUser.save();
            // res.send("user created");
            // here we gonna create the jsonwebtoken
            const payload = {
                user : {
                    id: user._id,
                }
            };
            jwt.sign(payload, config.get('jsonWebTokenSecret'), {expiresIn: 3600}, (err, token) => {
                if(err)throw err;
                res.json({token});
            })

             // here we start checking if the user exist or not and when we take the email we don't need to have password.
            let user = await (await User.findOne({ email })).select('-password');
            if(user){
                return res.status(401).send("User has already existed"); 
            }
            // // here we crosscheck the new registering users username with existed username in our database
            let fetchedUserName  = await (await User.findOne({ userName})).select('-password');
            if(fetchedUserName === userName){
                return res.status(401).send("User name is already has been taken");   
            }

        }catch (error){
            console.error(error.message);
            return res.status(500).send("Server error");
        };
    } 
);
/********************************************************************************************************/
// Here we start the user login route
router.post('/login', [
    check('email', 'Email is empty').isEmail(),
    check('password', 'Password must be between 6 to 12 characters').isLength({
        min: 6,
        max: 12,
    }),
    ],
    async (req, res) => {
        try {
            // The user use the email and password to login
            let { email,password } = req.body;
            let errors = validationResult(req);
            if (!errors.isEmpty()){
                    return res.status(400).json({ errors: errors.array() });
                };
            //
            let user = await User.findOne({ email });
            if(!user){
                return res.status(404).send("User does not exist with this Email address!")
            }
            // here we check the password from our database
            let checkPasswordMatch = await bcrypt.compare(password, user.password);
            if(!checkPasswordMatch){
                return res.status(401).json("Password You Entered do not match!");
            }
            // const salt = await bcrypt.genSalt(10);
            // let hashedPassword = await bcrypt.hash(password, salt);
            // newUser.password = hashedPassword;
            // here we gonna create the jsonwebtoken
            const payload = {
                user : {
                    id: user._id,
                }
            };
            jwt.sign(payload, config.get('jsonWebTokenSecret'), {expiresIn: 3600}, (err, token) => {
                if(err)throw err;
                res.json({token});
            });
        }catch (error){
            console.error(error.message);
            return res.status(500).send("Server error");
        };
    } 
);
//********************************************************************** */
// Here we define the route for changing the user data i.e the firstName, lastName and userName requested by the user
router.put('/change_user_data/:user_data_to_change', authentication, [check('changeUserData', "Input is empty").not().isEmpty()], async(req, res) => {
    try {
        const { changeUserData } = req.body;
        let user=  await User.findById(req.user.id).select('-password');
        let errors = validationResult(req);
        if (!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            };
        if(!user) return res.status(404).json('User not found');
        let userDataToChange = req.params.user_data_to_change.toString();
        if(user[userDataToChange] === changeUserData.toString()){
            return res.status(401).json('This data already exists');
        }
        user[userDataToChange] = changeUserData.toString();
        await user.save();
        res.json('Data has been updated');
    } catch (error) {
        console.error(error.message);
            return res.status(500).json("Server error");
    }
})
module.exports = router;