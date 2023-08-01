<template>
    <div :class="themeClass" class="container">
        <div class="main_box" ref="main_box">
            <!-- 顶部导航 -->
            <Navigation @changeTheme="turn"/>
            <!-- 主要内容 -->
            <MainlyContent/>
        </div>
    </div>
</template>

<script setup>
//API导入
//vue API导入
import { reactive, ref, onMounted } from 'vue';
//导入主题仓库
import usethemeStore from '../store/modules/theme'
//引入组件
import Navigation from '../components/Navigation.vue'
import MainlyContent from '../components/MainlyContent.vue'

//使用仓库
//使用主题仓库
const themeStore = usethemeStore()

//定义变量
//定义主题色class变量
let themeClass = reactive([])

//定义函数
//获取主题方案函数
const getTheme = () => {
    //获取主题class
    let t = [...themeStore.getTheme]
    //动态修改class
    themeClass.splice(0,themeClass.length,...t)
}
//修改主题方案函数,用于用户手动修改
const turn = () => {
    //修改主题方案
    themeStore.setTheme()
    getTheme()
}

//设置主题方案class
//传入1至多个数组，分别为每个主题的class数组
themeStore.setThemeClass(['container_1'],['container_2'],['container_3'])


//页面挂载
onMounted(() => {
    main_box.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    //手段-发布页面刷新异常
    setTimeout(() => {
        main_box.value.style.transition = 'all .3s'
    },500)
    //初始化主题
    getTheme()
})

//获取主窗口元素
let main_box = ref()
//屏幕视口调整
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return (ww < wh ? ww : wh) < 0.5 ? 0.5 : (ww < wh ? ww : wh)
}

let timer
//当浏览器窗口大小改变时，自适应主窗口大小
window.onresize = () => {

    //主窗口防抖处理
    if(timer !== null){
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        main_box.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
        clearTimeout(timer)
    },500)

}

</script>

<style>
/* 主题方案一 */
.container_1{
    /* 背景色 */
    background-color: var(--theme_1_background);
    /* 文字颜色 */
    color: var(--theme_1_color);
}

.container_1 > .main_box{
    /* 边框颜色 */
    border-color: var(--theme_1_border);
}

/* 主题方案二 */
.container_2{
    background-color: var(--theme_2_background);
    color: var(--theme_2_color);
}

.container_2 > .main_box{
    border-color: var(--theme_2_border);
}

/* 主题方案三 */
.container_3{
    background-color: var(--theme_3_background);
    color: var(--theme_3_color);
}

.container_3 > .main_box{
    border-color: var(--theme_3_border);
}

.container{
    width: 100vw;
    height: 100vh;
    font-size: 20px;
}

.main_box{
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    border-radius: 10px;
    border-width: 5px;
    border-style: solid;
}

</style>