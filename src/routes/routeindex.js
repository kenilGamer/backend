const express = require('express');
const router = express.Router();
const User = require('../models/modelUser');
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, email, password, skills, age, name, bio } = req.body;
    console.log(password);
    if (!password) return res.status(400).send('Password is required');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, skills, age, name, bio });
    try {
        await user.save();
        res.send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
        console.log(error);
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required');
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
