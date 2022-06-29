const router = require('express').Router()
const Category = require('../models/Category')
const Post = require('../models/Post')

//Create Post
router.post('/', async (req, res, next) => {
    const newCategory = new Category(req.body);
    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// //Update Post
// router.put('/:id', async (req, res, next) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         if(post.username === req.body.username)
//         {
//             try{
//                 const updatedPost = await Post.findByIdAndUpdate(
//                     req.params.id,
//                     {
//                         $set: req.body,
//                     },
//                     { new: true }
//                 )
//                 res.status(200).json(updatedPost)
//             }
//             catch(err){
//                 res.status(500).json(err);
//             }
//         }
//         else{
//             res.status(401).json("You can update only your post")
//         }
        
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

// //Delete Post
// router.delete('/:id', async (req, res, next) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         if(post.username === req.body.username)
//         {
//             try{
//                 await post.delete();
//                 res.status(200).json("Post has been deleted")
//             }
//             catch(err){
//                 res.status(500).json(err);
//             }
//         }
//         else{
//             res.status(401).json("You can delete only your post")
//         }
        
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

// //GET Post
// router.get('/:id', async (req, res) =>{
//     try{
//         const post = await Post.findById(req.params.id);
//         res.status(200).json(post);
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

//Get All Categories
router.get('/', async (req, res) =>{
    try{
        const cats = await Category.find();
        res.status(200).json(cats);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router