<template>
    <div class="record_box">
        <div class="record_box_mainly" ref="record_box_mainly" @wheel="scroll_to_bottom">
            <!-- 每一项记录 -->
            <div class="record_item" v-for="i in record_items" :key="i.id">
                <!-- 文章标题 -->
                <div style="cursor:pointer;" @click="enterArticle(i)">{{ stringSlice(i.title.replace(new RegExp(sign_change,'g'),"\'")) }}</div>
                <!-- 作者名 -->
                <div>作者：{{ i.username }}</div>
                <!-- 延展横条 -->
                <span></span>
                <!-- 删除图标 -->
                <div class="record_item_delete">
                    <!-- <i class="material-icons" @click="record_item_delete(i)">clear</i> -->
                    <svg @click="record_item_delete(i)" t="1689695897331" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3144" width="200" height="200"><path d="M632.917333 572.672l165.290667 165.248a42.624 42.624 0 0 1-60.288 60.288l-165.248-165.290667a42.624 42.624 0 0 1 60.245333-60.245333z m-346.88 225.536a42.624 42.624 0 0 1-60.245333-60.288L451.754667 512 225.792 286.08a42.624 42.624 0 1 1 60.288-60.288L512 451.754667l225.92-225.962667a42.624 42.624 0 1 1 60.288 60.288L286.08 798.208z" fill="#31303D" p-id="3145"></path></svg>
                </div>
            </div>
            <div class="zero_item_tip" v-if="record_items.length === 0">暂无浏览记录</div>
            <!-- 底部留白 -->
            <div class="record_item_blank"></div>
        </div>
        <!-- 底部加载图标 -->
        <div class="record_loading" ref="record_loading">
            <svg t="1689341408593" class="icon loading" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2746" width="200" height="200"><path d="M510.5 958.7c-60.4 0-119-11.8-174.2-35.2-53.3-22.5-101.1-54.8-142.2-95.9s-73.3-88.9-95.9-142.2C74.9 630.2 63 571.6 63 511.2s11.8-119 35.2-174.2c22.5-53.3 54.8-101.1 95.9-142.2S283 121.5 336.3 99c55.2-23.3 113.8-35.2 174.2-35.2 49.3 0 97.8 8 144.1 23.7 26.1 8.9 40.1 37.3 31.2 63.4-7.1 20.8-26.5 33.9-47.3 33.9-5.3 0-10.8-0.9-16.1-2.7-35.9-12.2-73.6-18.4-111.9-18.4-92.8 0-180 36.1-245.7 101.8C199.2 331.1 163 418.4 163 511.2c0 92.8 36.1 180 101.8 245.7 65.6 65.6 152.9 101.8 245.7 101.8s180-36.1 245.7-101.8C821.8 691.3 858 604 858 511.2c0-58.6-14.9-116.6-43-167.6-13.3-24.2-4.6-54.6 19.6-67.9 24.2-13.3 54.6-4.6 67.9 19.6 36.3 65.7 55.4 140.4 55.4 215.9 0 60.4-11.8 119-35.2 174.2-22.5 53.3-54.8 101.1-95.9 142.2-41.1 41.1-88.9 73.3-142.2 95.9-55.1 23.3-113.7 35.2-174.1 35.2z" p-id="2747"></path></svg>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref,onMounted } from 'vue';
import { getRecordingArticle,deleteRecording,addRecording } from '../../api/user'
import { increaseArticlesVisitedNum } from '../../api/search'
import { sign_change } from '../../global'
import { useRouter } from 'vue-router'

let $router = useRouter()

let record_box_mainly = ref()
let record_loading = ref()

//每次7条
let record_items = reactive([])

//记录id数组
let recording_arr = reactive([])

onMounted(() => {
    document.title = 'CFS-记录'
    init()
})

let num = 0

//初始化
const init = async () => {
    try {
        // console.log(num)
        let result = await getRecordingArticle(num)
        num++
        result.data.forEach(i => record_items.push(i))
        recording_arr.splice(0,recording_arr.length)
        JSON.parse(result.arr).forEach(i => recording_arr.push(i))
    } catch (error) {
        console.log(error,"请求失败")
    }
}

