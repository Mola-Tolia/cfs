<template>
    <!-- 顶部导航 -->
    <div class="topNavigation">
        <!-- 返回上一次路由路径 -->
        <div class="back mhover back_1" @click="routeBack">
            <svg t="1688983068321" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3106" width="50" height="50"><path d="M512 0C232.128 0 0 232.128 0 512s232.128 512 512 512 512-232.128 512-512-232.128-512-512-512z m75.072 853.312c-6.784 0-6.784 0 0 0-6.784-6.784 0-6.784 0 0 75.136-40.96 136.576-116.032 129.728-197.952-6.848-109.248-109.248-191.168-225.28-191.168v75.136c0 20.48-20.48 27.264-34.112 20.48L204.8 382.272c-20.48-6.784-13.632-27.264 0-34.112l245.76-170.688c13.632-6.784 34.112 0 34.112 20.48V266.24h13.696c177.472 6.848 320.832 150.208 307.2 307.2 0 129.728-88.768 238.912-218.496 279.872z" fill="#FFAB02" p-id="3107"></path></svg>
        </div>
        <!-- 主题变换 -->
        <div class="back mhover back_2" @click="$emit('changeTheme')">
            <div class="changeTheme">
                <ChangeThemeIcon/>
            </div>
        </div>
        <!-- 网站名 -->
        <div class="title" @click="home"><span>CodeFragmentSharing</span></div>
        <!-- 其他导航 -->
        <div class="topRight mhover"><OtherNav/></div>
        <!-- 个人中心 -->
        <div class="topRight mhover topRight_23" @click="personalCenter">
            <svg t="1688991101430" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14395" width="200" height="200"><path d="M518.774154 590.336c203.894154 0 384.551385 104.920615 438.508308 254.857846l1.496615 4.489846v54.744616A79.163077 79.163077 0 0 1 879.340308 984.615385H158.995692A80.305231 80.305231 0 0 1 78.769231 904.428308v-54.744616l1.496615-4.489846c53.956923-149.937231 234.614154-254.857846 438.508308-254.857846zM519.561846 39.384615a251.864615 251.864615 0 1 1 0 503.729231 251.864615 251.864615 0 0 1 0-503.729231z" fill="#3EC9FF" p-id="14396"></path></svg>
        </div>
        <!-- 搜索 -->
        <div class="topRight mhover topRight_23" @click="search">
            <svg t="1688990703558" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10815" width="200" height="200"><path d="M949.76 884.3264a88.68864 88.68864 0 0 1-25.64096 62.67904 87.14752 87.14752 0 0 1-123.76576 0.16896l-164.29568-160.87552a382.4128 382.4128 0 0 1-26.43968 12.6208 382.83776 382.83776 0 0 1-300.032 0 383.38048 383.38048 0 0 1-122.48064-83.39968 391.296 391.296 0 0 1 0-550.36928 384.56832 384.56832 0 0 1 627.55328 123.648 391.00416 391.00416 0 0 1-40.704 376.57088l150.32832 156.56448a88.576 88.576 0 0 1 25.47712 62.39232z m-153.6512-444.04736c0-186.33216-150.41536-337.92-335.30368-337.92s-335.32928 151.6032-335.32928 337.92S275.89632 778.24 460.8 778.24s335.3088-151.64928 335.3088-337.96096z m-503.61344 168.90368a240.45568 240.45568 0 0 1 0-337.73568l34.63168 40.07424a183.46496 183.46496 0 0 0 0 257.50528z" p-id="10816"></path></svg>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import OtherNav from './OtherNav.vue'
import ChangeThemeIcon from './ChangeThemeIcon.vue'
import useUserStore from '../store/modules/user'

let userStore = useUserStore()

let isLogin = ref(0)

onMounted(() => {
    isLogin.value = userStore.getIsLogin
})

const $router = useRouter()
//接收父组件的自定义事件
let $emit = defineEmits(['changeTheme']);

//路由导航：首页
const home = () => {
    $router.push('/home')
}

//路由导航：个人中心
const personalCenter = () => {
    if(isLogin.value){
        $router.push('/personalCenter')
    }else{
        $router.push('/accountEnter')
    }
}

//路由导航：搜索
const search = () => {
    $router.push('/search')
}

//路由回退
const routeBack = () => {
    $router.back()
}
</script>

<style scoped>
/* 主题方案一 */
.container_1 > .main_box > .topNavigation{
    border-bottom-color: var(--theme_1_border);
}
.container_1 > .main_box > .topNavigation > .mhover:hover{
    background-color: rgb(255, 255, 255, 0.3);
}
.container_1 > .main_box > .topNavigation > .mhover > .iconFontSize > path{
    /* svg图片颜色 */
    fill: var(--theme_1_color);
}
/* 主题方案二 */
.container_2 > .main_box > .topNavigation{
    border-bottom-color: var(--theme_2_border);
}
.container_2 > .main_box > .topNavigation > .mhover:hover{
    background-color: rgba(255, 255, 255, 0.3);
}
.container_2 > .main_box > .topNavigation > .mhover > .iconFontSize > path{
    fill: var(--theme_2_border);
}
/* 主题方案三 */
.container_3 > .main_box > .topNavigation{
    border-bottom-color: var(--theme_3_border);
}
.container_3 > .main_box > .topNavigation > .mhover:hover{
    background-color: rgb(255, 255, 255, 0.3);
}
.container_3 > .main_box > .topNavigation > .mhover > .iconFontSize > path{
    fill: var(--theme_3_color);
}
.mhover{
    transition: background-color .3s;
}
.topNavigation{
    border-bottom-width: 5px;
    border-bottom-style: solid;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    box-sizing: border-box;
}
.back{
    float: left;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.back_1{
    width: 100px;
}
.back_2{
    width: 120px;
}
@font-face {
    font-family: "title font";
    src: url(../assets/font_2.ttf);
}
.topNavigation > .title{
    height: 100%;
    font-size: 50px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-family: "title font";
}
.topRight{
    float: right;
    width: 100px;
    height: 100%;
}
.topRight_23{
    display: flex;
    justify-content: center;
    align-items: center;
}
/* svg图标大小 */
.iconFontSize{
    width: 40px;
    height: 40px;
}
.changeTheme{
    width: 100%;
    height: 100%;
}
</style>