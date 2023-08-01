<template>
    <div class="collection_box">
        <div class="collection_box_mainly">
            <!-- 动画 -->
            <TransitionGroup name="list" tag="ul">
                <!-- 每一项收藏记录 -->
                <div class="collection_item" v-for="i in collectionItems" :key="i" @mouseenter="enter_collection_item" @mouseleave="leave_collection_item">
                    <!-- 标题 -->
                    <div style="cursor:pointer;" @click="enterArticle(i)">{{ i.title.replace(new RegExp(sign_change,'g'),"\'") }}</div>
                    <!-- 部分内容 -->
                    <div>{{ sliceTitle(parseContent(i.content).replace(new RegExp(sign_change,'g'),"\'").replace(new RegExp(warp_change,'g'),'\n'),20) }}</div>
                    <!-- 取消收藏按钮图标 -->
                    <div class="collection_icon">
                        <div class="collection_svg_box">
                            <svg @click="cancelCollect(i,$event)" t="1689348682275" class="icon collection_svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3707" width="200" height="200"><path d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24z" fill="#000000" p-id="3708"></path></svg>
                        </div>
                    </div>
                    <div class="circleSpread"></div>
                </div>
            </TransitionGroup>
            <div class="zero_item_tip" v-if="collectionItems.length === 0">暂无收藏记录</div>
        </div>
    </div>
</template>

<script setup>
import { reactive,ref,nextTick,onMounted } from 'vue';
import { getCollectionArticle,getCollection,collectArticle,addRecording } from '../../api/user'
import { increaseArticlesVisitedNum } from '../../api/search'
import { sign_change,warp_change } from '../../global'
import { useRouter } from 'vue-router'

let $router = useRouter()

let collectionArr = reactive([])

onMounted(() => {
    document.title = 'CFS-收藏'
    init()
})

//初始化
const init = async () => {
    try {
        let result = await getCollectionArticle()
        collectionItems.splice(0,collectionItems.length)
        result.data.forEach(i => collectionItems.push(i))
        let result_2 = await getCollection()
        collectionArr.splice(0,collectionArr.length)
        JSON.parse(result_2.data).forEach(i => collectionArr.push(i))
    } catch (error) {
        console.log(error,'请求失败')
    }
}

//解析内容
const parseContent = (content) => {
    content = content.replace(/\r|\n/g,warp_change)
    return JSON.parse(content).find(i => i[0] === 'text')[1]
}

let collectionItems = reactive([])

//切割内容
const sliceTitle = (text,len) => {
    if(text.length > len){
        return text.substr(0,len) + '...'
    }
    return text
}

//取消收藏
const cancelCollect = async (item,e) => {
    //被点击的索引
    let num =  collectionItems.indexOf(item)
    collectionItems.splice(num,1)
    collectionArr.splice(collectionArr.indexOf(item.id),1)

    try {
        let result = await collectArticle(JSON.stringify(collectionArr),item.id,0)
        console.log(result)
    } catch (error) {
        console.log(error,'请求出错')
    }

    e.target.parentNode.classList.add('dropAnimation')
}

//鼠标进入收藏条
const enter_collection_item = (e) => {
    let circle = e.target.lastElementChild
    circle.style.left = e.offsetX + 'px'
    circle.style.top = e.offsetY + 'px'
    circle.style.width = '5000px'
    circle.style.height = '5000px'
}
//鼠标离开收藏条
const leave_collection_item = (e) => {
    let circle = e.target.lastElementChild
    circle.style.left = e.offsetX + 'px'
    circle.style.top = e.offsetY + 'px'
    circle.style.width = '0px'
    circle.style.height = '0px'
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
.container_1 .collection_box_mainly{
    border-left: 1px solid var(--theme_1_border);
    border-right: 1px solid var(--theme_1_border);
}
.container_2 .collection_box_mainly{
    border-left: 1px solid var(--theme_2_border);
    border-right: 1px solid var(--theme_2_border);
}
.container_3 .collection_box_mainly{
    border-left: 1px solid var(--theme_3_border);
    border-right: 1px solid var(--theme_3_border);
}
.container_1 .collection_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .collection_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .collection_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.container_1 .collection_item{
    border-bottom-color: var(--theme_1_border);
}
.container_2 .collection_item{
    border-bottom-color: var(--theme_2_border);
}
.container_3 .collection_item{
    border-bottom-color: var(--theme_3_border);
}
.container_1 .collection_svg > path{
    fill: var(--theme_1_border);
}
.container_2 .collection_svg > path{
    fill: var(--theme_2_border);
}
.container_3 .collection_svg > path{
    fill: var(--theme_3_color);
}
.collection_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.collection_box_mainly{
    position: relative;
    width: 70%;
    height: 100%;
    left: 50%;
    transform: translate(-50%);
    padding: 100px 0px;
    overflow-y: auto;
}
.collection_box_mainly::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.collection_item{
    border-bottom-width: 2px;
    border-bottom-style: solid;
    position: relative;
    width: 80%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
    left: 10%;
    overflow: hidden;
}
.collection_icon{
    position: absolute;
    width: 50px;
    height: 100%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.collection_svg{
    position: absolute;
    width: 40px;
    height: 40px;
    transition: all .3s;
}
.collection_svg_1,
.collection_svg_box{
    position: absolute;
    width: 40px;
    height: 40px;
    transition: all .3s;
    opacity: 1;
    transition: all .5s;
}
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}
.list-leave-active {
    position: absolute;
}
.dropAnimation{
    animation: dropStar .5s ease 1 forwards;
}
@keyframes dropStar{
    0%{
        transform: translate(0,0) rotate(36deg)
    }10%{
        transform: translate(10px,3px) rotate(36deg)
    }20%{
        transform: translate(20px,12px) rotate(72deg)
    }30%{
        transform: translate(30px,27px) rotate(108deg)
    }40%{
        transform: translate(40px,48px) rotate(144deg)
    }50%{
        transform: translate(50px,75px) rotate(180deg)
    }60%{
        transform: translate(60px,108px) rotate(216deg)
    }70%{
        transform: translate(70px,147px) rotate(252deg)
    }80%{
        transform: translate(80px,192px) rotate(188deg)
    }90%{
        transform: translate(90px,243px) rotate(324deg)
    }100%{
        transform: translate(100px,300px) rotate(360deg)
    }
}
.circleSpread{
    position: absolute;
    width: 0px;
    height: 0px;
    background-color: rgb(0,0,0,0.1);
    top: 0;
    left: 0;
    z-index: -1;
    transition: width .5s,height .5s;
    border-radius: 50%;
    transform: rotateX(0);
    transform: translate(-50%,-50%);
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