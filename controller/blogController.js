const path = require('path');
const blogController = {};
const query = require('../model/blogModel');

const pathDir = path.join(path.dirname(__dirname),'views/');
blogController.index = (req,res)=>{
    res.render('index.html');
}
// 分类列表
blogController.catelist = (req,res)=>{
    res.render('catelist.html');
}
// 文章列表
blogController.artlist = (req,res)=>{
    res.render('artlist.html');
}

blogController.login = (req,res)=>{
    res.sendFile(`${pathDir}login.html`)
}
blogController.upLogin = (req,res)=>{
    res.sendFile(`${pathDir}register.html`)
}
blogController.entry = async (req,res)=>{
    return false
    let {name,pass} = req.body;
    console.log(req.body);
    const sql = `select users where username=${name},password=${pass}`;
    console.log(sql);
    const result = await query(sql);
    res.json(result)
}
blogController.register = async (req,res)=>{
    let {name} = req.body;
    console.log(req.body,'req');
    const uNameSql = `select username from users`;
    // const sql = `select users where username=${name},password=${pass}`;
    let resName = await query(uNameSql);
    let {username} = resName[0]
    if(username == name) {
        let responseInfo = `<script>
        alert('该用户名被占用');
        location.href = '/upLogin'
        </script>
        `
        res.send(responseInfo)
    } else {
        console.log(2);
    }
    // const result = await query(sql);
    // res.send(responseInfo)
}


module.exports = blogController;