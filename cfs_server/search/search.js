const express = require('express');
const router = express.Router();
const connect = require('../sqlconnet')
const jwt = require('jsonwebtoken')
const compileCode = require('../user/tokenCompileCode')
const fs = require('fs')

//搜索文章
router.post('/byTitle',async function(req,res) {
    try {
        let {title,num} = req.body
        let result = await new Promise((res,rej) => {
            connect.query(`select * from article where title like '%${title}%' limit ${parseInt(num)},5`,(err,result) => {
                if(err) return rej({code:0,message:'搜索文章失败'})
                res({code:1,message:'搜索文章成功',data:result})
            })
        }).then(data => {
            return new Promise((res,rej) => {
                connect.query(`select count(*) from article where title like '%${title}%'`,(err,result) => {
                    if(err) return rej({code:0,message:'搜索文章数量失败'})
                    res(Object.assign(data,{count:result[0]['count(*)']}))
                })
            })
        })
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//通过id获取单个文章
router.post('/getArticleById',async function(req,res) {
    let {id} = req.body
    try{
        let result = await new Promise((res,rej) => {
            connect.query(`select * from article where id = ${parseInt(id)}`,(err,result) => {
                if(err) return rej({code:0,message:'查询失败'})
                res({code:1,message:'查询成功',data:result[0]})
            })
        }).then(res => {
            return new Promise((resolve,reject) => {
                connect.query(`select image_src from user where id = ${parseInt(res.data.user_id)}`,(err,result) => {
                    if(err) return reject({code:0,message:'获取图片路径失败'})
                    resolve(Object.assign(res,{image_src:result[0]['image_src']}))
                })
            })
        }).then(res => {
            return new Promise((resolve,reject) => {
                let {image_src,...obj} = res
                if(image_src === '' || image_src === null) return resolve(Object.assign(obj,{image_src:''}))
                fs.readFile(image_src,(err,file) => {
                    if(err) return reject({code:0,message:'图片读取失败'})
                    resolve(Object.assign(obj,{image:file}))
                })
            })
        })
        res.send(result)
    }catch(e){
        res.send(e)
    }
})

//文章id获取评论
router.post('/getComments',async function(req,res) {
    try {
        let {article_id} = req.body
        let result = await new Promise((res,rej) => {
            connect.query(`select commenter_id,comment_content,comment_time,commenter_name from comments where article_id = ${parseInt(article_id)}`,
            (err,result) => {
                if(err) return rej({code:0,message:'获取评论失败'})
                // res({code:1,message:'发布评论成功',data:result})
                res(result)
            })
        }).then(res => {
            return iteratorPromise(res,res.length - 1)
        })
        res.send({code:1,message:'获取评论成功',data:result})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//迭代Promise，循环调用异步回调函数
const iteratorPromise = async (arr,lastarr) => {
    if(lastarr === -1) return Promise.resolve(arr)
    let new_arr = await iteratorPromise(arr,lastarr-1)
    return new Promise((res,rej) => {
        connect.query(`select image_src from user where id = ${new_arr[lastarr].commenter_id}`,(err,result) => {
            let src = result[0]['image_src']
            if(err) return res(new_arr)
            if(src === '' || src === null) return res(new_arr)
            fs.readFile(src,(err,file) => {
                if(err) return res(new_arr)
                new_arr[lastarr].image = file
                res(new_arr)
            })
        })
    })
}

//评论消息id删除评论消息
router.delete('/deleteCommentInfo',async function(req,res) {
    try {
        let {id} = req.body
        let result = await new Promise((res,rej) => {
            connect.query(`delete from comment_info where id = ${parseInt(id)}`,(err,result) => {
                if(err) return rej({code:0,message:'删除评论消息失败'})
                res({code:1,message:'删除评论消息成功'})
            })
        })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

//认可消息id删除认可消息
router.delete('/deleteGiveInfo',async function(req,res) {
    try {
        let {id} = req.body
        let result = await new Promise((res,rej) => {
            connect.query(`delete from give_info where id = ${parseInt(id)}`,(err,result) => {
                if(err) return rej({code:0,message:'删除认可消息失败'})
                res({code:1,message:'删除认可消息成功'})
            })
        })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

//获取最新5篇文章
router.get('/getNewestArticle',async function(req,res) {
    try {
        let result = await new Promise((res,rej) => {
            connect.query(`select * from article order by id desc limit 5`,(err,result) => {
                if(err) return rej({code:0,message:'获取最新五条消息失败'})
                res({code:1,message:'获取最新五条消息成功',data:result})
            })
        })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

//获取最热5篇文章
router.get('/getHotestArticle',async function(req,res) {
    try {
        let result = await new Promise((res,rej) => {
            connect.query(`select * from article order by visited_num desc limit 5`,(err,result) => {
                if(err) return rej({code:0,message:'获取最热5篇文章失败'})
                res({code:1,message:'获取最热5篇文章成功',data:result})
            })
        })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

//增加文章的访问量
router.post('/increaseArticlesVisitedNum',async function(req,res) {
    try {
        let result = await new Promise((res,rej) => {
            let {id} = req.body
            connect.query(`update article set visited_num = visited_num + 1 where id = ${parseInt(id)}`,err => {
                if(err) return rej({code:0,message:'增加文章的访问量失败'})
                res({code:1,message:'增加文章的访问量成功'})
            })
        })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

//获取用户主页信息
router.post('/getUserInfo',async function(req,res) {
    let token
    let userId
    let hasValidToken = false
    if(parseInt(req.body.id) === 0){
        token = req.headers.token
        jwt.verify(token,compileCode,(err,data) => {
            if(err) return
            userId = data.id
            hasValidToken = true
        })
    }else{
        userId = req.body.id
    }

    try {
        let result = await new Promise((res,rej) => {
            connect.query(`select * from user where id = ${userId}`,(err,result) => {
                if(err) return rej({code:0,message:'获取基本信息失败'})
                let {id,password,create_time,...data} = result[0]
                if(data.image_src === null) return res({code:1,message:'获取成功',data:Object.assign(data,{image_src:null})})
                fs.readFile(data.image_src,(err,file) => {
                    if(err) return rej({code:0,message:'获取图片失败'})
                    data.image_src = file
                    res({code:1,message:'获取成功',data})
                })
            })
        }).then(res => {
            return new Promise((resolve,reject) => {
                connect.query(`select article_id_array from collection where user_id = ${userId}`,(err,result) => {
                    if(err) return reject({code:0,message:'获取收藏数组失败'})
                    let arr = JSON.parse(result[0]['article_id_array'])
                    resolve(Object.assign(res,{arr}))
                })
            })
        }).then(res => {
            return new Promise((resolve,reject) => {
                connect.query(`select * from article where find_in_set(id,'${res.arr.join(',')}')`,(err,result) => {
                    if(err) return reject({code:0,message:'获取收藏文章失败'})
                    let {arr,...obj} = res
                    resolve(Object.assign(obj,{collectionArticle:result}))
                })
            })
        }).then(res => {
            return new Promise((resolve,reject) => {
                connect.query(`select * from article where user_id = ${userId}`,(err,result) => {
                    if(err) return reject({code:0,message:'获取发布文章失败'})
                    resolve(Object.assign(res,{article:result}))
                })
            })
        })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;