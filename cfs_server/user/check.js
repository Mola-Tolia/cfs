const connect = require('../sqlconnet')

//注册校验
const registerCheck = (account, email) => {
    return new Promise((resolve,reject) => {
        //校验账号是否存在
        connect.query(`select * from user where account = '${account}'`,(err,result,field) => err === null ? result.length > 0 ? reject({code:0,message:'该账号已存在'}) : resolve() : reject({code:0,message:'数据库操作错误'}))
    }).then(res => {
        return new Promise((resolve,reject) => {
            //校验邮箱是否已被注册使用
            connect.query(`select * from user where email = '${email}'`,(err,result,field) => err === null ? result.length > 0 ? reject({code:0,message:'该邮箱已被使用'}) : resolve() : reject({code:0,message:'数据库操作错误'}))
        })
    }).then(res => '校验通过').catch(err => Promise.reject(err))
}

module.exports = registerCheck