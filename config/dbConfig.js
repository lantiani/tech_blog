require('dotenv').config()
module.exports = {
    host: process.env.host, //主机
    port: process.env.PORTS, //端口
    user: process.env.USER, //用户名
    password: process.env.PASS, //密码
    database: "tech_blog" //数据库
}