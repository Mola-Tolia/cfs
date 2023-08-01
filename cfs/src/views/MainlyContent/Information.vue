<template>
    <div class="information_box">
        <div class="information_box_mainly">
            <div class="information_left">
                <div class="information_left_nav" @click="information_comment">评论</div>
                <div class="information_left_nav" @click="information_aac">收藏与点赞</div>
            </div>
            <div class="information_right">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import { onMounted } from 'vue';

const $router = useRouter()

onMounted(() => {
    document.title = 'CFS-消息'
    $router.push('/information_comment')
})

//路由导航：消息 - 评论
const information_comment = () => {
    $router.push('/information_comment')
}

//路由导航：消息 - 点赞和收藏
const information_aac = () => {
    $router.push('/information_aac')
}

</script>

<style scoped>
.container_1 .information_right,
.container_1 .information_left_nav{
    border-color: var(--theme_1_border);
}
.container_2 .information_right,
.container_2 .information_left_nav{
    border-color: var(--theme_2_border);
}
.container_3 .information_right,
.container_3 .information_left_nav{
    border-color: var(--theme_3_border);
}
.container_1 .information_right::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .information_right::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .information_right::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.information_right::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.information_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.information_box_mainly{
    position: relative;
    width: 70%;
    height: 100%;
    left: 15%;
}
.information_left{
    float: left;
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}
.information_right{
    overflow: hidden;
    height: 96%;
    top: 2%;
    position: relative;
    border-radius: 10px;
    border-width: 3px;
    border-style: solid;
}
.information_left_nav{
    width: 200px;
    height: 40px;
    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    text-align: center;
    line-height: 40px;
    margin-top: 50px;
    user-select: none;
    cursor: pointer;
}
.information_left_nav:hover{
    background-color: rgba(255,255,255,0.1);
}
.fade-enter-from,
.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
    transition: all .5s;
}
.fade-enter-to,
.fade-leave-from{
    opacity: 1;
}
</style>