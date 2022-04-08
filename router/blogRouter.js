const express = require('express');
const router = express.Router();

const blogController = require('../controller/blogController.js')

router.get('/index',blogController.index);
router.get('/login',blogController.login);
router.get('/upLogin',blogController.upLogin);
router.post('/entry',blogController.entry);
router.post('/register',blogController.register);

module.exports = router;