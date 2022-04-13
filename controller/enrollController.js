const path = require('path');
const md5 = require('md5');
const enrollController = {};
const query = require('../model/blogModel');

require('dotenv').config();

const pathDir = path.join(path.dirname(__dirname), 'views/');

enrollController.register = (req, res) => {
    res.sendFile(`${pathDir}register.html`)
}

enrollController.registers = async (req, res) => {
    let { name, pass } = req.body;
    pass = md5(`${pass}${process.env.SALT}`);
    console.log(pass);
    // console.log(req.body, 'req'); 
    // 查询数据库是否存在
    // const uPassSql = `SELECT * FROM users WHERE password='${name}'`;

    const uNameSql = `SELECT * FROM users WHERE username='${name}'`;
    const sql = `insert into users(username,password)values('${name}','${pass}')`
    let resName = await query(uNameSql);
    let successInfo = {
        code: 0,
        msg: '注册成功'
    }
    let failInfo = {
        code: 1,
        msg: '该用户名已被占用'
    }
    
    if (resName.length === 1) {
        res.send(failInfo)
    } else {
        let result = await query(sql);
        console.log(result);
        res.send(successInfo);
    }
}

module.exports = enrollController;