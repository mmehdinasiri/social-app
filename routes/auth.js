const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userSignupValidation } = require('../validation');

const router = express.Router();

router.post('/signup', userSignupValidation, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;