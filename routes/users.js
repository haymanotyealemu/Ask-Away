const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
router.post("/register", [check('firstName', 'First Name is empty').not().isEmpty(),
    check('lastName', 'Last name is empty').not().isEmpty(),
    check('userName', 'Username is empty').not().isEmpty(),
    check('email', 'Email is empty').isEmail(),
    check('password', 'Password must be between 6 to 12 characters').isLength({
        min: 6,
        max: 12,
    }),],async (req, res) => {
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
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            newUser.password = hashedPassword;
            // here we save the new user that created to the database.
            await newUser.save();
            res.send("user created");
        }catch{
            return res.status(500).send("Server error");
        };
    } 
);
module.exports = router;