const mysql = require('mysql')

//连接数据库
const connect = mysql.createConnection({
    //用户名
    user:'root',
    //密码
    password:'123456',
    //主机ip，默认localhost
    host:'localhost',
    //数据库名
    database:'codefragmentsharing'
})

module.exports = connect