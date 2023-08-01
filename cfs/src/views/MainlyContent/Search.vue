<template>
    <div class="search_box">
        <!-- 搜索框 -->
        <div class="search_box_input" ref="search_box_input">
            <input type="text" placeholder="搜索" v-model="search_content" @blur="input_blur" @keyup.enter="search"/>
            <div class="search_btn" @click="search"><span>搜索</span></div>
        </div>
        <!-- 搜索内容 -->
        <div class="search_content">
            <div class="search_content_item" v-for="item in content_items" :key="item">
                <div class="search_content_item_top" @click="enterArticle(item)">{{ item.title }}</div>
                <div class="search_content_item_middle">{{ contentSlice(jsonParseContent(item.content).find(i => i[0] ==='text')[1].replace(new RegExp(sign_change,'g'),"\'")).replace(new RegExp(warp_change,'g'),'') }}</div>
                <div class="search_content_item_bottom">
                    <div class="item_bottom_left">
                        <div class="item_bottom_info">
                            <svg t="1689659406363" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2335" width="200" height="200"><path d="M204 411.3c3-3.6 9.5-10.3 19.3-19.2 16.7-15.2 36.5-30.4 59.4-44.6 65.4-40.7 141.7-65 228.4-65 86.7 0 163.1 24.4 228.5 65 22.9 14.2 42.7 29.4 59.4 44.6 9.8 9 16.3 15.7 19.3 19.2 8.2 9.7 22.8 11 32.7 2.9 9.8-8.1 11.2-22.5 3-32.2-4.2-5-12.1-13.3-23.5-23.6-18.7-17-40.7-33.9-66.1-49.7-72.4-45-157.2-72.1-253.2-72.1-96.1 0-180.8 27.1-253.2 72.1-25.4 15.8-47.5 32.7-66.1 49.7-11.4 10.3-19.3 18.6-23.5 23.6-8.2 9.7-6.9 24.1 3 32.2 9.8 8.2 24.4 6.8 32.6-2.9z m0 0" fill="#616161" p-id="2336"></path><path d="M371.9 511c0 75.7 62.4 137.1 139.3 137.1S650.5 586.7 650.5 511s-62.4-137.1-139.3-137.1S371.9 435.2 371.9 511z m232.2 0c0 50.5-41.6 91.4-92.9 91.4-51.3 0-92.9-40.9-92.9-91.4 0-50.5 41.6-91.4 92.9-91.4 51.3 0 92.9 40.9 92.9 91.4z m0 0" fill="#616161" p-id="2337"></path><path d="M818.4 614.4c-3 3.6-9.5 10.3-19.3 19.2-16.7 15.2-36.5 30.4-59.4 44.6-65.4 40.7-141.7 65-228.5 65-86.7 0-163.1-24.4-228.4-65-22.9-14.2-42.8-29.4-59.4-44.6-9.8-8.9-16.3-15.7-19.3-19.2-8.2-9.7-22.8-11-32.7-2.9-9.8 8.1-11.2 22.5-3 32.2 4.3 5 12.1 13.3 23.5 23.6 18.7 17 40.7 33.9 66.1 49.7 72.4 45 157.2 72.1 253.2 72.1 96.1 0 180.8-27 253.3-72.1 25.4-15.8 47.4-32.7 66.1-49.7 11.4-10.3 19.2-18.6 23.5-23.6 8.2-9.7 6.9-24.1-3-32.2-9.8-8.1-24.5-6.8-32.7 2.9z m0 0" fill="#616161" p-id="2338"></path></svg>
                            <div>{{ item.visited_num }}</div>
                        </div>
                        <div class="item_bottom_info">
                            <svg t="1689659434551" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3341" width="200" height="200"><path d="M799.33 384.13H682.11l-34.2 76.8h151.41c8.97 0 16.52 6.18 18.62 14.5l-61.93 309.64-1.49 7.46v7.61c0 10.59-8.61 19.2-19.2 19.2H223.97c-10.95 0-19.83-8.88-19.83-19.83V480.76c0-10.95 8.88-19.83 19.83-19.83h125.12l34.19-76.8H223.97c-53.37 0-96.63 43.26-96.63 96.63V799.5c0 53.37 43.26 96.63 96.63 96.63h511.37c53.02 0 96-42.98 96-96l64-320c-0.01-53.02-42.99-96-96.01-96zM517.09 272.43c13.39-30.09 48.77-43.69 78.83-30.31 30.06 13.39 43.62 48.77 30.23 78.86l-28.11 63.14h84.08l14.2-31.9c32.45-72.89-4.41-159.41-82.03-185.2-68.04-22.6-141.72 16.55-170.88 82.05l-60.13 135.05h84.08l49.73-111.69z" fill="#131414" p-id="3342"></path><path d="M433.17 460.93l34.19-76.8h-84.08l-34.19 76.8zM563.84 460.93h84.08l34.19-76.8h-84.08z" fill="#131414" p-id="3343"></path><path d="M287.31 448.13h64v384h-64z" fill="#131414" p-id="3344"></path></svg>
                            <div>{{ item.approved_num }}</div>
                        </div>
                    </div>
                    <div class="item_bottom_right">
                        <div class="item_bottom_info search_author_name" @click="personalPage(item.user_id)">{{ item.username }}</div>
                        <div class="item_bottom_info">{{ item.create_time }}</div>
                    </div>
                    <div class="dividedLine"></div>
                </div>
            </div>
        </div>
        <!-- 搜不到内容时的提示 -->
        <Transition name="tip">
            <div v-if="no_content" style="position:absolute;top:100px;left:50px">暂无相关内容</div>
        </Transition>
        <!-- 分页器 -->
        <div class="pager" v-if="maxPage > 1">
            <div style="user-select: none;cursor: pointer;" @click="decrease_page">上一页</div>
            <div class="pageNum" style="user-select: none;cursor: pointer;line-height: 40px;" v-if="pageRange_1 > 1" @click="currentPage = 1">1</div>
            <div v-if="pageRange_1 > 2">...</div>
            <div 
                class="pageNum"
                :class="currentPage === i ? 'currentPage' : ''" 
                style="user-select: none;cursor: pointer;text-align: center;line-height: 40px;" 
                v-for="i in showPageRange"
                @click="turnPage(i)">
                {{ i }}
            </div>
            <div v-if="pageRange_2 < maxPage - 1">...</div>
            <div class="pageNum" style="user-select: none;cursor: pointer;line-height: 40px;" v-if="pageRange_2 < maxPage" @click="currentPage = maxPage">{{ maxPage }}</div>
            <div style="user-select: none;cursor: pointer;" @click="increase_page">下一页</div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { searchByTitle,increaseArticlesVisitedNum } from '../../api/search'
