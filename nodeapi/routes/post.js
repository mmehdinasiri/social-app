
const express = require('express');
const { getPost , createPost , postsByUser , postById, isPoster, deletePost, updatePost, photo, singlePost} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validation');

const router = express.Router();
router.get('/posts', getPost);
router.post(
    '/post/new/:userId',
     requireSignin,
     createPost,
     createPostValidator  
);
router.get("/posts/by/:userId", requireSignin , postsByUser )
router.get("/post/:postId", singlePost );
router.put("/post/:postId", requireSignin , isPoster, updatePost)
router.delete("/post/:postId", requireSignin , isPoster, deletePost)

router.get('/post/photo/:postId', photo );

router.param("userId", userById);
router.param("postId", postById);
module.exports = router;