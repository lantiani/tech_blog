const express = require('express');
const router = express.Router();
const multer = require('multer')

const blogController = require('../controller/blogController.js')
const enrollController = require('../controller/enrollController.js')
const loginController = require('../controller/loginController.js')
const artlistController = require('../controller/artlistController.js')

router.use(multer({ dest: './upload/' }).array('picture'));
// 主页
router.get('/index',blogController.index);
router.get('/getLogoText',blogController.getLogoText);
// 修改密码
router.post('/updPass',loginController.updPass);
// 修改用户信息
router.post('/updUserInfo',loginController.updUserInfo);
// 分类列表
router.get('/catelist',blogController.catelist);
// 文章列表
router.get('/artlist',blogController.artlist);

router.get('/getArtData',artlistController.getArtData);

router.get('/artlists',artlistController.artlists);
// 分类列表
router.get('/artlist',blogController.artlist);
// 设置主题
router.get('/theme',blogController.theme);

// 注册页
router.get('/register',enrollController.register);
// 注册逻辑
router.post('/registers',enrollController.registers);

// 登录页
router.get('/login',loginController.login);
// 成功登录逻辑
router.get('/entry',loginController.entry);
// 退出登录
router.post('/logOut',loginController.logOut);

// 分类列表获取数据
router.get('/cateData',blogController.cateData);
// 分类列表添加数据
router.get('/addDate',blogController.addDate);
router.post('/addDates',blogController.addDates);
// 系统设置
router.get('/systemCation',blogController.systemCation);
router.post('/systemCations',blogController.systemCations);
// 修改列表数据
router.post('/updCateData',blogController.updCateData);
// 删除列表数据
router.get('/delCateData',blogController.delCateData);

module.exports = router;