const express = require('express');
const router = express.Router();
const connect = require('../sqlconnet')
const registerCheck = require('./check')
const sendEmail = require('./sendEmail')
const jwt = require('jsonwebtoken')
const compileCode = require('./tokenCompileCode')
const multer  = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    // 设置上传文件存储目录
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../upload_images')) 
    },
    //保存在 uploads 中的文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

//注册
router.post('/register',async function(req, res) {

    let {account,username,password,email,create_time,identifyingCode} = req.body

    //校验验证码是否正确
    try {
        let result = await new Promise((res,rej) => {
            connect.query('select code from email_staging where email =?',[email],(error,result) => {
                //查询是否成功
                if(error){
                    rej('查询错误')
                }else{
                    res(result)
                }
            })
        })
        //未获取验证码就提交表单
        if(result.length === 0){
            res.send({code:0,message:'请先获取验证码'})
            return
        }
        //判断提交的验证码与最后一次获取的验证码是否一致
        if(result[result.length - 1].code !== identifyingCode){
            throw new Error('验证码错误')
        }
    } catch (error) {
        console.log(error)
        res.send({code:0,message:'验证码错误'})
        return
    }
    
    //校验注册的账号、邮箱
    try{
        let result = await registerCheck(account,email)
        //执行mysql语句，插入新的用户数据
        connect.query(`INSERT INTO user ( account, username, password, email, create_time )
        VALUES('${account}','${username}','${password}','${email}','${create_time}')`,(err,result) => {
            if(err) return res.send({code:0,message:'数据库操作错误'})
            connect.query(`insert into approved ( user_id, article_id_array ) values(${parseInt(result.insertId)},'[]')`,(err,result) => {
                if(err) return console.log('出错')
            })
            connect.query(`insert into collection ( user_id, article_id_array ) values(${parseInt(result.insertId)},'[]')`,(err,result) => {
                if(err) return console.log('出错')
            })
            connect.query(`insert into recording ( user_id, article_id_array ) values(${parseInt(result.insertId)},'[]')`,(err,result) => {
                if(err) return console.log('出错')
            })
            res.send({code:1,message:'注册成功',data:result})
        })
        
    }catch(error){
        res.send(error)
    }

});

