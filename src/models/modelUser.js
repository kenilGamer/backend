const mongoose = require('../data/db'); // Ensure this imports the correct mongoose instance

const userSchema = new mongoose.Schema({
    posts: [{ // Changed from idPost to posts to indicate multiple posts
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
        required: true,
        unique: true,
    },
    skills: {
        type: [String],
        default: [],
        // enum: ['HTML', 'html', 'CSS', 'css', 'JavaScript', 'javascript', ...], // Uncomment and customize as needed
    },
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 250,
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

// Add a pre-save hook to update the updatedAt field
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update the updatedAt timestamp on save
    next();
});

module.exports = mongoose.model('User', userSchema);
