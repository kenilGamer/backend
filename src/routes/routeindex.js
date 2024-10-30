const express = require('express');
const router = express.Router();
const User = require('../models/modelUser');
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    const { username, email, password, skills,age, name , bio} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, skills, age, name, bio});
    await user.save();
    res.send('User registered successfully');
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid email');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).send('Invalid password');
    res.send('User logged in successfully');
});
router.get('/', (req, res) => {
    res.render('index');
});
module.exports = router; 
