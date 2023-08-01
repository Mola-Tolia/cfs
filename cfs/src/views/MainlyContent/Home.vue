<template>
    <div class="home_box">
        <div class="home_box_mainly">
            <!-- 最新 -->
            <div class="home_box_news" ref="home_box_news">
                <div class="home_box_news_title" @click="news_btn">最新</div>
                <div class="home_box_news_item" v-for="item in homeItems.news" :key="item">
                    <div class="home_box_item_title" @click="enterArticle(item)">{{ sliceContent(item.title,30) }}</div>
                    <div class="home_box_item_content">{{ parseContent(item.content) }}</div>
                </div>
            </div>
            <!-- 热点 -->
            <div class="home_box_hot" ref="home_box_hot">
                <div class="home_box_hot_title" @click="hot_btn">热点</div>
                <div class="home_box_hot_item" v-for="item in homeItems.hot" :key="item">
                    <div class="home_box_item_title" @click="enterArticle(item)">{{ sliceContent(item.title,30) }}</div>
                    <div class="home_box_item_content">{{ parseContent(item.content) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import { addRecording } from '../../api/user'
import { getNewestArticle,getHotestArticle,increaseArticlesVisitedNum } from '../../api/search'
import { useRouter } from 'vue-router'

let $router = useRouter()

let home_box_news = ref()
let home_box_hot = ref()

let homeItems = reactive({
    news:[],
    hot:[]
})

//记录最新最热栏状态
let state = ref( sessionStorage.getItem('state') !== null ? Number(sessionStorage.getItem('state')) : 1)

//初始化
const init = async () => {
    try {
        let result = await getNewestArticle()
        result = result.data
        result.sort((a,b) => {
            return new Date(b.create_time) - new Date(a.create_time)
        })
        homeItems.news = result
        result = await getHotestArticle()
        result = result.data
        homeItems.hot = result
        state.value ? news_btn() : hot_btn()
    } catch (error) {
        console.log(error,'请求失败')
    }
}

onMounted(() => {
    document.title = 'CFS-首页'
    init()
})

//编译内容
const parseContent = (content) => {
    content = JSON.parse(content.replace(/\r|\n/g,"")).find(i => i[0] === 'text')[1]
    return sliceContent(content,40)
}

//截取内容
const sliceContent = (content,length) => {
    if(content.length > length){
        return content.slice(0,length) + '...'
    }
    return content
}

//最新栏
const news_btn = () => {
    home_box_news.value.style.width = 'calc(100% - 155px)'
    home_box_news.value.style.height = homeItems.news.length * 150 + 20 + 'px'
    home_box_hot.value.style.height = '100px'
    state.value = 1
    sessionStorage.setItem('state',state.value)
}
//热点栏
const hot_btn = () => {
    home_box_news.value.style.width = '100px'
    home_box_hot.value.style.height = homeItems.hot.length * 150 + 20 + 'px'
    home_box_news.value.style.height = '100px'
    state.value = 0
    sessionStorage.setItem('state',state.value)
}

//跳转至点击文章
const enterArticle = async (item) => {
    $router.push({
        name:'article',
        query:{id:item.id}
    })
    try {
        let result = await addRecording(item.id)
        // console.log(result)
        result = await increaseArticlesVisitedNum(item.id)
        // console.log(result)
    } catch (error) {
        console.log(error,'请求失败')
    }
}
</script>

<style scoped>
.container_1 .home_box_news,
.container_1 .home_box_hot{
    border-color: var(--theme_1_border);
}
.container_2 .home_box_news,
.container_2 .home_box_hot{
    border-color: var(--theme_2_border);
}
.container_3 .home_box_news,
.container_3 .home_box_hot{
    border-color: var(--theme_3_border);
}
.container_1 .home_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .home_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .home_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.home_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.home_box_mainly{
    position: relative;
    left: 15%;
    width: 70%;
    height: 100%;
    overflow-y: auto;
}
.home_box_mainly::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.home_box_news{
    position: relative;
    float: left;
    width: calc(100% - 155px);
    min-height: 100px;
    margin: 20px 50px 20px 0;
    border-width: 3px;
    border-style: solid;
    border-radius: 10px;
    transition: width .5s,height .5s;
    overflow: hidden;
}
.home_box_hot{
    position: relative;
    overflow: hidden;
    min-height: 100px;
    margin: 20px 5px 20px 0;
    border-width: 3px;
    border-style: solid;
    border-radius: 10px;
    transition: width .5s,height .5s;
}
.home_box_news_title,
.home_box_hot_title{
    position: absolute;
    top: 20px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 30px;
    user-select: none;
    cursor: pointer;
    z-index: 2;
}
.home_box_news_title{
    left: 50px;
    transform: translateX(-50%);
}
.home_box_hot_title{
    right: 45px;
    transform: translateX(50%);
}
.home_box_news_item{
    position: relative;
    width: 800px;
    height: 100px;
    margin-left: 150px;
    margin-top: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.home_box_item_title{
    height: 50%;
    line-height: 50px;
    font-size: 30px;
    font-weight: bolder;
}
.home_box_item_title:hover{
    cursor: pointer;
    text-decoration: underline;
}
.home_box_item_content{
    height: 50%;
    line-height: 50px;
}
.home_box_hot_item{
    position: relative;
    width: 800px;
    height: 100px;
    float: right;
    margin-right: 150px;
    margin-top: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>