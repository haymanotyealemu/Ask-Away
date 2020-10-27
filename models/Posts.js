const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      firstName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
        },
      ],
    },
  ],
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
