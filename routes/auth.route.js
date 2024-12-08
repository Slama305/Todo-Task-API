const express = require('express');
const router = express.Router();

const User = require('../controller/user.controller');

router.route('/signup')
    .post(User.signup)

router.route('/login')
    .post(User.login)

router.route('/:id')
    .put(User.updateAcount)
    .delete(User.deleteAcount)

module.exports = router;