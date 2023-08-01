<template>
    <div class="article_box">
        <div class="article_box_mainly">
            <!-- 顶部信息 -->
            <div class="article_top">
                <div>
                    <div style="font-size: 30px;">{{ article.title }}</div>
                    <div style="margin-top: 20px;">{{ article.username }}------{{ article.create_time }}</div>
                </div>
                <div class="article_top_image" style="cursor: pointer;" @click="personalPage(article.user_id)">
                    <img class="article_user_image" ref="article_user_image"/>
                </div>
            </div>
            <!-- 文章标签 -->
            <div style="overflow: hidden;">
                <div 
                    style="float: left;height: 30px;
                            text-align: center;
                            border-radius: 15px;
                            background-color: #ffffff44;
                            line-height: 30px;
                            padding: 0 10px;
                            margin-right: 10px;" 
                    v-for="item in article.label">
                    {{ item }}
                </div>
            </div>
            <!-- 文章内容 -->
            <div class="article_content">
                <div class="article_content_box" v-for="item in article.content" :key="item">
                    <!-- 段落 -->
                    <div 
                        v-if="item[0] === 'text'" 
                        style="width: 100%;border-radius: 10px;background-color: #ffffff44;margin-top: 10px;padding: 10px;white-space: pre-wrap;">
                        {{ item[1].replace(new RegExp(sign_change,'g'),"\'").replace(new RegExp(warp_change,'g'),'\n') }}
                    </div>
                    <!-- 代码 -->
                    <div 
                        v-if="item[0] === 'code'" 
                        style="width: 100%;border-radius: 10px;background-color: #00000044;margin-top: 10px;padding: 10px;white-space: pre-wrap;">
                        {{ item[1].replace(new RegExp(sign_change,'g'),"\'").replace(new RegExp(warp_change,'g'),'\n') }}
                    </div>
                    <!-- 分割线 -->
                    <div 
                        v-if="item[0] === 'line'" 
                        class="article_content_line" style="width: 100%;border-radius: 2.5px;height: 5px;margin-top: 10px;">
                    </div>
                </div>
                <div class="insert_box">
                    <!-- 未赞 -->
                    <svg @click="approve_article" v-if="!isApprovedThisArticle" t="1690127220683" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2291" width="200" height="200"><path d="M757.76 852.906667c36.906667-0.021333 72.832-30.208 79.296-66.56l51.093333-287.04c10.069333-56.469333-27.093333-100.522667-84.373333-100.096l-10.261333 0.085333a19972.266667 19972.266667 0 0 1-52.842667 0.362667 3552.853333 3552.853333 0 0 1-56.746667 0l-30.997333-0.426667 11.498667-28.8c10.24-25.642667 21.76-95.744 21.504-128.021333-0.618667-73.045333-31.36-114.858667-69.290667-114.410667-46.613333 0.554667-69.461333 23.466667-69.333333 91.136 0.213333 112.661333-102.144 226.112-225.130667 225.109333a1214.08 1214.08 0 0 0-20.629333 0l-3.52 0.042667c-0.192 0 0.64 409.109333 0.64 409.109333 0-0.085333 459.093333-0.490667 459.093333-0.490666z m-17.301333-495.914667a15332.288 15332.288 0 0 0 52.693333-0.362667l10.282667-0.085333c84.010667-0.618667 141.44 67.52 126.72 150.250667L879.061333 793.813333c-10.090667 56.661333-63.68 101.696-121.258666 101.76l-458.922667 0.384A42.666667 42.666667 0 0 1 256 853.546667l-0.853333-409.173334a42.624 42.624 0 0 1 42.346666-42.730666l3.669334-0.042667c5.909333-0.064 13.12-0.064 21.333333 0 98.176 0.789333 182.293333-92.437333 182.144-182.378667C504.469333 128.021333 546.24 86.186667 616.106667 85.333333c65.173333-0.768 111.68 62.506667 112.448 156.714667 0.256 28.48-6.848 78.826667-15.701334 115.050667 8.021333 0 17.28-0.042667 27.584-0.106667zM170.666667 448v405.333333h23.466666a21.333333 21.333333 0 0 1 0 42.666667H154.837333A26.709333 26.709333 0 0 1 128 869.333333v-437.333333c0-14.784 12.074667-26.666667 26.773333-26.666667h38.912a21.333333 21.333333 0 0 1 0 42.666667H170.666667z" fill="#3D3D3D" p-id="2292"></path></svg>
                    <!-- 已赞 -->
                    <svg @click="unapprove_article" v-if="isApprovedThisArticle" t="1690127247257" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2431" width="200" height="200"><path d="M710.549333 384.810667a12409.045333 12409.045333 0 0 0 47.466667-0.32l8.746667-0.085334c83.989333-0.618667 141.44 67.584 126.72 150.229334L847.296 794.026667c-10.026667 56.448-63.914667 101.546667-121.130667 101.589333L298.624 896a42.730667 42.730667 0 0 1-42.666667-42.410667l-0.810666-383.978666a42.666667 42.666667 0 0 1 42.026666-42.666667l3.157334-0.064c5.226667-0.042667 11.797333-0.042667 19.626666 0 91.946667 0.768 170.88-86.698667 170.709334-170.944-0.149333-86.741333 39.786667-126.762667 106.453333-127.573333 62.250667-0.746667 106.602667 59.605333 107.349333 149.12 0.213333 26.602667-6.293333 73.237333-14.506666 107.434666 6.186667 0 13.077333-0.042667 20.586666-0.085333z m-497.706666 63.232L213.333333 874.624A21.312 21.312 0 0 1 191.786667 896H149.525333A21.333333 21.333333 0 0 1 128 874.624l0.042667-426.581333A21.269333 21.269333 0 0 1 149.44 426.666667h41.984c11.669333 0 21.418667 9.578667 21.418667 21.376z" fill="#3D3D3D" p-id="2432"></path></svg>
                    <div style="margin:0 5px;">{{ article.approved_num }}</div>
                    <!-- 未收藏 -->
                    <svg @click="collect_article" v-if="!isCollectedThisArticle" t="1690127574716" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3393" width="200" height="200"><path d="M509.606998 143.114488c9.082866 0 17.327644 4.840238 20.996197 12.331863l97.262184 197.441814c5.613858 11.403724 16.663518 19.358907 29.438473 21.216207l223.738737 32.552393c8.420787 1.215688 15.604396 6.851035 18.23327 14.254655 2.520403 7.18361 0.595564 15.062044-5.084808 20.586874L730.253304 601.611947c-8.949836 8.751315-12.994965 21.171182-10.916631 33.370015l38.011732 222.060515c1.325182 7.737218-2.165316 15.426341-8.905834 19.978007-4.088108 2.741437-8.861832 4.155646-13.812587 4.155646-4.022617 0-7.999185-0.972141-11.425214-2.740414L528.149307 775.671215c-5.768377-3.006474-12.155854-4.552689-18.542308-4.552689-6.364965 0-12.727882 1.547239-18.518772 4.552689L296.254819 878.348736c-3.559059 1.855254-7.602142 2.828418-11.668761 2.828418-4.861728 0-9.723455-1.459235-13.546527-4.022617-6.961552-4.684696-10.475586-12.419867-9.127891-20.155039l38.011732-222.016513c2.078335-12.198833-1.988284-24.619724-10.939143-33.370015L125.02397 441.443038c-5.635347-5.492084-7.55814-13.348006-5.061272-20.453844 2.63092-7.481392 9.812483-13.116739 18.298761-14.332427l223.674269-32.552393c12.839423-1.857301 23.867594-9.813506 29.481452-21.216207l97.194646-197.396789C492.325403 147.965983 500.590648 143.114488 509.606998 143.114488M509.606998 104.904235c-24.043602 0-45.922912 13.226233-56.177464 33.95637L356.189863 336.302419l-223.674269 32.54216c-22.983457 3.304256-42.100864 18.718317-49.481971 39.659255-7.381108 21.048385-1.812275 44.23241 14.431687 60.033281l163.916257 160.125931-38.011732 222.016513c-3.868097 22.408359 6.03239 44.819788 25.458835 57.94676 10.69662 7.116071 23.204491 10.784624 35.757388 10.784624 10.298554 0 20.663622-2.475378 30.055526-7.337105l194.987926-102.7205L704.662463 912.072815c9.369392 4.861728 19.712971 7.337105 29.990035 7.337105 12.57541 0 25.082258-3.668553 35.778878-10.784624 19.426445-13.126972 29.305443-35.538401 25.460882-57.94676l-38.012755-222.016513 163.937746-160.125931c16.22145-15.812127 21.810748-38.984896 14.408151-60.033281-7.402597-20.940938-26.51898-36.353976-49.503461-39.659255L663.04767 336.302419l-97.240695-197.441814C555.619962 118.131491 533.695626 104.904235 509.606998 104.904235L509.606998 104.904235z" fill="#5D5D5D" p-id="3394"></path></svg>
                    <!-- 已收藏 -->
                    <svg @click="uncollect_article" v-if="isCollectedThisArticle" t="1690127595601" class="icon svg_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3533" width="200" height="200"><path d="M284.458667 941.397333c-36.437333 15.637333-68.48-7.68-64.896-47.168l22.613333-248.917333-164.394667-188.053333c-26.069333-29.824-13.653333-67.562667 24.789334-76.309334l243.370666-55.381333 127.786667-214.677333c20.288-34.090667 59.946667-34.069333 80.213333 0l127.786667 214.677333 243.370667 55.381333c38.656 8.789333 50.858667 46.485333 24.789333 76.309334l-164.394667 188.053333 22.741334 249.002667c3.605333 39.509333-28.458667 62.805333-64.896 47.146666l-229.504-98.517333-229.376 98.453333z" fill="#3D3D3D" p-id="3534"></path></svg>
                    <div style="margin:0 5px;">{{ article.collected_num }}</div>
                    <!-- 评论 -->
                    <svg @click="input_comment_appear = !input_comment_appear" t="1690127619902" class="icon svg_icon" viewBox="0 0 1114 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4611" width="200" height="200"><path d="M412.43236215 880.21486555h-7.85199339c-19.62998309-3.92599633-35.33396983-15.70398675-43.18596322-31.40797352l-27.48197645-66.74194336h-62.81594705c-70.66793969 0-129.55789039-58.88994998-129.55788966-129.55789038V271.68538194c0-74.59393674 58.88994998-129.55789039 129.55788966-129.55789039h526.08355351c70.66793969 0 129.55789039 54.96395365 129.55789039 129.55789039v380.82167634c0 70.66793969-58.88994998 129.55789039-129.55789039 129.55789039h-282.6717602l-58.88994997 78.51993306c-7.85199338 11.77798971-23.55598013 19.62998309-43.18596323 19.62998381z m-141.33588011-679.19742403c-39.25996689 0-70.66793969 31.40797353-70.66793967 70.66794042v380.82167635c0 39.25996689 31.40797353 70.66793969 70.66793967 70.66794039h102.07591322l39.25996689 94.22391984 70.66794042-94.22391984h310.15373665c39.25996689 0 70.66793969-31.40797353 70.66793969-70.66794039V271.68538194c0-39.25996689-31.40797353-70.66793969-70.66793969-70.66794042H271.09648204zM346.41018531 337.51125953h374.80181521a30.71001833 30.71001833 0 0 1 0 61.4418473H346.41018531a30.71001833 30.71001833 0 1 1 0-61.4418473z m0.23992193 202.23245021h190.06186059a30.97175162 30.97175162 0 1 1 0 61.89988056H346.67191787a30.97175162 30.97175162 0 1 1 0-61.89988056z" fill="#515151" p-id="4612"></path></svg>
                </div>
                <div class="insert_box_2" v-if="input_comment_appear">
                    <textarea v-model="input_comment" @input="watchingTextarea"></textarea>
                    <div class="insert_box_2_btn">
                        <div class="btn" @click="send_comment">确认</div>
                        <div class="btn" @click="cancel_send_comment">取消</div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="article_comment">
                <div class="article_comment_item" v-for="item in comments_arr" :key="item">
                    <div class="article_comment_item_top">
                        <div class="article_comment_author_img"></div>
                        <img class="article_comment_author_img special"/>
                        <div class="article_comment_author_name">{{ item.commenter_name }}</div>
                        <div class="article_comment_time">{{ item.comment_time }}</div>
                    </div>
                    <div class="article_comment_item_bottom">
                        {{ item.comment_content.replace(new RegExp(sign_change,'g'),"\'").replace(new RegExp(warp_change,'g'),'\n') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive,onMounted,ref,nextTick } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import { searchArticleById,getComments } from '../../api/search'
import { getApproved,getCollection,approveArticle,collectArticle,give,sendComment } from '../../api/user'
import { sign_change,warp_change } from '../../global'

let $route = useRoute()
let $router = useRouter()

//文章基本信息
let article = reactive({})

//评论数组
let comments_arr = reactive([])

//判断该作者是否赞过该文章
let isApprovedThisArticle = ref(false)

//点赞数组
let approvedArr = reactive([])

//判断该作者是否收藏过该文章
let isCollectedThisArticle = ref(false)

//收藏数组
let collectedArr = reactive([])

//文章作者头像
let article_user_image = ref()

onMounted(() => {
    document.title = 'CFS-文章'
    init($route.query.id)
    initComments($route.query.id)
})

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

//初始化文章
const init = async (id) => {
    try {
        let result = await searchArticleById(id)
        if(result.code === 1){
            article.approved_num = parseInt(result.data.approved_num)
            article.collected_num = parseInt(result.data.collected_num)
            article.content = JSON.parse(result.data.content.replace(new RegExp("\r|\n","g"),warp_change))
            article.create_time = result.data.create_time
            article.id = parseInt(result.data.id)
            article.user_id = parseInt(result.data.user_id)
            article.label = JSON.parse(result.data.label)
            article.title = result.data.title
            article.username = result.data.username
            article_user_image.value.src = parseBuffer(result.image.data)
            //获取点赞数组
            let result_2 = await getApproved()
            if(result_2.code === 1){
                approvedArr.splice(0,approvedArr.length)
                JSON.parse(result_2.data).forEach(i => approvedArr.push(i))
                isApprovedThisArticle.value = approvedArr.includes(article.id)
            }else{
                console.log(result_2.message)
            }
            //获取收藏数组
            let result_3 = await getCollection()
            if(result_3.code === 1){
                collectedArr.splice(0,collectedArr.length)
                JSON.parse(result_3.data).forEach(i => collectedArr.push(i))
                isCollectedThisArticle.value = collectedArr.includes(article.id)
            }else{
                console.log(result_3.message)
            }
        }else{
            console.log(result.message)
        }
    } catch (error) {
        console.log(error,'请求错误')
    }
}

//初始化评论
const initComments = async (id) => {
    try {
        let result = await getComments(id)
        comments_arr.splice(0,comments_arr.length)
        result.data.forEach(i => comments_arr.push(i))
    } catch (error) {
        console.log(error,'请求失败')
    }finally{
        nextTick(() => {
            let img = document.querySelectorAll('.special')
            for(let i = 0;i <= img.length - 1;i++){
                img[i].src = parseBuffer(comments_arr[i].image.data)
            }
        })
    }
}

//点赞文章
const approve_article = async () => {
    if(approvedArr.includes(article.id)) return alert('文章已赞过')
    approvedArr.push(article.id)
    try {
        let result = await approveArticle(JSON.stringify(approvedArr),article.id,1)
        isApprovedThisArticle.value = true
        console.log(result.message)
        init($route.query.id)
        let result_2 = await give(article.user_id)
    } catch (error) {
        console.log(error,'请求失败')
    }
}
//取消点赞
const unapprove_article = async () => {
    approvedArr.splice(approvedArr.indexOf(article.id),1)
    try {
        let result = await approveArticle(JSON.stringify(approvedArr),article.id,0)
        isApprovedThisArticle.value = false
        console.log(result.message)
        init($route.query.id)
    } catch (error) {
        console.log(error,'请求失败')
    }
}
//收藏文章
const collect_article = async () => {
    if(collectedArr.includes(article.id)) return alert('文章已收藏过')
    collectedArr.push(article.id)
    try {
        let result = await collectArticle(JSON.stringify(collectedArr),article.id,1)
        isCollectedThisArticle.value = true
        console.log(result.message)
        init($route.query.id)
        let result_2 = await give(article.user_id)
    } catch (error) {
        console.log(error,'请求失败')
    }
}
//取消收藏
const uncollect_article = async () => {
    collectedArr.splice(collectedArr.indexOf(article.id),1)
    try {
        let result = await collectArticle(JSON.stringify(collectedArr),article.id,0)
        isCollectedThisArticle.value = false
        console.log(result.message)
        init($route.query.id)
    } catch (error) {
        console.log(error,'请求失败')
    }
}

//评论输入框
let input_comment = ref('')

//评论框出现条件
let input_comment_appear = ref(false)

//自适应输入框高度
const watchingTextarea = (event) => {
    event.target.style.height = '50px'
    if(event.target.scrollHeight === event.target.clientHeight) return
    event.target.style.height = event.target.scrollHeight + 2 + 'px'
}

//发送评论
const send_comment = async () => {
    if(input_comment.value.length <= 10){
        alert('发表文字长度至少十位')
        return
    }
    if(!confirm('确认发表')) return
    try {
        let result = await sendComment(article.id,input_comment.value.replace(/"|'/g,sign_change).replace(/\r|\n/g,warp_change),article.user_id)
        console.log('发布成功')
        alert('发表成功')
        initComments($route.query.id)
    } catch (error) {
        console.log(error,'请求失败')
    }
    input_comment_appear.value = false
    input_comment.value = ''
}

//取消发送
const cancel_send_comment = () => {
    input_comment_appear.value = false
    input_comment.value = ''
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
.container_1 .article_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .article_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .article_box_mainly::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.container_1 .article_content_line{
    background-color: var(--theme_1_border);
}
.container_2 .article_content_line{
    background-color: var(--theme_2_border);
}
.container_3 .article_content_line{
    background-color: var(--theme_3_border);
}
.container_1 .article_comment{
    border-top-color: var(--theme_1_border);
}
.container_2 .article_comment{
    border-top-color: var(--theme_2_border);
}
.container_3 .article_comment{
    border-top-color: var(--theme_3_border);
}
.container_1 .article_comment_item{
    border-bottom-color: var(--theme_1_border);
}
.container_2 .article_comment_item{
    border-bottom-color: var(--theme_2_border);
}
.container_3 .article_comment_item{
    border-bottom-color: var(--theme_3_border);
}
.container_1 .svg_icon > path{
    fill: var(--theme_1_color);
}
.container_2 .svg_icon > path{
    fill: var(--theme_2_border);
}
.container_3 .svg_icon > path{
    fill: var(--theme_3_color);
}
.article_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.article_box_mainly{
    width: 50%;
    position: relative;
    left: 25%;
    height: 100%;
    overflow-y: auto;
}
.article_box_mainly::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 0px;
}
.article_top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 200px;
}
.article_top_image{
    width: 100px;
    height: 100px;
    background-image: url(../../assets/cat.jpg);
    background-size: 100% 100%;
    border-radius: 50%;
}
.article_content_box{
    width: 100%;
}
.article_comment{
    width: 100%;
    height: 200px;
    margin-top: 10px;
    border-top-width: 5px;
    border-top-style: dashed;
    padding: 20px;
}
.article_comment_item{
    width: 100%;
    margin-top: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}
.article_comment_item_top{
    position: relative;
    width: 100%;
    height: 50px;
}
.article_comment_item_bottom{
    padding: 10px;
    line-height: 50px;
}
.article_comment_author_img{
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(../../assets/cat.jpg);
    background-size: 100% 100%;
    object-fit: cover;
}
.article_comment_author_name{
    position: absolute;
    height: 50px;
    line-height: 50px;
    left: 50px;
}
.article_comment_time{
    position: absolute;
    right: 5px;
    height: 50px;
    line-height: 50px;
}
.insert_box{
    margin-top:10px;
    display:flex;
    justify-content:end;
    align-items:center;
}
.svg_icon{
    width:40px;
    height:40px;
    cursor:pointer;
}
.insert_box_2{
    margin-top:10px;
}
.insert_box_2 > textarea{
    width:100%;
    background-color:rgba(0,0,0,0);
    resize: none;
    height:50px;
}
.insert_box_2_btn{
    height:50px;
    position:relative;
    display:flex;
    justify-content:end;
    align-items:center;
}
.btn{
    margin-right:10px;
    user-select:none;
    cursor:pointer;
}
.article_user_image{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}
</style>