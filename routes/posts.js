const router = require('express').Router()
const checkLogin = require('../middlewares/checkLogin');
//const User = require('../models/User')
const Post = require('../models/Post')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'datahostbd', 
    api_key: '121831422939177', 
    api_secret: 'C2U2pgJ8_a7mOzk6y2vyN_Fid9w',
  });

//Create Post
router.post('/', checkLogin,  (req, res, next) => {
    const file = req.files.file;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            photo: result.url,
            username: req.body.username,
        });
        try{
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
        catch(err){
            res.status(500).json(err);
        }
    })

})

//Update Post
router.put('/:id', async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            if(req.body.name == null)
            {
                console.log('hemel')
                try{
                    const updatedPost = await Post.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    )
                    res.status(200).json(updatedPost)
                }
                catch(err){
                    res.status(500).json(err);
                }
            }
            else{
                const file = req.files.file;
                cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
                    const body = {
                        title: req.body.title,
                        desc: req.body.desc,
                        photo: result.url,
                        username: req.body.username,
                    }
                    try{
                        const updatedPost = await Post.findByIdAndUpdate(
                            req.params.id,
                            {
                                $set: body,
                            },
                            { new: true }
                        )
                        res.status(200).json(updatedPost)
                    }
                    catch(err){
                        res.status(500).json(err);
                    }
                })
            }
            
            
            
        }
        else{
            res.status(401).json("You can update only your post")
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Delete Post
router.delete('/:id', async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try{
                await post.delete();
                res.status(200).json("Post has been deleted")
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can delete only your post")
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET Post
router.get('/:id', async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get All Posts
router.get('/', checkLogin, async (req, res) =>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username})
        }
        else if(catName){
            posts = await Post.find({categories: {
                $in:[catName]
            }})
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router