//token校验
router.get('/token',function(req,res) {
    let { headers: { token } } = req

    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        hasValidToken = true
    })
    if(hasValidToken){
        res.send({code:1,message:'登录成功'})
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//账号密码登录
router.post('/login',async function(req,res) {
    let {username,password} = req.body
    //登录校验
    try{
        let result = await new Promise((res,rej) => {
            connect.query(`select * from user where account = '${username}'`,(err,result) => {
                if(err){
                    console.log('查询出错')
                    rej({code:0,message:'登录出错，请稍后再试'})
                }else if(result.length === 0){
                    console.log('该账号还未注册')
                    rej({code:0,message:'该账号还未注册'})
                }else if(result[0].password !== password){
                    console.log('密码错误')
                    rej({code:0,message:'密码错误'})
                }else{
                    res(result[0])
                }
            })
        })
        let {id,account,email,create_time} = result
        let username_s = result.username
        let token = jwt.sign({id,account,email,create_time,username:username_s},compileCode,{expiresIn:60*60*24})
        res.send({code:1,message:'登录成功',token})
    }catch(e){
        res.send(e)
    }

})

//邮箱验证码登录
router.post ('/loginByCode',async (req,res) => {
    let email = req.body.email
    let code = req.body.identifyingCode
    let isUpdate = req.body.isUpdate

    try{
        let result = await new Promise((res,rej) => {
            connect.query('select code from email_staging where email =?',[email],(error,result) => {
                //查询是否成功
                if(error){
                    rej('查询错误')
                }else{
                    res(result)
                }
            })
        })
        //未获取验证码就提交表单
        if(result.length === 0){
            res.send({code:0,message:'请先获取验证码'})
            return
        }
        //判断提交的验证码与最后一次获取的验证码是否一致
        if(result[result.length - 1].code !== code){
            throw new Error('验证码错误')
        }
        if(isUpdate){
            let { headers: { token } } = req
            let userId
            jwt.verify(token,compileCode,(err,data) => {
                if(err) return
                userId = data.id
            })
            connect.query(`update user set email = '${email}' where id = ${userId}`,(err,result) => {
                if(err){
                    res.send({code:0,message:'修改失败'})
                    return
                }
                res.send({code:1,message:'修改成功'})
            })
            return
        }
        connect.query('select * from user where email =?',[email],(error,result) => {
            if(error) return res.send({code:0,message:'获取token失败'})
            let {id,account,email,create_time,username} = result[0]
            let token = jwt.sign({id,account,email,create_time,username},compileCode,{expiresIn:60*60*24})
            res.send({code:1,message:'登录成功',token})
        })
    }catch(e){
        console.log(e)
        res.send({code:0,message:'验证码错误'})
    }
})

//邮箱获取验证码
router.post('/identify_code',function(req,res) {
    let {email,value} = req.body

    connect.query("select * from user where email =?", [email], async (error, result) => {
        //判断查询是否成功
        if(error) return
        //校验邮箱是否已被注册
        if(result.length > 0 && parseInt(value) === 1){
            res.send({code:0,message:'该邮箱已被注册'})
            return
        }
        //邮箱登录时判断是否有该邮箱
        if(result.length === 0 && parseInt(value) === 0){
            res.send({code:0,message:'该邮箱还未注册'})
            return
        }
        //发送验证码
        try{
            let result = await sendEmail(email)
            res.send({code:1,message:result})
        }catch(error){
            res.send({code:0,message:error})
        }
    });
})

//获取用户基本信息
router.get('/getInfo',async function(req,res) {
    let { headers: { token } } = req

    let userId

    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        
        let userInfo = null

        try {
            let result = await new Promise((res,rej) => {
                connect.query('select * from user where id =?',[userId],(err,result) => {
                    if(err) return rej()
                    let {account,username,email,gender,create_time,profile,birthday,skill,image_src} = result[0]
                    res({account,username,email,gender,create_time,profile,birthday,skill,image_src})
                })
            }).then(info => {
                return new Promise((res,rej) => {
                    connect.query('select count(*),sum(approved_num),sum(visited_num),sum(commented_num) from article where user_id =?',[userId],(err,result) => {
                        if(err) return
                        let approved_sum = result[0]['sum(approved_num)'] || 0
                        let visited_sum = result[0]['sum(visited_num)'] || 0
                        let commented_sum = result[0]['sum(commented_num)'] || 0
                        let articles_num = result[0]['count(*)'] || 0
                        res(Object.assign(info,{approved_sum,visited_sum,commented_sum,articles_num}))
                    })
                })
            })
            res.send({code:1,message:'登录成功',data:result})
        } catch (error) {
            console.log(error,'查询失败')
            res.send({code:0,message:'查询失败'})
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//修改用户信息
router.post('/updateUserInfo',async function(req,res) {
    let { headers: { token } } = req
    let { key, value} = req.body
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){

        try {
            let result = await new Promise((res,rej) => {
                connect.query(`update user set ${key} = '${value}' where id = ${userId}`,(err,result) => {
                    if(err) return rej()
                    res()
                })
            })
            res.send({code:1,message:'修改成功'})
        } catch (error) {
            res.send({code:0,message:'修改失败'})
        }

        return
    }
    res.send({code:0,message:'token校验失败'})
})

//文章的发布与暂存
router.post('/publishArticle',async function(req,res){
    let { headers: { token } } = req
    let userId,username
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        username = data.username
        hasValidToken = true
    })
    let { data, isPublish} = req.body
    //若data为空字符串则为获取暂存文章
    if(data === ''){
        if(hasValidToken){
            try {
                let result = await new Promise((res,rej) => {
                    connect.query(`select * from article where user_id = ${userId} and is_publish = 0`,(err,result) => {
                        if(err) return rej({code:0,message:'获取暂存文章失败'})
                        res({code:1,message:'获取暂存文章成功',data:result[0]})
                    })
                })
                res.send(result)
            } catch (error) {
                console.log(error)
                res.send(error)
            }
            return
        }
        res.send({code:0,message:'token校验失败'})
        return
    }
    let {title,content,label} = JSON.parse(data)
    content = JSON.stringify(content)
    label = JSON.stringify(label)
    let date = new Date()
    let create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + 
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    //暂存文章
    if(hasValidToken&&parseInt(isPublish) === 0){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`delete from article where user_id = '${userId}' and is_publish = 0`,(err,result) => {
                    if(err) return rej({code:0,message:'暂存失败_删除'})
                    res()
                })
            }).then(res => {
                return new Promise((res,rej) => {
                    connect.query(`INSERT INTO article ( user_id, title, content, label, create_time, is_publish, username )
                    VALUES('${userId}','${title}','${content}','${label}','${create_time}',${parseInt(isPublish)},'${username}')`,(err,result) => {
                        if(err) return rej({code:0,message:'暂存失败_插入'})
                        res({code:1,message:'文章暂存成功'})
                    })
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    //发布文章
    if(hasValidToken&&parseInt(isPublish) === 1){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select * from article where user_id = '${userId}' and is_publish = 0`,(err,result) => {
                    if(err) return rej({code:0,message:'发布失败_查找暂存'})
                    if(result.length === 0) return res(0)
                    res(1)
                })
            }).then(res => {
                if(res === 0){
                    return new Promise((res,rej) => {
                        connect.query(`INSERT INTO article ( user_id, title, content, label, create_time, is_publish, username )
                        VALUES('${userId}','${title}','${content}','${label}','${create_time}',${parseInt(isPublish)},'${username}')`,(err,result) => {
                            if(err) return rej({code:0,message:'发布失败_插入'})
                            res({code:1,message:'发布成功_插入'})
                        })
                    })
                }else{
                    return new Promise((res,rej) => {
                        connect.query(`UPDATE article set title =?,content =?,label =?,create_time =?,is_publish =? 
                            where user_id =? and is_publish = 0`,
                            [title,content,label,create_time,isPublish,userId],(err,result) => {
                            if(err) return rej({code:0,message:'发布失败_更新'})
                            res({code:1,message:'发布成功_更新'})
                        })
                    })
                }
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取用户所有文章
router.get('/getAllArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select * from article where user_id = ${userId} and is_publish = 1`,(err,result) => {
                    if(err) return rej({code:0,message:'获取用户文章失败'})
                    result.forEach(i => Object.assign(i,{user_id:0}))
                    res({code:1,message:'用户文章获取成功',data:result})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//通过id获取文章
router.post('/getArticleById',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {id} = req.body
            let result = await new Promise((res,rej) => {
                connect.query(`select * from article where id = ${id}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取用户文章失败'})
                    result.forEach(i => Object.assign(i,{user_id:0}))
                    res({code:1,message:'用户文章获取成功',data:result[0]})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//通过id修改文章
router.patch('/updateArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let { data } = req.body
            let {title,content,label,id} = JSON.parse(data)
            content = JSON.stringify(content)
            label = JSON.stringify(label)
            let date = new Date()
            let create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + 
                date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            let result = await new Promise((res,rej) => {
                connect.query(`update article set title = '${title}',content = '${content}',label = '${label}',create_time = '${create_time}' 
                where id = ${parseInt(id)}`,
                (err,result) => {
                    if(err) return rej({code:0,message:'修改用户文章失败'})
                    res({code:1,message:'用户文章修改成功'})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//通过id删除文章 deleteArticle
router.delete('/deleteArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {id} = req.body
            let result = await new Promise((res,rej) => {
                connect.query(`delete from article where id = ${parseInt(id)}`,(err,result) => {
                    if(err) return rej({code:0,message:'删除用户文章失败'})
                    res({code:1,message:'用户文章删除成功'})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取点赞数组
router.get('/getApproved',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select article_id_array from approved where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取点赞数据失败'})
                    res({code:1,message:'获取点赞数据成功',data:result[0]['article_id_array']})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取收藏数组
router.get('/getCollection',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select article_id_array from collection where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取收藏数据失败'})
                    res({code:1,message:'获取收藏数据成功',data:result[0]['article_id_array']})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//给文章点赞或取消
router.post('/approveArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {array,article_id,value} = req.body
            let result = await new Promise((res,rej) => {
                connect.query(`update approved set article_id_array = '${array}' where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'点赞失败'})
                    res({code:1,message:'点赞成功',data:result})
                })
            }).then(res => {
                return new Promise((resolve,reject) => {
                    if(parseInt(value) === 1){
                        connect.query(`update article set approved_num = approved_num + 1 where id = ${parseInt(article_id)}`,(err,result) => {
                            if(err) return reject({code:0,message:'点赞数增加失败'})
                            resolve(res)
                        })
                    }else{
                        connect.query(`update article set approved_num = approved_num - 1 where id = ${parseInt(article_id)}`,(err,result) => {
                            if(err) return reject({code:0,message:'点赞数减少失败'})
                            resolve(res)
                        })
                    }
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//给文章收藏或取消
router.post('/collectArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {array,article_id,value} = req.body
            let result = await new Promise((res,rej) => {
                connect.query(`update collection set article_id_array = '${array}' where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'收藏失败'})
                    res({code:1,message:'收藏成功',data:result})
                })
            }).then(res => {
                return new Promise((resolve,reject) => {
                    if(parseInt(value) === 1){
                        connect.query(`update article set collected_num = collected_num + 1 where id = ${parseInt(article_id)}`,(err,result) => {
                            if(err) return reject({code:0,message:'收藏数增加失败'})
                            resolve(res)
                        })
                    }else{
                        connect.query(`update article set collected_num = collected_num - 1 where id = ${parseInt(article_id)}`,(err,result) => {
                            if(err) return reject({code:0,message:'收藏数减少失败'})
                            resolve(res)
                        })
                    }
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//点赞或收藏消息
router.post('/give',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        username = data.username
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {article_userId} = req.body
            let date = new Date()
            let create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + 
                date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            let result = await new Promise((res,rej) => {
                connect.query(`insert into give_info (user_id,giver_id,give_time,giver_name) 
                values(${parseInt(article_userId)},${parseInt(userId)},'${create_time}','${username}')`,(err,result) => {
                    if(err) return rej({code:0,message:'消息失败'})
                    res({code:1,message:'消息成功',data:result})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//发布评论
router.post('/sendComment',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        username = data.username
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {article_id,content,article_userId} = req.body
            let date = new Date()
            let create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + 
                date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            let result = await new Promise((res,rej) => {
                connect.query(`insert into comments (article_id,commenter_id,commenter_name,comment_time,comment_content) 
                values(${parseInt(article_id)},${parseInt(userId)},'${username}','${create_time}','${content}')`,(err,result) => {
                    if(err) return rej({code:0,message:'发布评论失败'})
                    res({code:1,message:'发布评论成功',data:result})
                })
            }).then(res => {
                return new Promise((resolve,reject) => {
                    let date = new Date()
                    let create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + 
                        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                    connect.query(`insert into comment_info (user_id,commenter_id,comment_time,commenter_name) 
                    values(${parseInt(article_userId)},${parseInt(userId)},'${create_time}','${username}')`,err => {
                        if(err) return reject({code:0,message:'评论消息失败'})
                        resolve(res)
                    })
                })
            }).then(res => {
                return new Promise((resolve,reject) => {
                    connect.query(`update article set commented_num = commented_num + 1 where id = ${parseInt(article_id)}`,err => {
                        if(err) return reject({code:0,message:'评论数量增加失败'})
                        resolve(res)
                    })
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取评论消息
router.get('/getCommentInfo',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select id,commenter_name,comment_time from comment_info where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取评论消息失败'})
                    res({code:1,message:'获取评论消息成功',data:result})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取认可消息
router.get('/getAACInfo',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select id,giver_name,give_time from give_info where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取认可消息失败'})
                    res({code:1,message:'获取认可消息成功',data:result})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取用户收藏文章
router.get('/getCollectionArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select article_id_array from collection where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取用户收藏文章失败'})
                    res(result[0]['article_id_array'])
                })
            }).then(res => {
                let id_arr = JSON.parse(res).join(',')
                return new Promise((resolve,reject) => {
                    connect.query(`select * from article where FIND_IN_SET(id,'${id_arr}')`,(err,result) => {
                        if(err) return reject({code:0,message:'获取用户收藏文章失败'})
                        result.forEach(i => i.user_id = 0)
                        resolve({code:1,message:'获取收藏文章成功',data:result})
                    })
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//获取记录数组文章
router.post('/getRecordingArticle',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select article_id_array from recording where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取记录数据失败'})
                    res(result[0]['article_id_array'])
                })
            }).then(res => {
                let id_arr = JSON.parse(res).join(',')
                let { num } = req.body
                return new Promise((resolve,reject) => {
                    connect.query(`select * from article where FIND_IN_SET(id,'${id_arr}') limit ${parseInt(num) * 7},7`,(err,result) => {
                        if(err) return reject({code:0,message:'获取收藏数据失败'})
                        result.forEach(i => i.user_id = 0)
                        resolve({code:1,message:'获取记录数据成功',data:result,arr:res})
                    })
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//删除记录数组
router.post('/deleteRecording',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = data.id
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {array} = req.body
            let result = await new Promise((res,rej) => {
                connect.query(`update recording set article_id_array = '${array}' where user_id = ${parseInt(userId)}`,(err,result) => {
                    if(err) return rej({code:0,message:'删除记录数组失败'})
                    res({code:1,message:'删除记录数组成功'})
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//添加记录数组
router.post('/addRecording',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = parseInt(data.id)
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let {id} = req.body
            id = parseInt(id)
            let result = await new Promise((res,rej) => {
                connect.query(`select article_id_array from recording where user_id = ${userId}`,(err,result) => {
                    if(err) return rej({code:0,message:'查询失败'})
                    res(result[0]['article_id_array'])
                })
            }).then(res => {
                return new Promise((resolve,reject) => {
                    let arr = JSON.parse(res)
                    if(arr.indexOf(id) !== -1) arr.splice(arr.indexOf(id),1)
                    arr.push(id)
                    connect.query(`update recording set article_id_array = '${JSON.stringify(arr)}' where user_id = ${userId}`,
                    err => {
                        if(err) return reject({code:0,message:'写入记录失败'})
                        resolve({code:1,message:'写入记录成功'})
                    })
                })
            })
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//上传图片
router.post('/uploadImage',upload.array('file'),async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = parseInt(data.id)
        hasValidToken = true
    })
    if(hasValidToken){
        let src = req.files[0].path.replace(/\\/g,'\\\\')
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`update user set image_src = '${src}' where id = ${userId}`,
                err => {
                    if(err) return rej({code:0,message:'上传失败'})
                    res({code:1,message:'上传成功'})
                })
            })
            res.send(result)
        } catch (error) {
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})

//返回图片
router.get('/getImage',async function(req,res) {
    let { headers: { token } } = req
    let userId
    let hasValidToken = false
    jwt.verify(token,compileCode,(err,data) => {
        if(err) return
        userId = parseInt(data.id)
        hasValidToken = true
    })
    if(hasValidToken){
        try {
            let result = await new Promise((res,rej) => {
                connect.query(`select image_src from user where id = ${userId}`,(err,result) => {
                    if(err) return rej({code:0,message:'获取图片路径失败'})
                    res(result[0]['image_src'])
                })
            }).then(src => {
                return new Promise((resolve,reject) => {
                    if(src === '' || src === null) return resolve({code:1,message:'获取图片成功',image:''})
                    fs.readFile(src,(err,file) => {
                        if(err) return reject({code:0,message:'图片读取失败'})
                        resolve({code:1,message:'获取图片成功',image:file})
                    })
                })
            })
            res.send(result)
        } catch (error) {
            res.send(error)
        }
        return
    }
    res.send({code:0,message:'token校验失败'})
})
module.exports = router;