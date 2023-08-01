<template>
    <div class="accountBackground">
        <!-- 注册按钮图标 -->
        <svg @click="toRegister" :class="disappear" ref="registerBtn" t="1689081114517" class="icon toRegister" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55631" width="200" height="200"><path d="M608.256 159.232l124.416-71.168c19.456-11.264 26.624-36.352 15.36-55.808-11.264-19.456-36.352-26.624-55.808-15.36L467.456 145.408c-9.216 5.632-16.384 14.336-18.944 24.576s-1.536 21.504 4.096 31.232l128.512 224.256c7.68 13.312 21.504 20.48 35.328 20.48 6.656 0 13.824-1.536 20.48-5.632 19.456-11.264 26.624-36.352 15.36-55.808l-86.016-150.016c168.96 25.6 298.496 171.52 298.496 347.136 0 193.536-157.696 351.232-351.232 351.232s-351.232-157.696-351.232-351.232c0-22.528-18.432-40.96-40.96-40.96s-40.96 18.432-40.96 40.96c0 238.592 194.048 433.152 433.152 433.152 238.592 0 433.152-194.048 433.152-433.152-0.512-206.336-145.408-379.392-338.432-422.4z" fill="#333333" p-id="55632"></path></svg>
        <!-- 登录按钮图标 -->
        <svg @click="toLogin" :class="disappear_2" ref="loginBtn" t="1689081114517" class="icon toLogin" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55631" width="200" height="200"><path d="M608.256 159.232l124.416-71.168c19.456-11.264 26.624-36.352 15.36-55.808-11.264-19.456-36.352-26.624-55.808-15.36L467.456 145.408c-9.216 5.632-16.384 14.336-18.944 24.576s-1.536 21.504 4.096 31.232l128.512 224.256c7.68 13.312 21.504 20.48 35.328 20.48 6.656 0 13.824-1.536 20.48-5.632 19.456-11.264 26.624-36.352 15.36-55.808l-86.016-150.016c168.96 25.6 298.496 171.52 298.496 347.136 0 193.536-157.696 351.232-351.232 351.232s-351.232-157.696-351.232-351.232c0-22.528-18.432-40.96-40.96-40.96s-40.96 18.432-40.96 40.96c0 238.592 194.048 433.152 433.152 433.152 238.592 0 433.152-194.048 433.152-433.152-0.512-206.336-145.408-379.392-338.432-422.4z" fill="#333333" p-id="55632"></path></svg>
        <div class="accountBox">
            <!-- 登录页 -->
            <div class="login_card accountLayout" :class="rotateLogin" ref="login_card">
                <Login/>
            </div>
            <!-- 注册页 -->
            <div class="register_card accountLayout" :class="rotateRegister" ref="register_card">
                <Register @turn_to_login_page="toLogin"/>
            </div>
        </div>
        <!-- 返回主页图标 -->
        <div class="back_to_home" @click="back_to_home">
            <img class="back_image" src="../assets/back.png"/>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

onMounted(() => {
    document.title = 'CFS-登录'
})

const $router = useRouter()

let login_card = ref()
let register_card = ref()
let registerBtn = ref()
let loginBtn = ref()

//动态控制前往注册按钮样式
let disappear = reactive(['toRegisterHover'])
//动态控制前往登录按钮样式
let disappear_2 = reactive(['disappear_2'])
//动态控制登录页样式
let rotateLogin = reactive([])
//动态控制注册页样式
let rotateRegister = reactive([])

//翻转进入注册页
const toRegister = () => {
    document.title = 'CFS-注册'
    disappear_2.pop()
    disappear.pop()
    rotateLogin.push('login_turn_to_back')
    rotateRegister.push('register_turn_to_face')
    disappear.push('disappear')
    disappear_2.push('toLoginHover')
}

//翻转进入登录页
const toLogin = () => {
    document.title = 'CFS-登录'
    disappear.pop()
    disappear_2.pop()
    rotateLogin.pop()
    rotateRegister.pop()
    disappear_2.push('disappear_2')
    disappear.push('toRegisterHover')
}

//返回主页
const back_to_home = () => {
    $router.push('/')
}
</script>

<style scoped>
.accountBackground{
    width: 100vw;
    height: 100vh;
    background-color: var(--enter_background);
}
.accountBox{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 600px;
    perspective: 1000px;
}
.accountLayout{
    position: absolute;
    width: 100%;
    height: 100%;
    border: 5px solid var(--enter_border);
    transition: transform .5s;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 50px;
    box-sizing: border-box;
    padding: 50px;
    background-color: var(--enter_background);
}
.register_card{
    transform: rotateY(180deg);
}
.toRegister{
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: calc(50% + 250px);
    transform: translate(-50%,-50%) rotateX(60deg) rotate(30deg);
    transition: all .3s;
    z-index: 1;
}
.toRegisterHover:hover{
    transform: translate(-50%,-50%) rotateX(60deg) rotate(10deg);
}
.toRegisterHover:hover ~ .accountBox > .login_card{
    transform: rotateY(-5deg);
}
.toRegister > path,.toLogin > path{
    fill: var(--enter_border);
}
.disappear{
    transform: translate(-50%,-50%) rotateX(60deg) rotate(-60deg);
    opacity: 0;
}
.toLogin{
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: calc(50% - 250px);
    transform: translate(-50%,-50%) rotateX(60deg) rotate(210deg);
    transition: all .3s;
}
.toLoginHover:hover{
    transform: translate(-50%,-50%) rotateX(60deg) rotate(190deg);
}
.toLoginHover:hover ~ .accountBox > .register_card{
    transform: rotateY(5deg);
}
/* 控制页面反转 */
.login_turn_to_back{
    transform: rotateY(-180deg);
}
.register_turn_to_face{
    transform: rotateY(0deg);
}
.disappear_2{
    transform: translate(-50%,-50%) rotateX(60deg) rotate(120deg);
    opacity: 0;
}
.back_to_home{
    position: absolute;
    top: calc(50% - 350px);
    left: calc(50% - 350px);
    width: 100px;
    height: 50px;
    overflow: hidden;
}
.back_image{
    position: absolute;
    width: 35px;
    height: 30px;
    top: calc(100% - 35px);
    left: calc(50%);
    transform: translateY(-60px);
    filter: drop-shadow(0 60px var(--enter_border));
    transform-origin: 50% calc(50% + 60px);
    transition: all .3s;
    user-select: none;
}
.back_to_home:hover > .back_image{
    animation: back_image .2s cubic-bezier(0.1,0,0.9,1) 2;
}
@keyframes back_image {
    0%,50%,100%{
        transform: translateY(-60px) rotate(0deg);
    }25%{
        transform: translateY(-60px) rotate(10deg);
    }75%{
        transform: translateY(-60px) rotate(-10deg);
    }
}
</style>