const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config()

// 允许跨域
app.use(cors())
// 获取body中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
const router = require('./router/blogRouter.js')

app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('running is ok');
})