import { useRouter } from 'vue-router'
import { sign_change, warp_change } from '../../global'
import { addRecording } from '../../api/user'

onMounted(() => {
    document.title = 'CFS-搜索'
})

const $router = useRouter()

//当前页码
let currentPage = ref(1)
//最大页码
let maxPage = ref(0)
//当前页码左区间
let pageRange_1 = ref(1)
//当前页码右区间
let pageRange_2 = ref(3)
//当前页码区间
let showPageRange = reactive([])
//获取的搜索内容
let content_items = reactive([])

//无内容提示显示控制变量
let no_content = ref(false)

//监视当前页码
watch(currentPage,(value) => {
    let leftRange = value - 1
    let rightRange = value + 1
    if(leftRange < 1){
        rightRange += 1 - leftRange
        leftRange = 1
    }
    if(rightRange > maxPage.value){
        leftRange -= rightRange - maxPage.value
        rightRange = maxPage.value
    }
    if(maxPage.value >= 3){
        pageRange_1.value = leftRange
        pageRange_2.value = rightRange
    }else{
        pageRange_1.value = 1
        pageRange_2.value = maxPage.value
    }
    showPageRange.splice(0,showPageRange.length)
    for(let i = pageRange_1.value;i <= pageRange_2.value;i++){
        showPageRange.push(i)
    }
},{immediate:true})


//搜索盒
let search_box_input = ref()
//输入框值
let search_content = ref('')

//输入框失焦时位置的控制
const input_blur = () => {
    if(search_content.value === '' && content_items.length === 0){
        search_box_input.value.style.top = '35%'
        search_box_input.value.style.left = 'calc(50% - 400px)'
        no_content.value = false
    }
}

//下一页
const increase_page = () => {
    currentPage.value < maxPage.value ? currentPage.value++ : ''
    turnPage(currentPage.value)
}
//上一页
const decrease_page = () => {
    currentPage.value > 1 ? currentPage.value-- : ''
    turnPage(currentPage.value)
}
//页面跳转
const turnPage = async (i) => {
    currentPage.value = i
    try {
        let result = await searchByTitle(search_content.value,(i-1)*5)
        if(result.code === 1){
            content_items.splice(0,content_items.length)
            result.data.forEach(item => content_items.push(item))
        }
    } catch (error) {console.log(error)}
}

