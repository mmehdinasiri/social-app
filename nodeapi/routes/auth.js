const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById} = require('../controllers/user');
const { userSignupValidation } = require('../validation');

const router = express.Router();

router.post('/signup', userSignupValidation, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// any route containing :userId, out app will first execite userById()
router.param("userId", userById);
module.exports = router;