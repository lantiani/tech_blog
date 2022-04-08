var mysql = require('mysql');

//连接数据库参数配置
const dbConfig = require('../config/dbConfig.js')

let con = mysql.createConnection(dbConfig);
// 建立链接
con.connect((err) => {
    if (err) throw err;
    console.log('链接成功');
});
function query(sqlStr) {
        return new Promise((resolve, reject) => {
            con.query(sqlStr, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    })
}

module.exports = query;