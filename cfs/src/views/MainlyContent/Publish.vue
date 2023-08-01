<template>
    <div class="publish_box">
        <div class="publish_box_mainly">
            <!-- 工具栏 -->
            <div class="toolBar">
                <div class="toolBar_title">工具栏</div>
                <!-- 添加文本 -->
                <div class="toolItem">
                    <svg @click="add_text('',$event)" t="1689504950912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2302" width="200" height="200"><path d="M943.104 216.064q-8.192 9.216-15.36 16.384l-12.288 12.288q-6.144 6.144-11.264 10.24l-138.24-139.264q8.192-8.192 20.48-19.456t20.48-17.408q20.48-16.384 44.032-14.336t37.888 9.216q15.36 8.192 34.304 28.672t29.184 43.008q5.12 14.336 6.656 33.792t-15.872 36.864zM551.936 329.728l158.72-158.72 138.24 138.24q-87.04 87.04-158.72 157.696-30.72 29.696-59.904 58.88t-53.248 52.224-39.424 38.4l-18.432 18.432q-7.168 7.168-16.384 14.336t-20.48 12.288-31.232 12.288-41.472 13.824-40.96 12.288-29.696 6.656q-19.456 2.048-20.992-3.584t1.536-25.088q1.024-10.24 5.12-30.208t8.192-40.448 8.704-38.4 7.68-25.088q5.12-11.264 10.752-19.456t15.872-18.432zM899.072 478.208q21.504 0 40.96 10.24t19.456 41.984l0 232.448q0 28.672-10.752 52.736t-29.184 41.984-41.984 27.648-48.128 9.728l-571.392 0q-24.576 0-48.128-10.752t-41.472-29.184-29.184-43.52-11.264-53.76l0-570.368q0-20.48 11.264-42.496t29.184-39.936 40.448-29.696 45.056-11.776l238.592 0q28.672 0 40.448 20.992t11.776 42.496-11.776 41.472-40.448 19.968l-187.392 0q-21.504 0-34.816 14.848t-13.312 36.352l0 481.28q0 20.48 13.312 34.304t34.816 13.824l474.112 0q21.504 0 36.864-13.824t15.36-34.304l0-190.464q0-14.336 6.656-24.576t16.384-16.384 21.504-8.704 23.04-2.56z" p-id="2303"></path></svg>
                    <span>添加文本</span>
                </div>
                <!-- 添加代码 -->
                <div class="toolItem">
                    <svg @click="add_code('',$event)" t="1689505070914" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3305" width="200" height="200"><path d="M300.224 224L32 525.76l268.224 301.76 71.776-63.776-211.552-237.984 211.552-237.984zM711.744 224L640 287.776l211.552 237.984L640 763.744l71.744 63.776 268.256-301.76z" p-id="3306"></path></svg>
                    <span>添加代码</span>
                </div>
                <!-- 添加分割线 -->
                <div class="toolItem">
                    <svg @click="add_line" t="1689505102232" class="icon" viewBox="0 0 1175 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3926" width="200" height="200"><path d="M1027.670251 660.645161H146.810036a146.810036 146.810036 0 0 0-146.810036 146.810036v216.544803h110.107527V807.455197a36.702509 36.702509 0 0 1 36.702509-36.702509h880.860215a36.702509 36.702509 0 0 1 36.702509 36.702509v216.544803h110.107527V807.455197a146.810036 146.810036 0 0 0-146.810036-146.810036z" fill="#4C4A58" p-id="3927"></path><path d="M1174.480287 216.544803V0h-110.107527v216.544803a36.702509 36.702509 0 0 1-36.702509 36.702509H146.810036a36.702509 36.702509 0 0 1-36.702509-36.702509V0H0v216.544803a146.810036 146.810036 0 0 0 146.810036 146.810036h880.860215a146.810036 146.810036 0 0 0 146.810036-146.810036z" fill="#4C4A58" p-id="3928"></path><path d="M178.741219 456.579211m55.053763 0l706.890323 0q55.053763 0 55.053763 55.053764l0 0q0 55.053763-55.053763 55.053763l-706.890323 0q-55.053763 0-55.053763-55.053763l0 0q0-55.053763 55.053763-55.053764Z" fill="#51C75B" p-id="3929"></path></svg>
                    <span>添加分割线</span>
                </div>
                <div v-if="$route.query.id === undefined" class="control_btn control_btn_save" @click="control_btn_save_in_database">暂存</div>
                <div v-if="$route.query.id === undefined" class="control_btn control_btn_publish" @click="control_btn_publish">发布</div>
                <div v-if="$route.query.id !== undefined" class="control_btn control_btn_publish" @click="update_article">修改</div>
            </div>
            <!-- 编辑栏 -->
            <div class="editionBar" ref="editionBar">
                <!-- 文章标题 -->
                <div class="publish_box_title">
                    <input type="text" v-model="articleTitle" placeholder="文章标题" @focus="titleFocus" @blur="titleBlur">
                </div>
                <!-- 文章内容 -->
                <div class="publish_box_content" ref="publish_box_content"></div>
                <!-- 文章标签 -->
                <div class="publish_box_label" ref="publish_box_label">
                    <!-- 选中标签 -->
                    <div class="publish_box_label_top">
                        <TransitionGroup name="list" tag="ul">
                            <div class="publish_box_label_selected" v-for="item in selectedLabelArr" :key="item">{{ item }}</div>
                        </TransitionGroup>
                    </div>
                    <!-- 可选标签 -->
                    <div class="publish_box_label_bottom" ref="publish_box_label_bottom">
                        <div class="privode_label" v-for="item in labelArr" :key="item">
                            <label :for="item" :labelItem="item" class="privode_label_btn" @click="checked_label">{{ item }}</label>
                            <input :id="item" type="checkbox" name="privode_label"/>
                        </div>
                        <div class="privode_label">
                            <label for="item" class="privode_label_btn" @click="checked_all_label">全选</label>
                            <input id="item" type="checkbox" name="privode_label"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,watch,reactive,onMounted, nextTick } from 'vue';
