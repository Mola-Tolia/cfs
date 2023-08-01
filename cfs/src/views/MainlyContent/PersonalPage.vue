<template>
    <div class="personalPage_box">
        <div class="personalPage_box_mainly">
            <div class="personalPage_top">
                <!-- 头像 -->
                <img v-if="userInfo.image_src !== null" id="avatar" ref="avatar" src=""/>
                <img v-if="userInfo.image_src === null" id="avatar" src="../../assets/cat.jpg"/>
                <!-- 用户名 -->
                <div>{{ userInfo.username }}</div>
                <!-- 邮箱 -->
                <div>{{ userInfo.email }}</div>
                <!-- 简介 -->
                <div>{{ userInfo.profile }}</div>
            </div>
            <div class="personalPage_bottom">
                <!-- 作者创作的文章、收藏 -->
                <div class="show_article">
                    <div>作者的文章</div>
                    <div class="article_item" v-for="item in userArticle" @click="enterArticle(item)">{{ sliceContent(item.title,30) }}</div>
                </div>
                <div class="show_article">
                    <div>作者的收藏</div>
                    <div class="article_item" v-for="item in userCollection" @click="enterArticle(item)">{{ sliceContent(item.title,30) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getUserInfo,increaseArticlesVisitedNum } from '../../api/search'
import { onMounted,reactive,ref } from 'vue'
import { addRecording } from '../../api/user'
import { useRouter,useRoute } from 'vue-router'

let $router = useRouter()
let $route = useRoute()

//用户基本信息
let userInfo = reactive({})
//用户创作文章
let userArticle = reactive([])
//用户收藏文章
let userCollection = reactive([])
//头像
let avatar = ref()

const init = async () => {
    try {
        let result = await getUserInfo($route.query.id === undefined ? 0 : $route.query.id)
        Object.assign(userInfo,result.data)
        Object.assign(userArticle,result.article)
        Object.assign(userCollection,result.collectionArticle)
    } catch (error) {
        console.log(error,'请求失败')
    }finally{
        if(userInfo.image_src === null) return
        avatar.value.src = parseBuffer(userInfo.image_src.data)
    }
}

//解析buffer为图片路径
const parseBuffer = (buffer) => {
    //!!!
    let bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return `data:image/jpeg;base64,${window.btoa(binary)}`
    //!!!
}

onMounted(() => {
    document.title = 'CFS-个人主页'
    init()
})

//截取内容
const sliceContent = (content,length) => {
    if(content.length > length){
        return content.slice(0,length) + '...'
    }
    return content
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
.container_1 .show_article::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .show_article::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .show_article::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.personalPage_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.personalPage_box_mainly{
    position: relative;
    width: 70%;
    height: 100%;
    left: 15%;
}
.personalPage_top{
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.personalPage_bottom{
    height: 80%;
    width: 100%;
    display:flex;
}
.show_article{
    height:100%;
    width:50%;
    display:flex;
    flex-direction: column;
    justify-content:start;
    align-items:center;
    overflow-y: auto;
}
.show_article::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.article_item{
    width: 95%;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    background-color: rgba(0,0,0,0.05);
}
.article_item:hover{
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
    text-decoration: underline;
}
#avatar{
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
}
</style>