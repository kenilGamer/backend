const mongoose = require('../data/db');
const postSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idChat: {
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
        maxlength:550,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    skills: {
        type: [String],
        enum: ['HTML', 'CSS', 'JavaScript', 'Node', 'Express', 'React', 'MongoDB','node.js'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
