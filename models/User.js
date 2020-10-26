const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create user Schema
let UserSchema = new Schema({
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
    required: true
  },
  email: { 
    type: String, 
    required: true 
  },
  password:{
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

module.exports = User = mongoose.model('user', UserSchema);
