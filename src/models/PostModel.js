const mongoose = require('../data/db'); // Ensure this imports the correct mongoose instance

const postSchema = new mongoose.Schema({
    userId: { // Changed id to userId for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Set as required if every post must have a user
    },
    chatId: { // Changed idChat to chatId for consistency and clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    title: {
        type: String,
        maxlength: 100,
        minlength: 3,
        required: true,
    },
    content: {
        type: String,
        minlength: 3,
        maxlength: 550,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    skills: {
        type: [String],
        default: [],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// // Add a pre-save hook to update the updatedAt field
postSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update the updatedAt timestamp on save
    next();
});

module.exports = mongoose.model('Post', postSchema);
