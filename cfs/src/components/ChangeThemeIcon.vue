<template>
    <div class="box" @click="changeBigCircle">
        <!-- 主题一 -->
        <div class="outBox box_3">
            <div class="incircle" ref="incircle_1">
                <div class="colorCircle color3"></div>
            </div>
        </div>
        <!-- 主题二 -->
        <div class="outBox box_2">
            <div class="incircle" ref="incircle_2">
                <div class="colorCircle color2"></div>
            </div>
        </div>
        <!-- 主题三 -->
        <div class="outBox box_1">
            <div class="incircle" ref="incircle_3">
                <div class="colorCircle color1"></div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref,onMounted } from 'vue';
//导入主题仓库
import usethemeStore from '../store/modules/theme'
const themeStore = usethemeStore()

//灰球
let incircle_1 = ref()
//白球
let incircle_2 = ref()
//蓝球
let incircle_3 = ref()

//选中主题球色
const changeBigCircle = () => {
    incircle_1.value.style.transform = 'scale(0.8)'
    incircle_2.value.style.transform = 'scale(0.8)'
    incircle_3.value.style.transform = 'scale(0.8)'
    
    switch(themeStore.getdefaultTheme){
        case 1:{
            //白球变大
            incircle_2.value.style.transform = 'scale(1.2)'
            break
        }
        case 2:{
            //蓝球变大
            incircle_3.value.style.transform = 'scale(1.2)'
            break
        }
        case 3:{
            //灰球变大
            incircle_1.value.style.transform = 'scale(1.2)'
            break
        }
    }
}

//初始化球色
const initCircleColor = () => {
    switch(themeStore.getdefaultTheme){
        case 1:{
            incircle_1.value.style.transform = 'scale(1.2)'
            break
        }
        case 2:{
            incircle_2.value.style.transform = 'scale(1.2)'
            break
        }
        case 3:{
            incircle_3.value.style.transform = 'scale(1.2)'
            break
        }
    }
}

onMounted(() => {
    initCircleColor()
})
</script>

<style scoped>
.box{
    width: 100%;
    height: 100%;
}
.outBox{
    float: left;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box_1{
    width: 33.3%;
}
.box_2{
    width: 33.3%;
}
.box_3{
    width: 33.3%;
}
.incircle{
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s;
    transform-origin: 50% 50%;
    transform: scale(0.8);
}
.colorCircle{
    width: 80%;
    height: 80%;
    border-radius: 50%;
}
.color1{
    background-color: var(--theme_3_background);
}
.color2{
    background-color: var(--theme_2_background);
}
.color3{
    background-color: var(--theme_1_background);
}
</style>