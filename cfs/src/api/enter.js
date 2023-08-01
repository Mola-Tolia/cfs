import request from "../request";

//注册
export const register = (data) => request.post('/user/register',data)
//获取验证码
export const sendCode = (email,value) => request.post('/user/identify_code',{email,value})
//账号密码登录
export const login = (data) => request.post('user/login',data)
//邮箱密码登录
export const loginByCode = (data) => request.post('user/loginByCode',data)
//token验证
export const tokenVerify = () => request.get('/user/token')