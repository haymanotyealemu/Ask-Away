const mongoose = require("mongoose");

// Create Post Schema
let PostSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        
    },
    userName: {
        type: String,
    },
    avatar: {
        type: String,
    },

    date: { 
        type: Date,
        default: Date.now()
    },
    postText: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },

            firstName:{
                type: String,
                required: true,
            },
            avatar: {
                type: String
            },
            commentText: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user",
                    },
                },
            ],
        },
    ],
});
const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;


