
const express = require('express');
const {getPost , createPost} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validation');

const router = express.Router();

router.get('/', getPost);
router.post('/post', requireSignin, createPostValidator , createPost);

module.exports = router;