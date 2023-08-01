<template>
    <div class="hasPublish_box">
        <div class="hasPublish_box_mainly">
            <div class="hasPublish_item" v-for="item in hasPublishItems" :key="item">
                <!-- 删除按钮 -->
                <svg @click="deleteItem(item)" t="1689595838559" class="icon deleteIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12493" width="200" height="200"><path d="M96 128h832v64H96zM128 256h768l-89.024 704H217.024z" fill="#000000" p-id="12494"></path><path d="M384 64h256v96h-256z" fill="#000000" p-id="12495"></path></svg>
                <!-- 卡片 -->
                <div class="hasPublish_item_mainly" @mousemove="card_turn" @mouseleave="card_turnback" @click="enterArticle(item)">
                    <!-- 标题 -->
                    <div class="hasPublish_item_title">{{ sliceTitle(item.title,10) }}</div>
                    <!-- 内容简略 -->
                    <div class="hasPublish_item_partContent">{{ sliceTitle(jsonParseContent(item.content).find(i => i[0] === 'text')[1],30) }}</div>
                    <!-- 底部 -->
                    <div class="hasPublish_item_otherInfo">
                        <div class="hasPublish_item_inBox">
                            <!-- 被点赞数 -->
                            <div class="hasPublish_item_hasBeApproved">
                                <svg t="1689595212430" class="icon setsvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2339" width="200" height="200"><path d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667z" fill="#000000" p-id="2340"></path></svg>
                                {{ cal_scale(item.approved_num) }}
                            </div>
                            <!-- 被收藏数 -->
                            <div class="hasPublish_item_hasBeCollected">
                                <svg t="1689595306425" class="icon setsvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3298" width="200" height="200"><path d="M1006.942208 391.708672c-2.10944-5.599232-7.458816-9.310208-13.459456-9.310208L672.516096 382.398464 526.367744 42.118144c-2.251776-5.26336-7.45472-8.675328-13.205504-8.675328-0.021504 0-0.043008 0-0.043008 0-5.772288 0-10.975232 3.45088-13.2096 8.762368L356.626432 382.399488 32.821248 382.399488c-5.983232 0-11.355136 3.709952-13.459456 9.271296-2.10944 5.604352-0.54784 11.91936 3.959808 15.880192L290.67264 642.930688l-88.240128 314.625024c-1.600512 5.72928 0.504832 11.880448 5.28896 15.418368 4.780032 3.53792 11.246592 3.791872 16.303104 0.590848l289.137664-184.52992 289.133568 184.52992c2.359296 1.514496 5.056512 2.230272 7.7312 2.230272 2.989056 0 5.961728-0.927744 8.489984-2.7392 4.780032-3.493888 6.928384-9.560064 5.413888-15.29344l-84.93568-319.50848L1002.939392 407.59296C1007.468544 403.633152 1009.047552 397.313024 1006.942208 391.708672z" fill="#FF9000" p-id="3299"></path></svg>
                                {{ cal_scale(item.collected_num) }}
                            </div>
                        </div>
                        <!-- 创建时间 -->
                        <div class="hasPublish_item_createTime">
                            <svg t="1689595383600" class="icon setsvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11489" width="200" height="200"><path d="M887.786 1021.4h-757.804c-69.761 0-126.276-56.637-126.276-126.397v-758.23c0-69.822 57.419-132.402 127.121-132.402h508.511v63.547h-508.511c-34.85 0-63.968 33.886-63.968 68.854v758.262c0 34.91 28.273 63.212 63.094 63.212h757.835c34.82 0 69.341-29.058 69.341-63.968v-508.512h63.605v508.486c0 69.853-63.242 127.153-132.946 127.153z" fill="#666666" p-id="11490"></path><path d="M969.708 166.041l-111.61-111.673c-24.682-24.68-64.635-24.68-89.315 0l-491.163 491.497c-9.234 9.23-13.849 20.849-16.143 32.768l-136.716 276.63c-11.434 31.109 13.516 59.050 44.597 44.659l276.51-136.776c11.919-2.355 23.505-6.942 32.676-16.172l491.163-491.558c24.653-24.68 24.653-64.691 0-89.374zM207.56 839.423c-15.541 7.148-29.57-7.755-22.297-22.33l103.345-170.842 89.676 89.706-170.722 103.465zM433.89 702.284c-41.852-41.88-99.755-99.843-111.612-111.73l356.441-356.649 112.426 110.946-357.254 357.434zM902.756 233.086l-66.984 67.046-110.013-113.303 65.388-65.445c12.279-12.312 32.347-12.312 44.626 0l66.986 67.015c12.311 12.402 12.311 32.375 0 44.687z" fill="#666666" p-id="11491"></path></svg>
                            {{ item.create_time }}
                        </div>
                    </div>
                </div>
                <!-- 修改按钮 -->
                <svg @click="updateItem(item)" t="1689596538924" class="icon updateIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17825" width="200" height="200"><path d="M724.48 416.33L575.488 284.232 256.951 573.44l-55.516 184.613v0.292l202.752-51.2L724.48 416.402v-0.073zM700.197 171.08l-79.872 72.412 149.43 131.657 77.532-70.437c38.766-38.62 35.694-98.523-6.802-133.705a111.909 111.909 0 0 0-140.362 0h0.074zM146.286 790.09h731.428v87.625H146.36V790.09h-0.073z" p-id="17826"></path></svg>
            </div>
            <div class="zero_item_tip" v-if="hasPublishItems.length === 0">暂无发布文章</div>
        </div>
    </div>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getAllArticle,deleteArticle,addRecording } from '../../api/user'
import { sign_change } from '../../global'

let $router = useRouter()

