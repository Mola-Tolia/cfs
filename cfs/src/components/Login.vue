<template>
    <div class="LoginBox">
        <!-- 顶部滑块 -->
        <div class="LoginBox_top">
            <div class="LoginBox_top_inBox">
                <div class="webTitle">CodeFragmentSharing</div>
                <div class="LoginBox_top_common" @click="LoginBox_top_common_left"><span>账号密码登录</span></div>
                <div class="LoginBox_top_common" @click="LoginBox_top_common_right"><span>邮箱验证登录</span></div>
                <div class="slider" ref="slider">
                    <span class="slider_left" ref="slider_left">账号密码登录</span>
                    <span class="slider_right" ref="slider_right">邮箱验证登录</span>
                </div>
            </div>
        </div>
        <!-- 登录区域 -->
        <div class="LoginBox_middle">
            <!-- 账号密码 -->
            <Transition name="wayOfLogining">
                <div class="LoginBox_middle_inBox" v-if="value === 0">
                    <div class="login_info">
                        <input type="text" autoComplete="{'off'}" required v-model="userInfo.username"/>
                        <div class="login_info_underline"></div>
                        <div class="login_info_field">账号</div>
                        <div class="errorTip">{{ errorAccount }}</div>
                    </div>
                    <div class="login_info">
                        <input :type="isView" autoComplete="{'off'}" required v-model="userInfo.password"/>
                        <div class="login_info_underline"></div>
                        <div class="login_info_field">密码</div>
                        <div class="errorTip">{{ errorPassword }}</div>
                        <div class="eye" @click="isView = isView === 'password' ? 'text' : 'password'">
                            <svg v-if="isView === 'text'" t="1690452034730" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2282" width="200" height="200"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z" p-id="2283"></path><path d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" p-id="2284"></path></svg>
                            <svg v-if="isView === 'password'" t="1690452088209" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2423" width="200" height="200"><path d="M955.733333 492.8c-6.4-12.8-162.133333-317.866667-443.733333-317.866667-23.466667 0-46.933333 2.133333-70.4 6.4-17.066667 4.266667-29.866667 19.2-25.6 36.266667 4.266667 17.066667 19.2 29.866667 36.266667 25.6 19.2-4.266667 38.4-4.266667 57.6-4.266667 209.066667 0 345.6 209.066667 379.733333 266.666667-10.666667 19.2-32 53.333333-64 91.733333-10.666667 12.8-8.533333 34.133333 4.266667 44.8 6.4 4.266667 12.8 6.4 21.333333 6.4s19.2-4.266667 25.6-10.666666c51.2-61.866667 78.933333-115.2 78.933333-117.333334 6.4-8.533333 6.4-19.2 0-27.733333zM215.466667 125.866667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l91.733333 91.733333C138.666667 354.133333 72.533333 484.266667 68.266667 490.666667c-4.266667 8.533333-4.266667 19.2 0 29.866666 6.4 12.8 162.133333 315.733333 443.733333 315.733334 83.2 0 164.266667-27.733333 241.066667-81.066667l96 96c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8L215.466667 125.866667z m243.2 334.933333l104.533333 104.533333c-12.8 12.8-32 21.333333-51.2 21.333334-40.533333 0-74.666667-34.133333-74.666667-74.666667 0-19.2 8.533333-38.4 21.333334-51.2zM512 772.266667c-209.066667 0-345.6-209.066667-379.733333-266.666667 21.333333-36.266667 81.066667-130.133333 174.933333-196.266667l104.533333 104.533334c-25.6 25.6-38.4 59.733333-38.4 96 0 76.8 61.866667 138.666667 138.666667 138.666666 36.266667 0 70.4-14.933333 96-38.4l98.133333 98.133334c-61.866667 42.666667-128 64-194.133333 64z" fill="#666666" p-id="2424"></path></svg>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- 邮箱验证码 -->
            <Transition name="wayOfLogining">
                <div class="LoginBox_middle_inBox" v-if="value === 1">
                    <div class="login_info">
                        <input type="text" autoComplete="{'off'}" required v-model="emailCode.email"/>
                        <div class="login_info_underline"></div>
                        <div class="login_info_field">邮箱</div>
                        <div class="errorTip">{{ errorEmail }}</div>
                    </div>
                    <div class="login_info">
                        <input type="text" autoComplete="{'off'}" required v-model="emailCode.identifyingCode"/>
                        <div class="login_info_underline"></div>
                        <div class="login_info_field">验证码</div>
                        <div class="identifying_code" @click="getCode">{{ identifyCode }}</div>
                        <div class="errorTip">{{ errorIdentify }}</div>
                    </div>
                </div>
            </Transition>
        </div>
        <!-- 登录按钮 -->
        <div class="LoginBox_bottom">
            <div class="LoginBox_bottom_inBox">
                <div class="login_btn" @click="login">登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import useUserStore from '../store/modules/user'
