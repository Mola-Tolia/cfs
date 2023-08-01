<template>
    <div class="personalCenter_box">
        <div class="mainly_page">
            <!-- 基本信息 -->
            <div class="personalCenter_topContent personalCenter_showBox">
                <!-- 头像 -->
                <div class="personalCenter_topContent_head" @click="upload_image">
                    <div class="head_image"></div>
                    <img class="head_image" id="head_image"/>
                    <div class="update_image">
                        <svg t="1689260666549" class="icon update_image_svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4049" width="200" height="200"><path d="M799 925.6H225c-88.2 0-160-71.8-160-160v-394c0-88.2 71.8-160 160-160h24l21.4-60.1c11.3-31.8 41.6-53.1 75.3-53.1H678c33.7 0 64 21.3 75.3 53.1l21.4 60.1h24c88.2 0 160 71.8 160 160v394c0.3 88.2-71.5 160-159.7 160z m-574-650c-25.5 0-49.6 10-67.8 28.2C139 322 129 346.1 129 371.6v394c0 25.5 10 49.6 28.2 67.8s42.3 28.2 67.8 28.2h574c25.5 0 49.6-10 67.8-28.2 18.2-18.2 28.2-42.3 28.2-67.8v-394c0-25.5-10-49.6-28.2-67.8-18.2-18.2-42.3-28.2-67.8-28.2h-69.1L693.2 173c-2.3-6.4-8.3-10.6-15.1-10.6H345.8c-6.7 0-12.8 4.3-15.1 10.6l-36.6 102.5H225z" fill="#333333" p-id="4050"></path><path d="M512 751.1c-100.4 0-182-81.6-182-182s81.6-182 182-182 182 81.6 182 182c0 100.3-81.6 182-182 182z m0-300c-65.1 0-118 52.9-118 118s52.9 118 118 118 118-52.9 118-118-52.9-118-118-118zM785.6 384.3h-76c-17.6 0-32-14.4-32-32s14.4-32 32-32h76c17.6 0 32 14.4 32 32s-14.4 32-32 32z" fill="#333333" p-id="4051"></path></svg>
                    </div>
                </div>
                <!-- 选择文件 -->
                <input style="position: absolute;display: none;" type="file" ref="select_file" @input="file_input"/>
                <!-- 用户名 -->
                <div class="personalCenter_topContent_name">
                    <div>入站时长：{{ enter_time }}</div>
                    <div>用户昵称：{{ username }}</div>
                </div>
                <!-- 所获访问量 -->
                <div class="personalCenter_topContent_visited">访问量：{{ visited_sum }}</div>
                <!-- 邮箱 -->
                <div class="personalCenter_topContent_email">
                    {{ email }}
                    <div style="position:absolute;right:30px;cursor:pointer;user-select:none" @click="logout">退出登录</div>
                </div>
            </div>
            <!-- 个人成就 -->
            <div class="personalCenter_achievement personalCenter_showBox">
                <div class="achievement_title">个人成就</div>
                <!-- 发布数量 -->
                <div class="various_sum">创作数量：{{ articles }}</div>
                <!-- 获得点赞数 -->
                <div class="various_sum">获得点赞数量：{{ approved_sum }}</div>
                <!-- 获得评论数 -->
                <div class="various_sum">获得评论数：{{ commented_sum }}</div>
            </div>
            <!-- 可编辑个人信息 -->
            <div class="personalCenter_editionalContent personalCenter_showBox">
                <!-- 账号 -->
                <div class="editional_personalInfo">账号:{{ account }}</div>
                <!-- 用户名 -->
                <div class="editional_personalInfo">
                    <div class="edit_info" v-show="!isEditional[0]">
                        <div class="edit_info_field">用户名：{{ username }}</div>
                        <div class="edit_info_btn" @click="edit_btn1(1,$event)">编辑</div>
                    </div>
                    <div class="edit_info" v-show="isEditional[0]">
                        <input type="text" v-model="username_update" placeholder="请输入" @blur="delayBlur(1)"/>
                        <div class="edit_info_btn" @click="updateUsername">确认</div>
                    </div>
                </div>
                <!-- 邮箱 -->
                <div class="editional_personalInfo">
                    <div class="edit_info" v-show="!isEditional[1]">
                        <div class="edit_info_field">邮箱：{{ email }}</div>
                        <div class="edit_info_btn" @click="edit_btn1(2,$event)">编辑</div>
                    </div>
                    <div class="edit_info" v-show="isEditional[1]">
                        <input type="text" placeholder="请输入" v-model="email_update" @blur="delayBlur(2)"/>
                        <div class="edit_info_btn" style="width:150px" @click="updateEmail">获取验证码</div>
                        <input v-show="emailCode" style="width:100px;margin-left:20px" type="text" v-model="email_update_2" placeholder="验证码"/>
                        <div v-show="emailCode" class="edit_info_btn" @click="updateEmail_2">确认</div>
                    </div>
                </div>
                <!-- 性别 -->
                <div class="editional_personalInfo">
                    性别：
                    <input id="male" type="radio" name="sex" :value="0" v-model="gender"/>
                    <label class="gender" :class="gender === 0 ? 'genderSelected' : ''" for="male" @click="updateGender">男</label>
                    <input id="female" type="radio" name="sex" :value="1" v-model="gender"/>
                    <label class="gender" :class="gender === 1 ? 'genderSelected' : ''" for="female" @click="updateGender">女</label>
                </div>
                <!-- 个人简介 -->
                <div class="editional_personalInfo topAlign">
                    个人简介：
                    <div class="edit_info_textarea edit_info_textarea_2" v-show="!isEditional[2]">
                        {{ profile }}
                        <div class="edit_info_textarea_btn textarea_btn" @click="edit_btn1(3,$event)">编辑</div>
                    </div>
                    <div class="edit_info_textarea" v-show="isEditional[2]">
                        <textarea rows="3" cols="70" v-model="profile_update" @blur="delayBlur(3)"></textarea>
                        <div class="edit_info_textarea_btn textarea_btn"  @click="updateProfile">确认</div>
                    </div>
                </div>
                <!-- 出生年月 -->
                <div class="editional_personalInfo">
                    出生日期
                    <div class="editional_personalInfo_select">
                        <div class="editional_personalInfo_selected">{{ born_date.year }}</div>
                        <div class="editional_personalInfo_option">
                            <div class="option_item" v-for="i of year_extent" @click="born_date.year = i">{{ i }}</div>
                        </div>
                    </div>
                    年
                    <div class="editional_personalInfo_select">
                        <div class="editional_personalInfo_selected">{{ born_date.month }}</div>
                        <div class="editional_personalInfo_option">
                            <div class="option_item" v-for="i of month_extent" @click="born_date.month = i">{{ i }}</div>
                        </div>
                    </div>
                    月
                    <div class="editional_personalInfo_select">
                        <div class="editional_personalInfo_selected">{{ born_date.day }}</div>
                        <div class="editional_personalInfo_option">
                            <div class="option_item" v-for="i of day_extent" @click="born_date.day = i">{{ i }}</div>
                        </div>
                    </div>
                    日
                    <div class="update_bornDate" @click="updateBirthday()">确认修改</div>
                    <div v-show="restore_bornDate_isshow" class="restore_bornDate update_bornDate" @click="restore_bornDate">还原</div>
                </div>
                <!-- 个人技能 -->
                <div class="editional_personalInfo">
                    技能
                    <div class="skill_label" @click="delete_skill_point(i)" v-for="i in skills">{{ i }}</div>
                    <div v-show="add_skill_input">
                        <input class="input_skill" v-model="skill_point" @blur="add_skill_input_blur" @keydown.enter="add_skill_input_enter" type="text" maxlength="20"/>
                    </div>
                    <div>
                        <svg @click="add_skill" t="1689328850177" class="icon add_skill" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2299" width="200" height="200"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="2300"></path></svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- 选择头像确认框 -->
        <div class="confirm_box" v-show="control_confirm_box">
            <div class="confirm_inbox">
                <div class="confirm_inbox_image">
                    <img class="confirm_image" ref="confirm_image"/>
                </div>
                <div class="confirm_inbox_cancel" @click="cancel_send">取消</div>
                <div class="confirm_inbox_confirm" @click="confirm_send">确定</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, reactive, ref, watch, onMounted } from 'vue';