//获取所有用户文章
const initArticle = async () => {
    try {
        let result = await getAllArticle()
        if(result.code === 1){
            hasPublishItems.splice(0,hasPublishItems.length)
            result.data.forEach(i => hasPublishItems.push(i))
            return
        }
        console.log(result.message)
    } catch (error) {
        console.log(error,'请求出错')
    }
}

//json解析文章内容
const jsonParseContent = (content) => {
    content = content.replace(/\r|\n/g,'')
    content = content.replace(new RegExp(sign_change,'g'),"\'")
    return JSON.parse(content)
}

onMounted(() => {
    document.title = 'CFS-拥有文章'
    initArticle()
})

let hasPublishItems = reactive([])
let sumScale = ['','K','M','G','T']
//计算点赞或收藏数
const cal_scale = (value,scale = 0) => {
    if(value>=1000){
        value /= 100
        value = Math.round(value) / 10
        scale++
        return cal_scale(value,scale)
    }
    return value + sumScale[scale]
}
//切割内容
const sliceTitle = (text,len) => {
    if(text.length > len){
        return text.substr(0,len) + '...'
    }
    return text
}

let timer
let isTime = false
//鼠标移入时的卡片翻转
const card_turn = (event) => {
    //获取卡片
    let card = findOuterCard(event.target)
    if(!isTime){
        //卡片的宽、高和位置
        let {width,height,left,top} = card.getBoundingClientRect()
        //鼠标与卡片中心的距离
        let x_lenght = Math.round(event.clientX - left - width / 2),
            y_lenght = Math.round(event.clientY - top - height / 2);

        card.style.transform = `rotateX(${-45 * y_lenght / height}deg) rotateY(${45 * x_lenght / width}deg)`

        if(timer) return
        timer = setTimeout(() => {
            isTime = true
            clearTimeout(timer)
            timer = null
        },500)
    }else{
        card.style.transform = `scale(1.1)`
    }
}
//卡片回复原状
const card_turnback = (event) => {
    clearTimeout(timer)
    timer = null
    isTime = false
    let card = findOuterCard(event.target)
    setTimeout(() => {
        card.style.transform = 'none'
    },100)
}

//寻找父元素(hasPublish_item_mainly)
const findOuterCard = (target) => {
    if(target.className !== 'hasPublish_item_mainly'){
        return findOuterCard(target.parentNode)
    }
    return target
}

//删除文章
const deleteItem = async (item) => {
    if(!confirm(`你确定要删除[${item.title.slice(0,5)}...]该文章吗？`)) return
    try {
        let result = await deleteArticle(item.id)
        if(result.code === 1){
            initArticle()
            alert('删除成功')
        }else{
            console.log('删除失败')
        }
    } catch (error) {
        console.log(error,'请求失败')
    }
}

//修改文章
const updateItem = (item) => {
    if(!confirm(`进入修改[${item.title.slice(0,5)}...]该文章！`)) return
    $router.push({path:'/publish',query: {id:item.id}})
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
    } catch (error) {
        console.log(error,'请求失败')
    }
}
</script>

<style scoped>
.container_1 .hasPublish_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .hasPublish_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .hasPublish_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.container_1 .hasPublish_item_mainly{
    border-color: var(--theme_1_border);
}
.container_2 .hasPublish_item_mainly{
    border-color: var(--theme_1_border);
}
.container_3 .hasPublish_item_mainly{
    border-color: var(--theme_3_border);
}
.container_1 .setsvg > path{
    fill: var(--theme_1_color);
}
.container_2 .setsvg > path{
    fill: var(--theme_2_color);
}
.container_3 .setsvg > path{
    fill: var(--theme_3_color);
}
.hasPublish_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.hasPublish_box_mainly{
    position: relative;
    width: 70%;
    height: 100%;
    left: 15%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content:flex-start;
    align-content: flex-start;
}
.hasPublish_box_mainly::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.hasPublish_item{
    position: relative;
    width: 20%;
    height: 300px;
    padding: 20px;
    perspective:500px;
}
.hasPublish_item:hover > .deleteIcon,
.hasPublish_item:hover > .updateIcon{
    display: block;
}
.hasPublish_item_mainly{
    border-width: 2px;
    border-style: solid;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    transition: all .3s ease;
}
.hasPublish_item_mainly > div{
    width: 100%;
}
.hasPublish_item_mainly > div:first-of-type{
    flex: 1;
    align-self: flex-start;
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
}
.hasPublish_item_mainly > div:nth-of-type(2n){
    flex: 3;
    align-self: center;
    padding: 20px 10px 0;
    overflow: hidden;
    word-break: break-all;
}
.hasPublish_item_mainly > div:last-of-type{
    flex: 1.5;
    align-self: flex-end;
}
.hasPublish_item_otherInfo{
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: flex-end;
}
.hasPublish_item_inBox{
    display: flex;
    flex-direction: row;

}
.hasPublish_item_hasBeApproved,
.hasPublish_item_hasBeCollected,
.hasPublish_item_createTime{
    margin-right: 10px;
    font-size: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: end;
}
.hasPublish_item_otherInfo i{
    font-size: 18px;
    margin-right: 2px;
}
.hasPublish_item_partContent{
    line-height: 30px;
    font-size: 16px;
}
.setsvg{
    width: 15px;
    height: 15px;
    margin-right: 5px;
}
.deleteIcon{
    display: none;
    position: absolute;
    right: 0;
    top: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.deleteIcon > path{
    fill: rgb(150, 0, 0);
}
.updateIcon{
    display: none;
    position: absolute;
    right: 0;
    bottom: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.updateIcon > path{
    fill: rgb(150, 150, 0);
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