//滚动到底部时的操作
let timer
const scroll_to_bottom = () => {
    if(Math.ceil(record_box_mainly.value.scrollTop) + record_box_mainly.value.clientHeight === record_box_mainly.value.scrollHeight){
        clearTimeout(timer)
        record_loading.value.style.bottom = '5px'
        record_loading.value.style.animationPlayState = 'running'
        timer = setTimeout(() => {
            record_loading.value.style.bottom = '-50px'
            record_loading.value.style.animationPlayState = 'paused'
            init()
        },2000)
    }
}

//字符截取
const stringSlice = (str) => {
    if(str.length>30){
        return str.slice(0,30) + '...'
    }else{
        return str
    }
}

//删除单条记录
const record_item_delete = async (item) => {
    record_items.splice(record_items.indexOf(item),1)
    recording_arr.splice(recording_arr.indexOf(item.id),1)
    try {
        let result = await deleteRecording(JSON.stringify(recording_arr))
        console.log(result)
    } catch (error) {
        console.log(error,'请求错误')
    }
}

//跳转至点击文章
const enterArticle = async (item) => {
    $router.push({
        name:'article',
        query:{id:item.id}
    })
    try {
        let result = await addRecording(item.id)
        console.log(result)
        result = await increaseArticlesVisitedNum(item.id)
        console.log(result)
    } catch (error) {
        console.log(error,'请求失败')
    }
}

</script>

<style scoped>
.container_1 .record_box_mainly{
    border-left: 1px solid var(--theme_1_border);
    border-right: 1px solid var(--theme_1_border);
}
.container_2 .record_box_mainly{
    border-left: 1px solid var(--theme_2_border);
    border-right: 1px solid var(--theme_2_border);
}
.container_3 .record_box_mainly{
    border-left: 1px solid var(--theme_3_border);
    border-right: 1px solid var(--theme_3_border);
}
.container_1 .record_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .record_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .record_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.container_1 .svg_icon > path,
.container_1 .loading > path{
    fill: var(--theme_1_color);
}
.container_2 .svg_icon > path,
.container_2 .loading > path{
    fill: var(--theme_2_color);
}
.container_3 .svg_icon > path,
.container_3 .loading > path{
    fill: var(--theme_3_color);
}
.record_box{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.record_box_mainly{
    position: absolute;
    width: 70%;
    height: 100%;
    left: 50%;
    transform: translate(-50%);
    padding: 0 175px;
    overflow-y: auto;
}
.record_box_mainly::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.record_item{
    position: relative;
    width: 100%;
    height: 100px;
    margin-top: 25px;
    background-color: rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
}
.record_item > span{
    position: absolute;
    width: 0%;
    height: 5px;
    bottom: 0;
    background-color: rgba(0,0,0,0.2);
    transition: width .5s;
}
.record_item:nth-of-type(2n + 1) > span{
    left: 0;
}
.record_item:nth-of-type(2n) > span{
    right: 0;
}
.record_item:hover > span{
    width: 100%;
}
.record_item_blank{
    position: relative;
    width: 100%;
    height: 100px;
    background-color: rgba(0,0,0,0);
}
.record_loading{
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: -50px;
    left: calc(50% - 25px);
    animation: loading_rotate 1s ease-out infinite;
    animation-play-state: paused;
    transition: bottom .3s;
}
.loading{
    width: 50px;
    height: 50px;
}
@keyframes loading_rotate {
    0%{
        transform: rotate(0deg);
    }100%{
        transform: rotate(360deg);
    }
}
.record_item_delete{
    position: absolute;
    right: -50px;
}
.record_item_delete > i{
    user-select: none;
    cursor: pointer;
}
.svg_icon{
    width: 40px;
    height: 40px;
    cursor: pointer;
}
.zero_item_tip{
    position: absolute;
    width: 500px;
    height: 100px;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    font-size: 50px;
    line-height: 100px;
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>