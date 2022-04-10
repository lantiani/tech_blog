const { render } = require('express/lib/response');
const path = require('path');
const blogController = {};
const query = require('../model/blogModel');
const pathDir = path.join(path.dirname(__dirname), 'views/');

blogController.index = (req, res) => {
    res.render('index.html');
}
blogController.systemCation = (req, res) => {
    res.render('systemCation.html');
}
blogController.systemCations = async (req, res) => {
    let {name} = req.body;
    const sql = `update settings set val='${name}'`;
    const result = await query(sql);
    let successInfo = {
        code:0,
        msg:'添加成功',
        data:result
    }
    let failInfo = {
        code: 1,
        msg: '删除失败',
    }
    if(result.affectedRows > 0) {
        res.send(successInfo)
    } else {
        res.send(failInfo)
    }
}
blogController.theme = async (req, res) => {
    let {id} = req.query;
    const sql = `SELECT * FROM theme WHERE id = ${id}`;
    const result = await query(sql);
    res.send(result)
}

blogController.getLogoText = async (req, res) => {
    const sql = 'select * from settings';
    let result = await query(sql)
    res.send(result);
}

// 分类列表
blogController.catelist = (req, res) => {
    res.render('catelist.html');
}

// 文章列表
blogController.artlist = (req, res) => {
    res.render('artlist.html');
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
blogController.addDate = async (req, res) => {
    res.sendFile(`${pathDir}addDate.html`)
}
blogController.addDates = async (req, res) => {
    let{cate_name,orderBy} = req.body;
    console.log(req.body);
    const sql = `insert into category(cate_name,orderBy)values('${cate_name}','${orderBy}')`;
    const result = await query(sql);
    let successInfo = {
        code:0,
        msg:'添加成功'
    }
    let failInfo = {
        code: 1,
        msg: '删除失败',
    }
    if(result.affectedRows > 0) {
        res.send(successInfo)
    } else {
        res.send(failInfo)
    }
    
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