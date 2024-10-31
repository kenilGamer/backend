const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');
const User = require('../models/modelUser');

// Route to create a new post
router.post('/create', async (req, res) => {
    //check if user is logged in
    if (!req.session.user) {
        return res.status(401).send('You must be logged in to create a post');
    }
    //get the post data
    const { title, content, skills } = req.body;
    //create the post
    const post = new Post({ title, content, skills, userId: req.session.user.id });
    //save the post
    try {
        await post.save();
        // Optionally update the user with the new post ID
        await User.findByIdAndUpdate(req.session.user.id, { $push: { idPost: post._id } });
        // Redirect after creating the post
        return res.redirect('/'); // Use return to prevent further execution
    } catch (error) {
        //handle error
        console.error('Error creating post:', error);
        return res.status(500).send('Error creating post'); // Use return here as well
    }
});

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('post', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
});

module.exports = router;
