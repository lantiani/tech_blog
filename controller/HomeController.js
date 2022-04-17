const query = require('../model/blogModel.js')
const HomeController = {};

// 分类接口
HomeController.cate = async (req, res) => {
    const {
        cate_id
    } = req.query;
    console.log(req.query,'query++');
    console.log(req.query);
    const sql = `select t1.*,t2.cate_name from article t1 left join category t2 
    on t1.cate_id = t2.cate_id where t2.cate_id = ${cate_id}`
    const result = await query(sql);
    console.log(result);
    res.json(result || {})
}
// 获取 所有 的分类
HomeController.cateDatas = async (req, res) => {
    const sql = `SELECT * FROM category  `
    const result = await query(sql);
    console.log(result[0]);
    res.json(result || {})
}
HomeController.getIndex = async (req, res) => {
    const {
        page = 1, pagesize = 3
    } = req.query;
    const offset = (page - 1) * pagesize;
    const sql = `SELECT
            t1.*, t2.cate_name,t3.username
        FROM
            article t1
        LEFT JOIN category t2 ON t1.cate_id = t2.cate_id
        left join users t3 on t1.author = t3.id
        where t1.status = 1
        order by t1.id desc
        limit ${offset},${pagesize}`
    let result = await query(sql)
    console.log(result);
    res.json(result)
}

module.exports = HomeController;