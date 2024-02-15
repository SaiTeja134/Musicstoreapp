import mongoose from "mongoose";

// Create a Song Schema
const  songSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        songURL: {
            type: String,
            required: true,
        },
    }, { timestamps: true}
);

export const Song = mongoose.model('Songs',songSchema);