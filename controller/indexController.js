const path = require('path');
const md5 = require('md5');
const loginController = {};
const query = require('../model/blogModel');
require('dotenv').config();


loginController.apiData = async (req, res) => {
    let sql = `select count(t1.cate_id) value ,t2.cate_name as name from article 
    t1 LEFT JOIN category t2 on t1.cate_id = t2.cate_id GROUP BY t1.cate_id`;
    let result = await query(sql);
    res.send(result)
}




module.exports = loginController;