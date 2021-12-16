const express = require('express');
const { registerUser,loginUser } = require('../controllers/auth');
const router = express.Router();

/*
@desc Register a user
@route POST /api/v1/auth/register
*/
router.route('/register').post(registerUser);

/*
@desc Log in user
@route POST /api/v1/auth/login
*/
router.route('/login').post(loginUser);

module.exports = router;