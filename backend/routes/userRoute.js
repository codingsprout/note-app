const router = require('express').Router();
const userControl = require('../controllers/userControl');
const auth = require('../middleware/auth');

// Register User
router.post('/register', userControl.registerUser);

//Login User
router.post('/login', userControl.loginUser);

//verify token
router.get('/verify', userControl.verifiedToken);

module.exports = router;