import { getUserInfo,updateUserInfo,uploadImage,getImage } from '../../api/user'
import { sendCode,loginByCode } from '../../api/enter'
import useUserStore from '../../store/modules/user'
import { useRouter } from 'vue-router'
import spark from 'spark-md5'

let userStore = useUserStore()
let $router = useRouter()

//可编辑数组
let isEditional = reactive([false,false,false])
//男女值
let gender = ref(0)
//年份区间
let year_extent = reactive([])
//月份区间
let month_extent = reactive([])
//天数区间
let day_extent = reactive([])

//初始出生日期
let born_date = reactive({
    year:2023,
    month:7,
    day:6
})
let byear,bmonth,bday

//账号
let account = ref('')
//用户名
let username = ref('')
//邮箱
let email = ref('')
//个人简介
let profile = ref('')
//入站时长
let enter_time = ref('')
//创作文章数量
let articles = ref(0)
//点赞总量
let approved_sum = ref(0)
//评论总量
let commented_sum = ref(0)
//访问总量
let visited_sum = ref(0)

//初始化界面获取个人信息
const initInfo = async () => {
    try {
        let result = await getUserInfo()
        let {data} = result
        byear = born_date.year = data.birthday.split('-')[0]
        bmonth = born_date.month = data.birthday.split('-')[1]
        bday = born_date.day = data.birthday.split('-')[2]
        account.value = data.account
        username.value = data.username
        email.value = data.email
        profile_update.value = profile.value = data.profile
        enter_time.value = cal_enter_time(data.create_time)
        gender.value = data.gender
        let {skill} = data
        skill = skill === null ? [] : JSON.parse(skill)
        skills.splice(0,skills.length)
        skill.forEach(i => skills.push(i))
        articles.value = data.articles_num
        approved_sum.value = data.approved_sum
        commented_sum.value = data.commented_sum
        visited_sum.value = data.visited_sum
    } catch (error) {
        console.log('请求出错')
    }
}

