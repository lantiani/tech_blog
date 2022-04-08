const express = require('express');
const router = express.Router();

const blogController = require('../controller/blogController.js')

// 主页
router.get('/index',blogController.index);
// 分类列表
router.get('/catelist',blogController.catelist);
// 文章列表
router.get('/artlist',blogController.artlist);
// 登录页
router.get('/login',blogController.login);

router.get('/upLogin',blogController.upLogin);
router.post('/entry',blogController.entry);
// 注册页
router.post('/register',blogController.register);

module.exports = router;