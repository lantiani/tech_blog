const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session')
const app = express();
const artTemplate = require('art-template');
const express_template = require('express-art-template');
require('dotenv').config();

// 允许跨域
app.use(cors());
// 获取body中间件
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
const router = require('./router/blogRouter.js');

// 初始化session相关设置
app.use(session({
    name: 'sessionID',
    secret: 'CHCa*8*8ys14',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60000 * 60 // 60分钟内未访问则过期 访问则重置时间
    }
}))


//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));


// 禁止翻墙中间件
app.use((req, res, next) => {
    let searchPath = req.path.toLowerCase();
    // 无需判断路径
    let loginPath = ['/login', '/register', '/entry', '/registers'];
    if (loginPath.includes(searchPath)) {
        next()
    } else {
        // 禁止翻墙
        if (!req.session.is_exist) {
            res.redirect('/login');
            return;
        }
        next();
    }
})
app.use(router);

app.listen(process.env.PORT, () => {
    console.log('running is ok');
});