//搜索
const search = async () => {
    if(search_content.value === '') return
    try {
        let result = await searchByTitle(search_content.value,0)
        if(result.code === 1){
            content_items.splice(0,content_items.length)
            result.data.forEach(item => content_items.push(item))
            //提示无内容
            no_content.value = result.data.length === 0 ? true : false
            //控制搜索框位置
            search_box_input.value.style.top = '10px'
            search_box_input.value.style.left = '2%'
            //设置最大页码
            maxPage.value = Math.floor(result.count / 5) + (result.count % 5 === 0 ? 0 : 1)
            if(maxPage.value >= 3){
                pageRange_2.value = 3
            }else{
                pageRange_2.value = maxPage.value
            }
            showPageRange.splice(0,showPageRange.length)
            for(let i = pageRange_1.value;i <= pageRange_2.value;i++){
                showPageRange.push(i)
            }
        }
    } catch (error) {console.log(error)}
}

//json解析文章内容
const jsonParseContent = (content) => {
    content = content.replace(/\r|\n/g,'')
    content = content.replace(/dbs_wsy_turn/g,"\'")
    return JSON.parse(content)
}

//内容截取
const contentSlice = (content) => {
    if(content.length<=150) return content
    return content.slice(0,150) + '...'
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

//跳转至作者主页
const personalPage = (id) => {
    $router.push({
        name:'personalPage',
        query:{id}
    })
}
</script>

<style scoped>
.container_1 .search_content_item:hover,
.container_1 .search_btn,
.container_1 .search_box_input{
    border-color: var(--theme_1_border);
}
.container_2 .search_content_item:hover,
.container_2 .search_btn,
.container_2 .search_box_input{
    border-color: var(--theme_2_border);
}
.container_3 .search_content_item:hover,
.container_3 .search_btn,
.container_3 .search_box_input{
    border-color: var(--theme_3_border);
}
.container_1 .svg_icon > path{
    fill:var(--theme_1_color)
}
.container_2 .svg_icon > path{
    fill:var(--theme_2_color)
}
.container_3 .svg_icon > path{
    fill:var(--theme_3_color)
}
.container_1 .dividedLine{
    background-color: var(--theme_1_border);
}
.container_2 .dividedLine{
    background-color: var(--theme_2_border);
}
.container_3 .dividedLine{
    background-color: var(--theme_3_border);
}
.search_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.search_box_input{
    border-width: 2px;
    border-style: solid;
    position: absolute;
    top: 35%;
    left: calc(50% - 400px);
    width: 800px;
    height: 50px;
    overflow: hidden;
    border-radius: 25px;
    transition: all .5s;
    z-index: 2;
}
.search_box_input > input{
    float: left;
    height: 100%;
    width: calc(100% - 150px);
    box-sizing: border-box;
    padding: 0 25px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
}
.search_btn{
    border-width: 2px;
    border-style: solid;
    position: relative;
    float: right;
    height: 80%;
    width: 120px;
    border-radius: 22.5px;
    margin: 5px 5px 0;
    cursor: pointer;
    user-select: none;
}
.search_btn:hover{
    background-color: #ffffff33;
}
.search_btn > span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.search_content{
    position: absolute;
    top: 80px;
    left: 2%;
    width: 96%;
    height: 90%;
}
.search_content::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.search_content_item{
    position: relative;
    width: 70%;
    height: 180px;
    border-radius: 10px;
    border-width: 3px;
    border-style: solid;
    border-color: #00000000;
    transition: border-color .1s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.search_content_item_top{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: larger;
}
.search_content_item_top:hover{
    text-decoration: underline;
    cursor: pointer;
}
.search_content_item_middle{
    width: 100%;
    height: 80px;
    padding: 10px 10px;
}
.search_content_item_bottom{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item_bottom_left{
    margin: 0 10px;
    display: flex;
    justify-content: start;
}
.item_bottom_right{
    margin: 0 10px;
    display: flex;
    justify-content: end;
}
.item_bottom_info{
    margin: 0 10px;
    display: flex;
    align-items: center;
}
.svg_icon{
    width: 30px;
    height: 30px;
}
.dividedLine{
    position: absolute;
    width: 2px;
    height: 90%;
    border-radius: 1px;
    left: -20px;
    top: 5%;
}
.pager{
    position: absolute;
    width: 25%;
    height: 50px;
    bottom: 20px;
    right: 50px;
    display: flex;
    align-items:center;
    justify-content: space-between;
}
.currentPage{
    background-color: rgba(0, 0, 0, 0.1);
}
.pageNum{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.tip-enter-from{
    opacity:0;
}
.tip-enter-to{
    opacity:1;
}
.tip-enter-active{
    transition: opacity .5s .5s
}
.search_author_name:hover{
    cursor: pointer;
    text-decoration: underline;
}
</style>