const mongoose = require("mongoose");

// Create user Schema
let UserSchema = mongoose.Schema({
  firstName:{
    type: String,
    required: true
  }, 
  lastName:{
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

module.exports = UserSchema = mongoose.model("user", UserSchema);
