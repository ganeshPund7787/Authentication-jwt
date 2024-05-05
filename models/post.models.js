import mongoose from "mongoose";

const postSchema = await mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    commends: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    }],
    postBy: {
        type: ObjectId,
        ref: "User"
    }
});

export const Post = new mongoose.model("Post", postSchema); 