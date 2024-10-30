const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');

router.post('/',async(req, res) => {
    const { title, content, skills } = req.body;
    const post = new Post({ title, content, skills });
    await post.save();
    res.redirect('/');
});
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('post', { posts });
});

module.exports = router;