import { useRouter } from 'vue-router'
import { sendCode } from '../api/enter'

let userStore = useUserStore()
let $router = useRouter()

let slider = ref()
let slider_left = ref()
let slider_right = ref()

//控制密码可视
let isView = ref('password')

//用于控制用户的登录方式
let value = ref(0)
//账号不存在提示
let errorAccount = ref('')
//密码错误提示
let errorPassword = ref('')
//邮箱不存在提示
let errorEmail = ref('')
//验证码错误提示
let errorIdentify = ref('')

//账号密码
let userInfo = reactive({
    username:'',
    password:''
})

//邮箱验证码
let emailCode = reactive({
    email:'',
    identifyingCode:''
})

//滑块至账号密码的样式修改
const LoginBox_top_common_left = () => {
    slider.value.style.left = '0%'
    slider_left.value.style.left = '50%'
    slider_right.value.style.left = '150%'
    value.value = 0
    userInfo.username = ''
    userInfo.password = ''
}
//滑块至邮箱验证码的样式修改
const LoginBox_top_common_right = () => {
    slider.value.style.left = '50%'
    slider_left.value.style.left = '-50%'
    slider_right.value.style.left = '50%'
    value.value = 1
    emailCode.email = ''
    emailCode.identifyingCode = ''
}

//登录
const login = () => {
    if(value.value === 0){
        loginByPassword()
    }else if(value.value === 1){
        loginByCode()
    }
}
//账号密码登录
const loginByPassword = async () => {
    if(userInfo.username === ''){
        alert('请填写账号')
        return
    }else if(userInfo.password === ''){
        alert('请填写密码')
        return
    }
    try{
        let result = await userStore.requestLogin(userInfo)
        if(result){
            alert('登录成功')
            $router.push('/home')
        }
    }catch(e){
        console.log(e)
        alert('请求出错，请稍后再试')
    }
}
//邮箱验证码登录
const loginByCode = async () => {
    if(emailCode.email === ''){
        alert('请填写邮箱')
        return
    }else if(emailCode.identifyingCode === ''){
        alert('请填写验证码')
        return
    }
    try{
        let result = await userStore.requestLoginByCode(emailCode)
        if(result){
            alert('登录成功')
            $router.push('/home')
        }
    }catch(e){
        console.log(e)
        alert('请求出错，请稍后再试')
    }
}

let identifyCode = ref('获取验证码')
let timer_code = null
//获取验证码
const getCode = async () => {
    if(timer_code !== null) return
    if(emailCode.email === ''){
        alert('请填写邮箱')
        return
    }
    if(!/^([\d,a-z]{6,})@[\d,a-z]{2,}\.([a-z]{2,})$/.test(emailCode.email)){
        alert('请规范邮箱格式')
        return
    }
    let time = 60
    identifyCode.value = time + 's后重发'
    timer_code = setInterval(() => {
        if(time === 0){
            clearInterval(timer_code)
            timer_code = null
            identifyCode.value = '获取验证码'
            return
        }
        identifyCode.value = --time + 's后重发'
    },1000)
    try{
        let result = await sendCode(emailCode.email,0)
        console.log(result);
        if(result.code === 0){
            alert(result.message)
        }
    }catch(e){
        console.log(e)
        alert('验证码发送出错，请稍后重新发送！')
    }
}

