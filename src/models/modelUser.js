const mongoose = require('../data/db');
mongoose.connect(process.env.MONGO_URI)
const userSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    name:{
        type: String,
        required: true
    },
   username:{
    type: String,
    minlength: 3,
    required: true,
    unique: true
   },
   email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
    required: true,
    unique: true
   },
   skills: {
    type: [String],
    enum: ['HTML', 'CSS', 'JavaScript', 'Node', 'Express', 'React', 'MongoDB','node.js'],
    required: true
   },
   age: {
    type: Number,
    min: 18,
    max: 65,
    required: true
   },
   password: {
    type: String,
    required: true
   },
   bio: {
    type: String,
    maxlength: 250,
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

module.exports = mongoose.model('User', userSchema);