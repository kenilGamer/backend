const mongoose = require('../data/db');

const chatSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    message: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Chat', chatSchema);