//计算入站时间
const cal_enter_time = (value) => {
    let [date] = value.split(' ')
    let [year,month,day] = date.split('-')
    let date_now = new Date()
    if(date_now.getFullYear() - parseInt(year) > 0){
        return date_now.getFullYear() - parseInt(year) + '年'
    }else if(date_now.getMonth() + 1 - parseInt(month) > 0){
        return date_now.getMonth() + 1 - parseInt(month) + '月'
    }else{
        return date_now.getDate() - parseInt(day) + '天'
    }
}

onMounted(() => {
    document.title = 'CFS-个人中心'
    initInfo()
    initImage()
})

//获取头像图片
const initImage = async () => {
    try {
        let result = await getImage()
        if(result.image.data === '') return
        document.querySelector('#head_image').src = parseBuffer(result.image.data)
    } catch (error) {
        console.log(error,'请求失败')
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

//控制还原按钮展示值
let restore_bornDate_isshow = ref(false)
//每月天数数组
let days_in_month = [31,new Date().getFullYear() % 4 ? 28 : 29,31,30,31,30,31,31,30,31,30,31]

//技能标签组
let skills = reactive([])
//技能输入框
let add_skill_input = ref(false)
//技能输入款值
let skill_point = ref('')

//初始化日期选择列表
function init(){
    for(let i = 1949;i<=new Date().getFullYear();i++){
        year_extent.unshift(i)
    }
    for(let i = 1;i<=12;i++){
        month_extent.push(i)
    }
    for(let i = 1;i<=days_in_month[new Date().getMonth()];i++){
        day_extent.push(i)
    }
}
init()

//进入编辑
const edit_btn1 = (num,e) => {
    isEditional[num-1] = !isEditional[num-1]
    nextTick(() => {
        e.target.parentNode.nextElementSibling.children[0].focus()
    })
}

//监视日期变化
watch(born_date,() => {
    restore_bornDate_isshow.value = true
})
//还原日期数据
const restore_bornDate = () => {
    born_date.year = byear
    born_date.month = bmonth
    born_date.day = bday
    nextTick(() => {
        restore_bornDate_isshow.value = false
    })
}

//添加技能
const add_skill = (e) => {
    add_skill_input.value = true
    nextTick(() => {
        setTimeout(() => {
            document.querySelector('.input_skill').focus()
        },0)
    })
}
//技能输入框失焦
const add_skill_input_blur = () => {
    skill_point.value = ''
    add_skill_input.value = false
}
//技能输入框回车确认
const add_skill_input_enter = async () => {
    if(skills.some(i => new RegExp('^' + i + '$','i').test(skill_point.value))){
        alert('该技能已存在')
        return
    }
    if(skills.length >= 5){
        alert('技能标签最多为5个!')
        return
    }
    skills.push(skill_point.value)
    try {
        let result = await updateUserInfo('skill',JSON.stringify(skills))
        initInfo()
    } catch (error) {
        console.log(error,'请求出错')
    }

    skill_point.value = ''
    add_skill_input.value = false
}
//删除技能点
const delete_skill_point = async (index) => {
    skills.splice(skills.indexOf(index),1)
    try {
        let result = await updateUserInfo('skill',JSON.stringify(skills))
        initInfo()
    } catch (error) {
        console.log(error,'请求出错')
    }
}

let username_update = ref('')
//更新用户名
const updateUsername = async () => {
    try {
        let result = await updateUserInfo('username',username_update.value)
        initInfo()
        alert(result.message)
        username_update.value = ''
    } catch (error) {
        console.log(error,'请求出错')
    }
}
let email_update = ref('')
let timer_blur2 = null
let emailCode = ref(false)
//更新邮箱 1
const updateEmail = async () => {
    if(timer_blur2 !== null){
        clearTimeout(timer_blur2)
        timer_blur2 = null
    }
    if(email_update.value === '' || !/^([\d,a-z]{6,})@[\d,a-z]{2,}\.([a-z]{2,})$/.test(email_update.value)){
        alert('请规范邮箱格式')
        return
    }
    try {
        let result = await sendCode(email_update.value,1)
        if(result.code === 1){
            emailCode.value = true
        }else{
            alert(result.message)
        }
    } catch (error) {}
}
let email_update_2 = ref('')
//更新邮箱 2
const updateEmail_2 = async () => {
    try {
        let result = await loginByCode({email:email_update.value,identifyingCode:email_update_2.value,isUpdate:true})
        if(result.code === 1){
            emailCode.value = false
            isEditional[1] = !isEditional[1]
            initInfo()
            alert(result.message)
        }else{
            alert(result.message)
        }
    } catch (error) {}
}
let profile_update = ref('')
//更新简介
const updateProfile = async () => {
    if(profile_update.value.length>100){
        alert('简介字数不得超过100字')
        return
    }
    try {
        let result = await updateUserInfo('profile',profile_update.value)
        initInfo()
        alert(result.message)
        profile_update.value = ''
    } catch (error) {
        console.log(error,'请求出错')
    }
}

//更新出生日期
const updateBirthday = async () => {
    try {
        let result = await updateUserInfo('birthday',born_date.year + '-' + born_date.month + '-' + born_date.day)
        initInfo()
        alert(result.message)
    } catch (error) {
        console.log(error,'请求出错')
    }
}

let timer_gender = null
//更新性别
const updateGender = () => {
    if(timer_gender !== null){
        clearTimeout(timer_gender)
        timer_gender = null
    }
    timer_gender = setTimeout(async () => {
        try {
            let result = await updateUserInfo('gender',gender.value)
        } catch (error) {
            console.log(error,'请求出错')
        }
    },2000)
}

//延迟失焦
const delayBlur = (n) => {
    switch(n){
        case 1:
            setTimeout(() => {isEditional[0] = !isEditional[0]},100)
            break
        case 2:
            timer_blur2 = setTimeout(() => {isEditional[1] = !isEditional[1]},100)
            break
        case 3:
            setTimeout(() => {isEditional[2] = !isEditional[2]},100)
    }
    
}

//退出登录
const logout = () => {
    if(!confirm('你确定要退出登录吗？')) return
    userStore.logout()
    localStorage.removeItem('token')
    $router.push('/home')
}

let select_file = ref()
//上传头像
const upload_image = () => {
    select_file.value.click()
}

//确认框图片
let confirm_image = ref()

//文件选中时触发
const file_input = async () => {
    let file = select_file.value.files[0]
    if(!/(PNG|JPG|JPEG)/i.test(file.type)){
        alert('上传的文件只能是，PNG/JPG/JPEG的格式')
        return
    }
    if(file.size>10*1024*1024){
        alert('上传的文件不能超过10MB')
        return
    }
    confirm_image.value.src = await changeBase64(file)
    control_confirm_box.value = true
}

//确认上传图片
const confirm_send = async () => {
    control_confirm_box.value = false
    let file = select_file.value.files[0]
    //根据图片内容生成hash值并作为图片名字
    //spark.hash(await changeBase64(file))
    //获取文件后缀名
    let ext = '.' + file.name.split('.')[file.name.split('.').length-1]
    let renameFile =new File([file],spark.hash(await changeBase64(file)) + ext,{type:file.type});
    let formData = new FormData()
    formData.append('file',renameFile)
    try {
        let result = await uploadImage(formData)
        console.log(result)
    } catch (error) {
        console.log(error,'上传失败')
    }finally{
        //清空input中的内容
        select_file.value.value = ''
    }
    initImage()
}

//取消上传图片
const cancel_send = () => {
    control_confirm_box.value = false
    //清空input中的内容
    select_file.value.value = ''
}

//控制确认上传图片的弹窗变量
let control_confirm_box = ref(false)

//将文件转成base64码
const changeBase64 = file => {
    return new Promise(resolve => {
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = event => {
            resolve(event.target.result)
        }
    })
}
</script>

<style scoped>
.container_1 .input_skill,
.container_1 .editional_personalInfo textarea,
.container_1 .personalCenter_showBox{
    border: 1px solid var(--theme_1_border);
}
.container_2 .input_skill,
.container_2 .editional_personalInfo textarea,
.container_2 .personalCenter_showBox{
    border: 1px solid var(--theme_2_border);
}
.container_3 .input_skill,
.container_3 .editional_personalInfo textarea,
.container_3 .personalCenter_showBox{
    border: 1px solid var(--theme_3_border);
}
.container_1 .update_image_svg > path{
    fill: var(--theme_1_border);
}
.container_2 .update_image_svg > path{
    fill: var(--theme_2_border);
}
.container_3 .update_image_svg > path{
    fill: var(--theme_3_border);
}
.container_1 .gender,
.container_1 .edit_info > input{
    border: 2px solid var(--theme_1_border);
}
.container_2 .gender,
.container_2 .edit_info > input{
    border: 2px solid var(--theme_2_border);
}
.container_3 .gender,
.container_3 .edit_info > input{
    border: 2px solid var(--theme_3_border);
}
.container_1 .update_bornDate,
.container_1 .textarea_btn,
.container_1 .edit_info > .edit_info_btn{
    background-color: var(--theme_1_border);
    color: var(--theme_1_background);
    border: 2px solid var(--theme_1_border);
}
.container_2 .update_bornDate,
.container_2 .textarea_btn,
.container_2 .edit_info > .edit_info_btn{
    background-color: var(--theme_2_border);
    color: var(--theme_2_background);
    border: 2px solid var(--theme_2_border);
}
.container_3 .update_bornDate,
.container_3 .textarea_btn,
.container_3 .edit_info > .edit_info_btn{
    background-color: var(--theme_3_color);
    color: var(--theme_3_background);
    border: 2px solid var(--theme_3_border);
}
.container_1 .update_bornDate:hover,
.container_1 .textarea_btn:hover,
.container_1 .edit_info > .edit_info_btn:hover{
    background-color: var(--theme_1_background);
    color: var(--theme_1_color);
}
.container_2 .update_bornDate:hover,
.container_2 .textarea_btn:hover,
.container_2 .edit_info > .edit_info_btn:hover{
    background-color: var(--theme_2_background);
    color: var(--theme_2_color);
}
.container_3 .update_bornDate:hover,
.container_3 .textarea_btn:hover,
.container_3 .edit_info > .edit_info_btn:hover{
    background-color: var(--theme_3_background);
    color: var(--theme_3_color);
}
.container_1 .genderSelected{
    background-color: var(--theme_1_border);
    color: var(--theme_1_background);
}
.container_2 .genderSelected{
    background-color: var(--theme_2_border);
    color: var(--theme_2_background);
}
.container_3 .genderSelected{
    background-color: var(--theme_3_color);
    color: var(--theme_3_background);
}
.container_1 .editional_personalInfo_select{
    color: var(--theme_1_color);
}
.container_1 .editional_personalInfo_select:hover{
    border: 2px solid var(--theme_1_border);
}
.container_1 .editional_personalInfo_option{
    background-color: var(--theme_1_border);
    color: var(--theme_1_background);
}
.container_2 .editional_personalInfo_select{
    color: var(--theme_2_color);
}
.container_2 .editional_personalInfo_select:hover{
    border: 2px solid var(--theme_2_border);
}
.container_2 .editional_personalInfo_option{
    background-color: var(--theme_2_border);
    color: var(--theme_2_background);
}
.container_3 .editional_personalInfo_select{
    color: var(--theme_3_color);
}
.container_3 .editional_personalInfo_select:hover{
    border: 2px solid var(--theme_3_border);
}
.container_3 .editional_personalInfo_option{
    background-color: var(--theme_3_border);
    color: var(--theme_3_background);
}
.container_1 .add_skill > path{
    fill:var(--theme_1_border);
}
.container_2 .add_skill > path{
    fill:var(--theme_2_border);
}
.container_3 .add_skill > path{
    fill:var(--theme_3_color);
}
.personalCenter_box{
    position: absolute;
    width: 100%;
    height: 100%;
}
.mainly_page{
    position: absolute;
    width: 70%;
    height: 200px;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
}
.personalCenter_topContent{
    float: left;
    width: 100%;
    margin-top: 10px;
    height: calc(30% - 10px);
}
.personalCenter_achievement{
    position: relative;
    float: left;
    width: 30%;
    margin-top: 10px;
    height: calc(70% - 20px);
}
.personalCenter_editionalContent{
    display: flex;
    flex-direction: column;
    float: left;
    width: calc(70% - 10px);
    margin: 10px 0 0 10px;
    height: calc(70% - 20px);
    box-sizing: border-box;
    padding: 10px 20px;
}
.personalCenter_showBox{
    box-sizing: border-box;
    border-radius: 5px;
}
.personalCenter_topContent_head{
    position: relative;
    float: left;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.personalCenter_topContent_name{
    float: left;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    box-sizing: border-box;
    padding: 20px;
}
.personalCenter_topContent_visited{
    float: left;
    width: 20%;
    height: 50%;
    display: flex;
    justify-content: end;
    box-sizing: border-box;
    padding: 20px;
}
.personalCenter_topContent_email{
    float: left;
    width: 70%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    box-sizing: border-box;
    padding: 20px;
}
.head_image{
    position: absolute;
    width: 200px;
    height: 200px;
    background-image: url('../../assets/cat.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
}
.head_image::before{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0,0.3);
    clip-path: circle(0% at 50% 50%);
    transition: clip-path .2s;
}
.head_image:hover::before{
    clip-path: circle(50% at 50% 50%);
}
.head_image:hover + .update_image{
    display: block;
}
.update_image{
    display: none;
    pointer-events: none;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
.update_image_svg{
    width: 100px;
    height: 100px;
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
.achievement_title{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
.various_sum{
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 20px;
}
.editional_personalInfo{
    position: relative;
    flex: 1;
    margin: 10px 0;
    display: flex;
    align-items: center;
}
.editional_personalInfo > input{
    display: none;
}
.editional_personalInfo textarea{
    background-color: rgb(0, 0, 0, 0);
}
.topAlign{
    align-items: flex-start;
}
.edit_info{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.edit_info > input{
    background-color: rgb(0, 0, 0, 0);
    border-radius: 10px;
    height: 50px;
    width: 500px;
    box-sizing: border-box;
    padding: 0 10px;
}
.edit_info > .edit_info_btn{
    margin-left: 20px;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    box-sizing: border-box;
    user-select: none;
}
.gender{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
}
.edit_info_textarea{
    position: absolute;
    margin-left: 100px;
    width: 750px;
    height: 80px;
}
.edit_info_textarea_2{
    word-break: break-all;
    overflow-y: auto;
}
.edit_info_textarea_btn{
    position: absolute;
    bottom: 5px;
    right: 10px;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
}
.editional_personalInfo_select{
    position: relative;
    height: 40px;
    width: 100px;
    background-color: rgb(0,0,0,0);
    margin-left: 20px;
    border: 2px solid #00000000;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 5px;
}
.editional_personalInfo_select:hover > .editional_personalInfo_option{
    display: block;
}
.editional_personalInfo_selected{
    height: 100%;
    line-height: 30px;
    text-align: center;
    user-select: none;
}
.editional_personalInfo_option{
    display: none;
    position: absolute;
    top: 40px;
    left: 0px;
    width: 100%;
    height: 120px;
    font-size: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 2;
}
.editional_personalInfo_option::-webkit-scrollbar{
    width: 0;
}
.option_item{
    width: 100%;
    text-align: center;
    height: 30px;
    user-select: none;
    cursor: pointer;
}
.option_item:hover{
    background-color: rgb(255, 255, 255, 0.3);
}
.update_bornDate{
    width: 100px;
    height: 30px;
    border-radius: 5px;
    line-height: 28px;
    text-align: center;
    margin-left: 20px;
    user-select: none;
}
.add_skill{
    width: 40px;
    height: 40px;
    transition: transform .3s;
    margin-left: 10px;
    border-radius: 50%;
}
.add_skill:hover{
    transform: rotate(180deg);
}
.skill_label{
    position: relative;
    padding: 3px;
    border-radius: 5px;
    margin: 0 10px;
}
.skill_label:nth-of-type(1){
    margin-left: 20px;
}
.skill_label:hover::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgb(0, 0, 0, 0.3);
}
.input_skill{
    width: 150px;
    height: 30px;
    background-color: rgb(0,0,0,0);
    border-radius: 5px;
}
.confirm_box{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(3px);
}
.confirm_inbox{
    position: absolute;
    width: 500px;
    height: 300px;
    top: 34%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    overflow: hidden;
    border-width: 3px;
    border-style: solid;
}
.confirm_inbox_image{
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm_inbox_cancel,.confirm_inbox_confirm{
    position: absolute;
    width: 150px;
    height: 50px;
    right: 25px;
    text-align: center;
    line-height: 50px;
    border-width: 3px;
    border-style: solid;
    border-radius: 5px;
    transform-origin: 50% 50%;
    transition: all .2s;
    user-select: none;
    cursor: pointer;
}
.confirm_inbox_cancel:hover,.confirm_inbox_confirm:hover{
    width: 160px;
    right: 20px;
}
.confirm_inbox_cancel{
    top: 30px;
}
.confirm_inbox_confirm{
    bottom: 30px;
}
.confirm_image{
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
}
</style>