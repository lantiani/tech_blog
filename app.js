const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
require('dotenv').config()

// 允许跨域
app.use(cors())
// 获取body中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
const router = require('./router/blogRouter.js')

//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template); 
//设置视图引擎为上面的html
app.set('view engine', 'html');

app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('running is ok');
})