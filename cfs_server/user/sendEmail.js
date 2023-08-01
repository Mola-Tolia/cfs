const connect = require('../sqlconnet')

//引入nodemailer，用于发送邮件的包
const nodemailer = require('nodemailer')

const sendEmail = (email) => {

    let transporter = nodemailer.createTransport({
        // 选择邮箱类型
        service: "qq",
        //是否使用对https协议的安全连接
        secure: true,
        // port: 465, //qq邮件服务所占用的端口
        auth: {
            //发件人
            user: "1394727616@qq.com",
            //qq授权码，授权码在qq邮箱中可以生成
            pass: "dexvthtthgzvggaa",
        }
    });

    //生成随机验证码
    let code = "";
    for (var i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }

    // console.log(email,code)
    return new Promise((resolve,reject) => {
        //发送邮件
        transporter.sendMail({
            //发送方
            from: "1394727616@qq.com",
            //接收方
            to: email,
            //邮件主题
            subject: "激活验证码",
            //邮件正文
            text: "验证码为：" + code + ' 请尽快填写验证码以防失效！',
        }, (error, info) => {
            //判断邮箱发送是否成功
            // error === null ? resolve() : reject('邮件发送出错')
            if(error){
                console.log(error)
                return reject('邮件发送出错')
            }
            resolve()
        });
    }).then(res => {
        return new Promise((resolve,reject) => {
            //将邮箱与发送的验证码临时存入临时存储表中
            connect.query("INSERT INTO email_staging ( email, code )VALUES( ? , ?)", [email,code], (error, result) => {
                error !==null || result.affectedRows !== 1 ? reject('数据库保存验证码错误') : resolve()
            });
        })
    }).then(res => {
        //55秒后删除先前存入的邮箱及验证码，即验证码失效
        setTimeout(() => {
            connect.query("DELETE FROM email_staging where email =?", [email],(error,result) => {
                if(error) {
                    console.log('临时邮箱删除失败')
                    return
                }
                if(result.affectedRows >= 1){
                    console.log('临时邮箱删除失败')
                    return
                }
                console.log('临时邮箱删除成功')
            });
        },55000)
        return '验证码发送成功'
    }).catch(error => {
        console.log(error)
        return Promise.reject('验证码发送错误')
    })
    
}

module.exports = sendEmail