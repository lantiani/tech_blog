const artlistController = {};
const query = require('../model/blogModel');

// 文章列表
artlistController.getArtData = async (req, res) => {
    const sql = `select * from article`;
    let data = await query(sql)
    res.send({
        data,
        code:'0',
        msg:'获取成功'
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
    const result = await query(sql1)
    const {
        count
    } = result[0]
    console.log(count,'count');
    // 3. 根据page和limit获取指定页码的数据
    // a b c d e f g H i j k 每页显示2条
    // 第1页 a b 、 第2页、 c d  ... 3页 e f 、4页 H i   5页 j k
    // 查询起始位置 : （当前页-1）* 每页显示的条数
    // page=1 offset = 0,2
    // page=2 offset = 2,2
    // page=3 offset = 4,2
    // page=4 offset = 6,2
    // page=5 offset = 8,2

    const offset = (page - 1) * limit;
    const sql2 = `select t1.*,t2.cate_name,t3.username from article t1 
        left join category t2 on t1.cate_id = t2.cate_id 
        left join users t3 on t1.author = t3.id
        limit ${offset},${limit}`
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
        // item.add_date = moment(add_date).format('YYYY-mm-dd HH:ii:ss')
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

module.exports = artlistController;