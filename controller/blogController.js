const path = require('path');
const blogController = {};
const query = require('../model/blogModel');

const pathDir = path.join(path.dirname(__dirname), 'views/');
blogController.index = (req, res) => {
    res.render('index.html');
}
// 分类列表
blogController.catelist = (req, res) => {
    res.render('catelist.html');
}
// 文章列表
blogController.artlist = (req, res) => {
    res.render('artlist.html');
}

blogController.login = (req, res) => {
    res.sendFile(`${pathDir}login.html`)
}
blogController.register = (req, res) => {
    res.sendFile(`${pathDir}register.html`)
}

blogController.registers = async (req, res) => {
    let { name, pass } = req.body;
    console.log(req.body, 'req');
    // 查询数据库是否存在
    const uNameSql = `SELECT * FROM users WHERE username='${name}' `;
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
        await query(sql);
        res.send(successInfo);
    }
}
blogController.entry = async (req, res) => {
    let { name, pass } = req.query;
    console.log(req.query, 'req');
    const sql = `select * from users where username = '${name}' and password = '${pass}'`;
    let result = await query(sql);
    console.log(result);
    let successInfo = {
        code: 0,
        msg: '登录成功'
    }
    let failInfo = {
        code: 1,
        msg: '用户名或密码错误'
    }
    // 查询数据库是否存在
    if(result.length === 1) {
        res.send(successInfo)
    } else {
        res.send(failInfo)
    }
}
blogController.cateData = async (req, res) => {
    const sql = `select * from category`;
    let result = await query(sql);
    let successInfo = {
        code: 0,
        msg: '注册成功',
        data: result
    }
    res.send(successInfo)
}
// 修改列表数据
blogController.updCateData = async (req, res) => {
    let { cate_name, orderBy } = req.body;
    const sql = `update category set cate_name='${cate_name}',orderBy=${orderBy}`;
    let result = await query(sql);
    let successInfo = {
        code: 0,
        msg: '修改成功',
        data: result
    }
    let failInfo = {
        code: 1,
        msg: '修改失败',
    }
    if (result.affectedRows > 0) {
        res.send(successInfo)
    } else {
        res.send(failInfo)
    }

}
// 删除列表数据
blogController.delCateData = async (req, res) => {
    let { cate_id } = req.query;
    console.log(cate_id);
    const sql = `delete from category where cate_id=${cate_id}`;
    let result = await query(sql);
    let successInfo = {
        code: 0,
        msg: '删除成功',
    }
    let failInfo = {
        code: 1,
        msg: '删除失败',
    }
    if (result.affectedRows > 0) {
        res.send(successInfo)
    } else {
        res.send(failInfo)
    }
}

module.exports = blogController;