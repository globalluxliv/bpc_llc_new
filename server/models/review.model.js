import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    review: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
