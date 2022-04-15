const path = require('path');
const fs = require('fs');
const moment = require('moment');
const artlistController = {};
const query = require('../model/blogModel.js');

// 文章列表
artlistController.getArtData = async (req, res) => {
    const sql = `select * from article`;
    let data = await query(sql)
    res.send({
        data,
        code: '0',
        msg: '获取成功'
    });
}
artlistController.artlists = async (req, res) => {
    // 1. 接收页码和每页显示的条数
    const {
        page,
        limit
    } = req.query;
    // 2. 查询总记录数
    const sql1 = 'select count(id) as count from article'
    const result = await query(sql1);
    const {
        count
    } = result[0];
    // 显示指定的数量
    const offset = (page - 1) * limit;
    const sql2 = `select t1.*,t2.cate_name,t3.username from article t1 
        left join category t2 on t1.cate_id = t2.cate_id 
        left join users t3 on t1.author = t3.id
        limit ${offset},${limit}`;
    let data = await query(sql2)
    data = data.map((item) => {
        const {
            add_date,
            status,
            cate_name,
            username
        } = item;
        item.statusText = status == 1 ? '审核通过' : "审核中"
        item.cate_name = cate_name || '未分类'
        item.username = username || '匿名者'
        item.add_date = moment(add_date).format('YYYY-MM-DD') || '未添加';
        return item;
    })

    // 4. 响应数据
    res.json({
        count,
        data,
        code: 0,
        msg: "sucess"
    })
    // res.send('0');

}
// 文章添加页面
artlistController.addArtlist = async (req, res) => {
    res.render(`addArtlist.html`);
}
// 获取所有分类
artlistController.getCateData = async (req, res) => {
    const sql = `select * from category`;
    let result = await query(sql);
    res.send({
        data: result,
        code: '0',
        msg: '获取成功'
    })
}
// 文章列表添加数据
artlistController.addArtData = async (req, res) => {
    let { id } = req.session.is_exist;
    let { title, cate_id, status, content } = req.body;
    console.log(req.body);
    let sql,add_date;
    let file = req.files[0];
    if (file) {
        let { originalname, filename } = file;
        let fileName = `${Date.now()}${originalname}`
        console.log(fileName);
        add_date = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(add_date);
        fs.renameSync(path.join(`${path.dirname(__dirname)}/upload/${filename}`), path.join(`${path.dirname(__dirname)}/upload/${fileName}`));
        sql = `insert into article(title,content,status,cate_id,add_date,pic,author)
    values('${title}','${content}','${status}','${cate_id}','${add_date}','${fileName}',${id})`;
    } else {
        sql = `insert into article(title,content,status,cate_id,add_date,author)
    values('${title}','${content}','${status}','${cate_id}','${add_date}',${id})`;
    }
    const result = await query(sql);
    let successInfo = {
        code: 0,
        msg: '添加成功',
        data: result
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

module.exports = artlistController;