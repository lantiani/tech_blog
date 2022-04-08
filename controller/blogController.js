const path = require('path');
const blogController = {};
const query = require('../model/blogModel');

const pathDir = path.join(path.dirname(__dirname),'views/');
blogController.index = (req,res)=>{
    res.sendFile(`${pathDir}index.html`)
}
blogController.login = (req,res)=>{
    res.sendFile(`${pathDir}login.html`)
}
blogController.upLogin = (req,res)=>{
    res.sendFile(`${pathDir}register.html`)
}
blogController.entry = async (req,res)=>{
    let {name,pass} = req.body;
    console.log(req.body);
    const sql = `select users where username=${name},password=${pass}`;
    console.log(sql);
    const result = await query(sql);
    res.json(result)
}
blogController.register = async (req,res)=>{
    let {name,pass} = req.body;
    const uNameSql = `select username from users`;
    // const sql = `select users where username=${name},password=${pass}`;
    let resName = await query(uNameSql);
    let {username} = resName[0]
    console.log(username);
    console.log(name);
    if(username == name) {
        console.log(1);
        let responseInfo = `<script>
        console.log('成功');
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