const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
// A library to generate Gravatar URLs in Node.js Based on gravatar specs -
const gravatar = require('gravatar');
router.post("/register", [
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
            let newUser = new User({
                firstName,
                lastName,
                userName,
                email,
                password,
                avatar
            });
            // here we can access the user avatar from the users email account or the default one specification.
            const avatar = gravatar.url(email, {
                r: "pg",
                d: "mm",
                s: "200"
            });
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            newUser.password = hashedPassword;
            // here we save the new user that created to the database.
            await newUser.save();
            res.send("user created");

            // here we start checking if the user exist or not and when we take the email we don't need to have password.
            let user = await (await User.findOne({email})).select('-password');
            if(user){
                return res.status(401).send("User has already existed"); 
            }
            // here we crosscheck the new registering users username with existed username in our database
            let fetchedUserName  = await (await User.findOne({ userName})).select('-password');
            if(fetchedUserName === userName){
                return res.status(401).send("User name is already has been taken"); 
            }

        }catch{
            console.log(error.message);
            return res.status(500).send("Server error");
        };
    } 
);
module.exports = router;