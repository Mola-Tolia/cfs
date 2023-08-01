<template>
    <div class="unexist_page">
        <div class="unexist_page_404"><span style="letter-spacing: 50px;">40</span>4</div>
        <div class="unexist_page_tip1">页面不存在，<span class="clickme" @click="back_to_home">点我</span>返回首页</div>
        <div class="unexist_page_tip2">Page is not exist,<span class="clickme" @click="back_to_home">click me</span> to back to home page</div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'

onMounted(() => {
    document.title = 'CFS-404'
})

const $router = useRouter()

const back_to_home = () => $router.push('/home')

</script>

<style scoped>
@font-face {
    font-family: '404_font';
    src: url(../../assets/404_font.ttf);
}
.unexist_page{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-100%);
    width: 400px;
    height: 200px;
    border: 5px double black;
    border-radius: 10px;
    box-sizing: content-box;
}
.unexist_page_404{
    width: 100%;
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-family: '404_font';
    font-size: 100px;
    user-select: none;
    font-weight: bold;
}
.unexist_page_tip1{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    user-select: none;
}
.unexist_page_tip2{
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: small;
    user-select: none;
}
.clickme{
    color: black;
    font-weight: 550;
}
.clickme:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>