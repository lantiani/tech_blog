const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const loginController = {};
const query = require('../model/blogModel');
require('dotenv').config();

const pathDir = path.join(path.dirname(__dirname), 'views/');
// 登录页
loginController.login = (req, res) => {
    res.sendFile(`${pathDir}login.html`)
}
// 登陆判断
loginController.entry = async (req, res) => {
    let { name, pass } = req.query;
    pass = md5(`${pass}${process.env.SALT}`);
    const sql = `select * from users where username = '${name}' and password = '${pass}'`;
    let result = await query(sql);
    let successInfo = {
        code: 0,
        msg: '登录成功',
        info: result
    }
    let failInfo = {
        code: 1,
        msg: '用户名或密码错误'
    }
    // 查询数据库是否存在
    if (result.length === 1) {
        let {id} = result[0];
        const userSql = `select * from users where id = ${id}`;
        const result2 = await query(userSql)
        req.session.is_exist = result2[0];
        res.cookie('userInfos', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 3 * 3600000)
        })
        res.send(successInfo);
    } else {
        res.send(failInfo)
    }
}
// 修个个人信息
loginController.updUserInfo = async (req, res) => {
    // session未更新 获取旧图片路径 avatar
    let { id,avatar } = req.session.is_exist;
    let { userIntro,is_num } = req.body;
    let sql, fileName = '';
    let oldPath = path.join(path.dirname(__dirname), `/upload/${avatar}`);
    if (is_num == 1) {
    let file = req.files[0];
    let { originalname, filename } = file;
    fileName = `${Date.now()}${originalname}`
    fs.renameSync(path.join(`${path.dirname(__dirname)}/upload/${filename}`), path.join(`${path.dirname(__dirname)}/upload/${fileName}`));
    sql = `update users set intro='${userIntro}',avatar='${fileName}' where id=${id}`;
    fs.unlink(oldPath,()=>{})
    } else {
        sql = `update users set intro='${userIntro}' where id=${id}`;
    }
    const data = await query(sql);
    let successInfo = {
        avatar:fileName,
        data,
        code: 0,
        msg: '修改成功'
    }
    let sql2 = `select * from users where id=${id}`;
    query(sql2).then(result => {
        //执行完毕 更新session
        req.session.is_exist = result[0];
        successInfo.result = result[0];
        res.json(successInfo);
    })
}
// 修改密码
loginController.updPass = async (req, res) => {
    let {id} = req.session.is_exist;
    let {oldPass,confirmPass} = req.body;
    oldPass = md5(`${oldPass}${process.env.SALT}`);
    confirmPass = md5(`${confirmPass}${process.env.SALT}`);
    let oldPassSql = `select * from users where password='${oldPass}' and id=${id}`;
    let confirmPassSql = `update users set password='${confirmPass}' where id=${id}`;
    let result1 = await query(oldPassSql); 
    // 判断数据库是否存在
    if(result1.length === 1){
        await query(confirmPassSql);
        res.send({
            code:0,
            msg:'修改成功'
        })
    }else {
        res.send({
            code:1,
            msg:'旧密码错误'
        })
    }
}
// 退出登陆
loginController.logOut = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.send('退出')
}
// 获取logo头像
// loginController.getLogoImg = async (req, res) => {
//     const sql = `select pic from settings`;
// }
module.exports = loginController;
 