</script>

<style scoped>
.webTitle{
    position: absolute;
    width: 300px;
    height: 50px;
    left: calc(50% - 150px);
    top: -50px;
    font-size: 20px;
    text-align: center;
}
.LoginBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: var(--enter_color);
}
.LoginBox_top{
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.LoginBox_top_inBox{
    position: relative;
    width: 80%;
    height: 60%;
}
.LoginBox_middle{
    position: relative;
    flex: 3;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.LoginBox_middle_inBox{
    position: absolute;
    width: 80%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.LoginBox_bottom{
    flex: 1;
    width: 100%;
}
.LoginBox_bottom_inBox{
    width: 100%;
    height: 100%;
    position: relative;
}
.LoginBox_top_common{
    width: 50%;
    height: 100%;
    float: left;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
}
.slider{
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0%;
    background-color: var(--enter_color);
    color: var(--enter_background);
    overflow: hidden;
    transition: all .5s ease-in-out;
    border-radius: 15px;
    cursor: pointer;
    user-select: none;
}
.slider_left{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    white-space: nowrap;
    transition: all .5s ease-in-out;
}
.slider_right{
    position: absolute;
    top: 50%;
    left: 150%;
    transform: translate(-50%,-50%);
    white-space: nowrap;
    transition: all .5s ease-in-out;
}
.login_info{
    position: relative;
    width: 100%;
    height: 40%;
}
.login_info > input{
    position: absolute;
    border: none;
    border-bottom: 1px solid var(--enter_border);
    width: 100%;
    height: 50%;
    top: 30%;
    background-color: rgba(0,0,0,0);
}
.login_info > input:hover ~ .login_info_underline,
.login_info > input:focus ~ .login_info_underline{
    width: 100%;
}
.login_info > input:valid ~ .login_info_field,
.login_info > input:focus ~ .login_info_field{
    top: 0;
    height: 30%;
    font-size: 15px;
}
.login_info > .login_info_field{
    position: absolute;
    height: 50%;
    top: 30%;
    font-size: 25px;
    transition: all .5s;
    user-select: none;
}
.login_info > .login_info_underline{
    position: absolute;
    width: 0%;
    border-bottom: 2px solid var(--enter_border);
    top: calc(80% - 2px);
    left: 50%;
    transform: translateX(-50%);
    transition: all .5s;
}
.login_btn{
    position: relative;
    background-color: var(--enter_color);
    color: var(--enter_background);
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    left: calc(50% - 75px);
    cursor: pointer;
    user-select: none;
}
.login_btn:hover{
    background-color: var(--enter_background_shallow);
}
.identifying_code{
    position: absolute;
    height: 40%;
    width: 100px;
    color: var(--enter_color);
    font-size: 12px;
    right: 0;
    top:35%;
    box-sizing: border-box;
    border: 1px solid var(--enter_border);
    border-radius: 15px;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
    user-select: none;
}
.identifying_code:hover{
    color: var(--enter_background);
    background-color: var(--enter_color);
}
.wayOfLogining-enter-from{
    opacity: 0;
}
.wayOfLogining-enter-active{
    transition: all .3s .2s;
}
.wayOfLogining-enter-to{
    opacity: 1;
}
.wayOfLogining-leave-from{
    opacity: 1;
}
.wayOfLogining-leave-active{
    transition: all .3s;
}
.wayOfLogining-leave-to{
    opacity: 0;
}
.errorTip{
    position: absolute;
    height: 20%;
    top: 80%;
    color: red;
    font-weight: 100;
}
.eye{
    position: absolute;
    width: 50px;
    height: 25px;
    right: 0;
    bottom: 15px;
}
.svg_icon{
    position: absolute;
    height: 25px;
    width: 50px;
    top: 0;
    left: 0;
    background-color: var(--enter_background);
}
.svg_icon > path{
    fill: var(--enter_color);
}
</style>