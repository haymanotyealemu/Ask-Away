const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// A library to generate Gravatar URLs in Node.js Based on gravatar specs -
const gravatar = require('gravatar');

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
                    id: newUser._id,
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
            console.log(error.message);
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
            console.log(error.message);
            return res.status(500).send("Server error");
        };
    } 
);

module.exports = router;