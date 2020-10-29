const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Post Schema
const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    firstName: {
        type: String,
        required: true
    },
    lasttName: {
        type: String,
        
    },
    avatar: {
        type: String
    },
    userName: {
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
                ref: "user"
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            firstName:{
                type: String,
                required: true
            },
            commentText: {
                type: String,
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user"
                    },
                },
            ],
        },
    ],
});

module.exports = Post = mongoose.model('post', PostSchema);

