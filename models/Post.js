const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  userName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  postText: {
    type: String,
    required: true,
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
      userName: {
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
