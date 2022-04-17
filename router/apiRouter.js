var express = require('express');
const multer = require('multer');
var router = express.Router()

// 导入Home控制器
const HomeController = require('../controller/HomeController.js');
// 获取分类数据
router.get('/cate', HomeController.cate);
router.get('/getIndex', HomeController.getIndex);
router.get('/cateDatas', HomeController.cateDatas);


module.exports = router;