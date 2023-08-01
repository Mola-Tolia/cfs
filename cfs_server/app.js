//express框架搭建服务器
const express = require('express')
//cors解决跨域
const cors = require('cors')
//中间件获取请求体
const bodyparser = require('body-parser')
//user路由
const userRouter = require('./user/user')
//search路由
const searchRouter = require('./search/search')
//引入数据库
const connect = require('./sqlconnet')

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))

//用户路由
app.use('/user',userRouter)
app.use('/search',searchRouter)

app.listen(9000,() => {
    console.log('服务器已启动....')
    connect.connect(err => {
        console.log('数据库连接成功...')
    })
})