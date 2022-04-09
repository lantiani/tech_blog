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
// 注册页
router.get('/register',blogController.register);
// 成功登录逻辑
router.get('/entry',blogController.entry);
// 注册逻辑
router.post('/registers',blogController.registers);
// 分类列表获取数据
router.get('/cateData',blogController.cateData);
// 修改列表数据
router.post('/updCateData',blogController.updCateData);+
// 删除列表数据
router.get('/delCateData',blogController.delCateData);

module.exports = router;