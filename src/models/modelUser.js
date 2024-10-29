const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kenilk677:KgbYiGyRpp7HS4cB@cluster0.lziadv4.mongodb.net/coder').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});
const userSchema = new mongoose.Schema({
   username:{
    type: String,
    required: true,
    unique: true
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   }
});

module.exports = mongoose.model('User', userSchema);