import { paragraph,codeFragment,dividedLine } from '../../createElement'
import { useRoute,useRouter } from 'vue-router';
import { publishArticle,getArticleById,updateArticle } from '../../api/user'
import { sign_change, warp_change } from '../../global'

let $route = useRoute()
let $router = useRouter()

//文章标题
let articleTitle = ref('')
//文章内容
let article_content = []
//文章选中的标签
let selectedLabelArr = reactive([])

let publish_box_label_bottom = ref()
let publish_box_content = ref()
let publish_box_label = ref()
let editionBar = ref()


//调整标签栏的位置
const setLabelBar = () => {
    publish_box_label.value.style.top = editionBar.value.scrollHeight - publish_box_label.value.clientHeight + 'px'
}

//初始化暂存的发布内容
const initSavePublish = async (content_out) => {
    let a = true
    if(content_out.length === 0){
        try {
            let result = await publishArticle('',0)
            if(result.code === 1&&result.data !== undefined){
                let {title,content,label} = result.data
                articleTitle.value = title
                selectedLabelArr.splice(0,selectedLabelArr.length)
                JSON.parse(label).forEach(item => {
                    selectedLabelArr.push(item)
                    publish_box_label_bottom.value.children[labelArr.indexOf(item)].children[0].classList.add('privode_label_btn_checked')
                })
                a = false
                content = content.replace(/\r|\n/g,'')
                content = content.replace(new RegExp(sign_change,'g'),"\'")
                content_out = JSON.parse(content)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    content_out.forEach(item => {
        if(item[0] === 'text'){
            add_text(item[1])
        }else if(item[0] === 'code'){
            add_code(item[1])
        }else if(item[0] === 'line'){
            add_line()
        }
    })
    let text_area = document.querySelectorAll('textarea')
    for(let i = 0;i<text_area.length;i++){
        text_area[i].style.height = text_area[i].scrollHeight + 2 + 'px'
    }
    setLabelBar()
}

//初始化
onMounted(() => {
    document.title = 'CFS-创作'
    setLabelBar()
    if($route.query.id !== undefined){
        initUpdateArticle($route.query.id)
        return
    }
    article_content = []
    initSavePublish(article_content)
    let text_area = document.querySelectorAll('textarea')
    for(let i = 0;i<text_area.length;i++){
        text_area[i].style.height = text_area[i].scrollHeight + 2 + 'px'
    }
})

//初始化要修改的文章
const initUpdateArticle = async (id) => {
    try {
        let result = await getArticleById(id)
        if(result.code === 1){
            let {title,content,label} = result.data
            articleTitle.value = title
            selectedLabelArr.splice(0,selectedLabelArr.length)
            JSON.parse(label).forEach(item => {
                selectedLabelArr.push(item)
                publish_box_label_bottom.value.children[labelArr.indexOf(item)].children[0].classList.add('privode_label_btn_checked')
            })
            content = content.replace(/\r|\n/g,warp_change)
            content = content.replace(new RegExp(sign_change,'g'),"\'")
            content = JSON.parse(content)
            content.forEach(item => {
                if(item[0] === 'text'){
                    add_text(item[1].replace(new RegExp(warp_change,'g'),'\n'))
                }else if(item[0] === 'code'){
                    add_code(item[1].replace(new RegExp(warp_change,'g'),'\n'))
                }else if(item[0] === 'line'){
                    add_line()
                }
            })
            return
        }
        console.log('获取失败')
    } catch (error) {
        console.log(error,'请求出错')
    }finally{
        let text_area = document.querySelectorAll('textarea')
        for(let i = 0;i<text_area.length;i++){
            text_area[i].style.height = text_area[i].scrollHeight + 2 + 'px'
        }
        setLabelBar()
    }
    
}

const titleAutoBlur = (el) => {
    return () => {
        el.blur()
    }
}
//提供的标签
let labelArr = reactive(['JavaScript','CSS','HTML','JAVA','C语言','C++','Python','C#','PHP','SQL',
    'TypeScript','Vue','React','XML','Scss','Less','Linux','Nodejs'])


let timer
let titleTarget
//标题聚焦
const titleFocus = (e) => {
    clearTimeout(timer)
    titleTarget = e.target
    titleTarget.placeholder = ''
    timer = setTimeout(titleAutoBlur(titleTarget),30000)
}

//标题失焦
const titleBlur = (e) => {
    clearTimeout(timer)
    e.target.placeholder = '文章标题'
}

watch(articleTitle,() => {
    clearTimeout(timer)
    timer = setTimeout(titleAutoBlur(titleTarget),30000)
})

//选择标签或删除标签
const checked_label = ({target}) => {
    if(target.className.indexOf('privode_label_btn_checked') !== -1){
        target.classList.remove('privode_label_btn_checked')
        selectedLabelArr.splice(selectedLabelArr.indexOf(target.getAttribute('labelItem')),1)
    }else{
        target.classList.add('privode_label_btn_checked')
        selectedLabelArr.push(target.getAttribute('labelItem'))
    }
    if(selectedLabelArr.length === labelArr.length){
        publish_box_label_bottom.value.lastElementChild.children[0].classList.add('privode_label_btn_checked')
    }else{
        publish_box_label_bottom.value.lastElementChild.children[0].classList.remove('privode_label_btn_checked')
    }
}

//全(不)选标签
const checked_all_label = ({target}) => {
    if(selectedLabelArr.length !== labelArr.length){
        selectedLabelArr.splice(0,selectedLabelArr.length)
        target.classList.add('privode_label_btn_checked')
        labelArr.forEach(i => selectedLabelArr.push(i))
        let children = publish_box_label_bottom.value.children
        for(let i=0;i<children.length;i++){
            children[i].children[0].classList.remove('privode_label_btn_checked')
            children[i].children[0].classList.add('privode_label_btn_checked')
        }
    }else{
        selectedLabelArr.splice(0,selectedLabelArr.length)
        target.classList.remove('privode_label_btn_checked')
        let children = publish_box_label_bottom.value.children
        for(let i=0;i<children.length;i++){
            children[i].children[0].classList.remove('privode_label_btn_checked')
        }
    }
}


//添加文本
const add_text = (value = '',e) => {
    content_verify[0]++
    //插入文本块
    publish_box_content.value.insertAdjacentHTML('beforeend',paragraph(value.replace(new RegExp(warp_change,'g'),'\n')))
    //底部标签盒自适应位置
    setLabelBar()
}
//添加代码
const add_code = (value = '',e) => {
    content_verify[1]++
    //插入代码块
    publish_box_content.value.insertAdjacentHTML('beforeend',codeFragment(value.replace(new RegExp(warp_change,'g'),'\n')))
    setLabelBar()
}
//添加分割线
const add_line = () => {
    //插入分割线
    publish_box_content.value.insertAdjacentHTML('beforeend',dividedLine())
    setLabelBar()
}

//删除目标项
window.svgclick = () => {
    // 获取要删除的目标元素
    let div = findParent(event.target)
    if(div.getAttribute('id') === 'text_box'){
        content_verify[0]--
    }else if(div.getAttribute('id') === 'code_box'){
        content_verify[1]--
    }
    // 删除目标元素
    div.parentNode.removeChild(div)
    setLabelBar()
}

//寻找绝对父元素
const findParent = (target) => {
    if(target.className === 'parent'){
        return target
    }else{
        return findParent(target.parentNode)
    }
}

//自适应textarea高度
window.watchingchange = () => {
    event.target.style.height = '55px'
    if(event.target.scrollHeight === event.target.clientHeight) return
    event.target.style.height = event.target.scrollHeight + 2 + 'px'
    setLabelBar()
}

let content_verify = [0,0]
//发布
const control_btn_publish = async () => {
    if(articleTitle.value === '') return alert('请填写标题')
    if(!content_verify.every(i => i>0)) return alert('至少有一栏文本和一栏代码')
    if(!confirm('确定发布')) return
    for(let i of publish_box_content.value.children){
        if(i.children[0].className === 'publish_text_box'){
            article_content.push(['text',i.children[0].value])
        }else if(i.children[0].className === 'publish_code_box'){
            article_content.push(['code',i.children[0].value])
        }else{
            article_content.push(['line',''])
        }
    }
    article_content.forEach(item => {
        item[1] = item[1].replace(/"|'/g,sign_change).replace(/\r|\n/g,warp_change)
    })
    let article = {title:articleTitle.value,content:article_content,label:selectedLabelArr}
    try {
        let result = await publishArticle(JSON.stringify(article),1)
        if(result.code === 1){
            alert('发布成功')
            articleTitle.value = ''
            article_content = []
            selectedLabelArr.splice(0,selectedLabelArr.length)
            publish_box_content.value.innerHTML = ''
            for(let i of publish_box_label_bottom.value.children){
                i.children[0].classList.remove('privode_label_btn_checked')
            }
        }else{
            alert('发布失败')
        }
    } catch (error) {}
    setLabelBar()
}

//发布数据暂存到数据库中
const control_btn_save_in_database = async () => {
    for(let i of publish_box_content.value.children){
        if(i.children[0].className === 'publish_text_box'){
            article_content.push(['text',i.children[0].value])
        }else if(i.children[0].className === 'publish_code_box'){
            article_content.push(['code',i.children[0].value])
        }else{
            article_content.push(['line',''])
        }
    }
    article_content.forEach(item => {
        item[1] = item[1].replace(/"|'/g,sign_change).replace(/\r|\n/g,warp_change)
    })
    let article = {title:articleTitle.value,content:article_content,label:selectedLabelArr}
    try {
        let result = await publishArticle(JSON.stringify(article),0)
        if(result.code === 1){
            alert('暂存成功')
        }else{
            alert('暂存失败')
        }
    } catch (error) {}
}

//修改文章
const update_article = async () => {
    if(articleTitle.value === '') return alert('请填写标题')
    let content_verify = [false,false]
    article_content.filter(i => i[0] !== 'line').forEach(i => {
        i[0] === 'text' ? content_verify[0] = true : i[0] === 'code' ? content_verify[1] = true : ''
    })
    if(!content_verify.every(i => i)) return alert('至少有一栏文本和一栏代码')
    article_content.forEach(item => {
        item[1] = item[1].replace(/"|'/g,sign_change)
    })
    let article = {title:articleTitle.value,content:article_content,label:selectedLabelArr,id:$route.query.id}
    console.log(article)
    try {
        let result = await updateArticle(JSON.stringify(article))
        if(result.code === 1){
            console.log(result.message)
            alert(result.message)
            $router.push('/hasPublish')
        }else{
            console.log('更新失败')
            alert('更新失败，请稍后再试')
        }
    } catch (error) {
        console.log(error,'请求失败')
    }
}


</script>


<style>
.container_1 .clear_btn > path{
    fill: var(--theme_1_border);
}
.container_2 .clear_btn > path{
    fill: var(--theme_2_border);
}
.container_3 .clear_btn > path{
    fill: var(--theme_3_border);
}
.clear_btn{
    width: 40px;
    height: 40px;
}
.container_1 .toolBar{
    border-color: var(--theme_1_background);
    background-color: var(--theme_1_border);
    color: var(--theme_1_background);
}
.container_2 .toolBar{
    border-color: var(--theme_2_background);
    background-color: var(--theme_2_border);
    color: var(--theme_2_background);
}
.container_3 .toolBar{
    border-color: var(--theme_3_background);
    background-color: var(--theme_3_border);
    color: var(--theme_3_background);
}
.container_1 .editionBar{
    border-right-color: var(--theme_1_border);
}
.container_2 .editionBar{
    border-right-color: var(--theme_2_border);
}
.container_3 .editionBar{
    border-right-color: var(--theme_3_border);
}
.container_1 .publish_box_title > input::-webkit-input-placeholder{
    color: var(--theme_1_color);
}
.container_2 .publish_box_title > input::-webkit-input-placeholder{
    color: var(--theme_2_color);
}
.container_3 .publish_box_title > input::-webkit-input-placeholder{
    color: var(--theme_3_color);
}
.container_1 .publish_box_label_top{
    border-bottom-color: var(--theme_1_border);
}
.container_2 .publish_box_label_top{
    border-bottom-color: var(--theme_2_border);
}
.container_3 .publish_box_label_top{
    border-bottom-color: var(--theme_3_border);
}
.container_1 .privode_label_btn{
    border-color: var(--theme_1_border);
    color: var(--theme_1_border);
}
.container_2 .privode_label_btn{
    border-color: var(--theme_2_border);
    color: var(--theme_2_border);
}
.container_3 .privode_label_btn{
    border-color: var(--theme_3_border);
    color: var(--theme_3_border);
}
.container_1 .editionBar::-webkit-scrollbar-thumb{
    background-color: var(--theme_1_border);
}
.container_2 .editionBar::-webkit-scrollbar-thumb{
    background-color: var(--theme_2_border);
}
.container_3 .editionBar::-webkit-scrollbar-thumb{
    background-color: var(--theme_3_border);
}
.container_1 .privode_label_btn_checked{
    background-color: var(--theme_1_border);
    color: var(--theme_1_background);
}
.container_2 .privode_label_btn_checked{
    background-color: var(--theme_2_border);
    color: var(--theme_2_background);
}
.container_3 .privode_label_btn_checked{
    background-color: var(--theme_3_border);
    color: var(--theme_3_background);
}
.container_1 .toolItem > svg > path{
    fill: var(--theme_1_background);
}
.container_2 .toolItem > svg > path{
    fill: var(--theme_2_background);
}
.container_3 .toolItem > svg > path{
    fill: var(--theme_3_background);
}
.container_1 .publish_text_box:focus,.container_1 .publish_text_box:hover,
.container_1 .publish_code_box:focus,.container_1 .publish_code_box:hover{
    border-color: var(--theme_1_color);
}
.container_2 .publish_text_box:focus,.container_2 .publish_text_box:hover,
.container_2 .publish_code_box:focus,.container_2 .publish_code_box:hover{
    border-color: var(--theme_2_color);
}
.container_3 .publish_text_box:focus,.container_3 .publish_text_box:hover,
.container_3 .publish_code_box:focus,.container_3 .publish_code_box:hover{
    border-color: var(--theme_3_color);
}
.container_1 .publish_line_box{
    background-color: var(--theme_1_border);
}
.container_2 .publish_line_box{
    background-color: var(--theme_2_border);
}
.container_3 .publish_line_box{
    background-color: var(--theme_3_border);
}
.publish_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.publish_box_mainly{
    position: relative;
    left: 15%;
    width: 70%;
    height: 100%;
}
.toolBar{
    position: relative;
    height: 100%;
    float: left;
    border-width: 10px;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 20px;
    width: 300px;
    overflow: hidden;
}
.editionBar{
    overflow: hidden;
    height: 100%;
    position: relative;
    border-right-width: 5px;
    border-right-style: dotted;
    padding: 10px;
    overflow-y: auto;
}
.editionBar::-webkit-scrollbar{
    background-color: rgba(0,0,0,0);
    width: 5px;
}
.publish_box_title{
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.publish_box_title > input{
    border: none;
    height: 50px;
    width: 80%;
    background-color: rgb(0,0,0,0);
    text-align: center;
}
.publish_box_title > input::-webkit-input-placeholder{
    text-align: center;
}
.publish_box_content{
    position: relative;
    width: 100%;
    margin-bottom: 200px;
}
.publish_box_label{
    position: absolute;
    height: 200px;
    width: 95%;
}
.publish_box_label_top{
    position: relative;
    width: 100%;
    height: 50%;
    border-bottom-width: 4px;
    border-bottom-style: dotted;
}
.publish_box_label_bottom{
    width: 100%;
    height: 50%;
}
.privode_label{
    position: relative;
    float: left;
    height: 50px;
    padding: 0 10px;
}
.privode_label_btn{
    position: relative;
    border-radius: 15px;
    border-width: 2px;
    border-style: solid;
    padding: 2px 10px;
    top: 15px;
    user-select: none;
}
.privode_label > input{
    display: none;
}
.publish_box_label_selected{
    display: inline-block;
    /* float: left; */
    height: 30px;
    border-radius: 15px;
    border-width: 2px;
    border-style: solid;
    padding: 2px 10px;
    box-sizing: border-box;
    line-height: 22px;
    margin: 10px 0 0 10px;
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
.toolItem{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 30px;
}
.toolItem > span{
    margin-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    width: 0px;
    transition: width .3s;
    user-select: none;
}
.toolItem > svg{
    width: 40px;
    height: 40px;
    cursor: pointer;
}
.toolItem > svg:hover + span{
    width: 150px;
}
.publish_text_box,
.publish_code_box{
    margin-left: 2%;
    width: 90%;
    border-radius: 5px;
    resize: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(0,0,0,0);
    height: 55px;
    margin-top: 20px;
    padding: 0;
}
.publish_text_box{
    background-color: rgba(255,255,255,0.1);
}
.publish_code_box{
    background-color: rgba(0,0,0,0.1);
}
.publish_line_box{
    width: 92%;
    height: 4px;
    border-radius: 2px;
    margin: 50px 0;
}
.clear_outside{
    position: absolute;
    right: 0px;
    top: 20px;
    cursor: pointer;
}
.clear_outside_2{
    top: -20px;
}
.publish_box_content > div{
    position: relative;
}
.publish_box_content textarea::-webkit-scrollbar{
    width: 0;
}
.publish_box_content textarea{
    padding: 5px;
}
.control_btn{
    position: absolute;
    bottom: 10px;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    line-height: 40px;
    text-align: center;
    user-select: none;
    cursor: pointer;
}
.control_btn:hover{
    background-color: rgba(255,255,255,0.1);
}
.control_btn_save{
    left: 30px;
}
.control_btn_publish{
    right: 30px;
}
.toolBar_title{
    margin-left: 50%;
    transform: translateX(-50%);
    text-align: center;
}
</style>