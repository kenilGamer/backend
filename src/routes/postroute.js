const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');
const User = require('../models/modelUser');
router.post('/create',async(req, res) => {
    console.log(req.user);
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    const { title, content, skills } = req.body;
    const post = new Post({ title, content, skills });
    console.log(req.user);
    
    post.user = req.user.id;
    try{  
        await User.findByIdAndUpdate(req.user.id, { $push: { idPost: post._id } });
        await post.save();
        res.redirect('/');
    }catch(error){
        res.status(500).send('Error creating post');
        console.log(error);
    }
}); 
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('post', { posts });
});

module.exports = router;