import { defineStore } from "pinia";
import {register,login,loginByCode} from '../../api/enter'

let userStore = defineStore('UserStore',{
    state:() => {
        return{
            isLogin:0
        }
    },
    actions:{
        setIsLogin(){
            this.isLogin = 1
        },
        logout(){
            this.isLogin = 0
        },
        //注册
        async requestRegister(data){
            try{
                let result = await register(data)
                if(result.code === 1){
                    //注册成功
                    return true
                }else{
                    alert(result.message)
                    return false
                }
            }catch(error){
                console.log('请求出错！',error)
                alert('注册失败请稍后再试')
                return false
            }
        },
        //账号密码登录
        async requestLogin(data){
            try {
                let result = await login(data)
                if(result.code === 1){
                    this.isLogin = 1
                    if(result.token !== undefined) localStorage.setItem('token',result.token)
                    return true
                }else{
                    alert(result.message)
                    return false
                }
            } catch (error) {
                console.log('请求出错！',error)
                alert('登录失败请稍后再试')
                return false
            }
        },
        //邮箱验证码登录
        async requestLoginByCode(data){
            try {
                let result = await loginByCode(data)
                if(result.code === 1){
                    this.isLogin = 1
                    if(result.token !== undefined) localStorage.setItem('token',result.token)
                    return true
                }else{
                    alert(result.message)
                    return false
                }
            } catch (error) {
                console.log('请求出错！',error)
                alert('登录失败请稍后再试')
                return false
            }
        }
    },
    getters:{
        getIsLogin(state){
            return state.isLogin
        }
    }
})

export default userStore