<template>
    <div class="registerBox">
        <!-- 网站名 -->
        <div class="webTitle">CodeFragmentSharing</div>
        <!-- 注册区域 -->
        <div class="registerBox_top">
            <!-- 账号 -->
            <div class="register_top_item">
                <div class="register_field">账号 : </div>
                <input type="text" autoComplete="{'off'}" v-model="userInfo.account" @keydown.enter="next(1,$event)"/>
                <div class="errorTip">{{ errorAccount }}</div>
            </div>
            <!-- 用户名 -->
            <div class="register_top_item">
                <div class="register_field">用户名 : </div>
                <input type="text" autoComplete="{'off'}" v-model="userInfo.username" @keydown.enter="next(2,$event)" ref="input_name"/>
                <div class="errorTip">{{ errorName }}</div>
            </div>
            <!-- 邮箱 -->
            <div class="register_top_item">
                <div class="register_field">邮箱 : </div>
                <input type="text" autoComplete="{'off'}" v-model="userInfo.email" @keydown.enter="next(3,$event)" ref="input_email"/>
                <div class="errorTip">{{ errorEmail }}</div>
            </div>
            <!-- 密码 -->
            <div class="register_top_item">
                <div class="register_field">密码 : </div>
                <input type="text" autoComplete="{'off'}" v-model="userInfo.password" @keydown.enter="next(4,$event)" ref="input_password"/>
                <div class="errorTip">{{ errorPassword }}</div>
            </div>
            <!-- 再次确认密码 -->
            <div class="register_top_item">
                <div class="register_field">确认密码 : </div>
                <input type="text" autoComplete="{'off'}" v-model="comfirmPassword" @keydown.enter="next(5,$event)" ref="input_confirmPassword"/>
                <div class="errorTip">{{ errorConfirmPassword }}</div>
            </div>
            <!-- 验证码 -->
            <div class="register_top_item">
                <div class="register_field">验证码 : </div>
                <input type="text" autoComplete="{'off'}" v-model="userInfo.identifyingCode" @keydown.enter="next(6,$event)" ref="input_identifyingCode"/>
                <div class="identifyCode" @click="getIdentifyCode">{{ identifyCode }}</div>
                <div class="errorTip">{{ errorIdentifyingCode }}</div>
            </div>
        </div>
        <!-- 注册按钮 -->
        <div class="registerBox_bottom">
            <div class="register_btn" @click="register">注册</div>
            <div class="lastTip">{{ lastTip }}</div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import useUserStore from '../store/modules/user'
import { sendCode } from '../api/enter'
let $emit = defineEmits(['turn_to_login_page']);
//使用用户仓库
let userStore = useUserStore()

//账号验证提示
let errorAccount = ref('')
//用户名验证提示
let errorName = ref('')
//邮箱验证提示
let errorEmail = ref('')
//密码验证提示
let errorPassword = ref('')
//确认密码验证提示
let errorConfirmPassword = ref('')
//验证码验证提示
let errorIdentifyingCode = ref('')

//获取input元素
let input_name = ref()
let input_email = ref()
let input_password = ref()
let input_confirmPassword = ref()
let input_identifyingCode = ref()

//注册的用户信息
let userInfo = reactive({
    account:'',
    username:'',
    email:'',
    password:'',
    identifyingCode:'',
    create_time:''
})

//确认密码
let comfirmPassword = ref('')
//注册错误提示
let lastTip = ref('')
//检测值
let pass = new Array(false,false,false,false,false,false)
//非空校验
let isNull = ref(6)

//判断字段是否填写完整
const isNullJudge = (newvalue,oldvalue) => {
    if(newvalue !== ''&&oldvalue === ''){
        isNull.value--
    }else if(newvalue === ''&&oldvalue !== ''){
        isNull.value++
    }
    
}

//账号检测
let timer
watch(() => userInfo.account,(newvalue,oldvalue) => {
    lastTip.value = ''
    isNullJudge(newvalue,oldvalue)
    clearTimeout(timer)
    errorAccount.value = ''
    pass[0] = true
    if(!/^[\w]{8,16}$/.test(newvalue)&&newvalue !== ''){
        timer = setTimeout(() => {
            errorAccount.value = '账号只能是数字、英文和下划线且长度为8~16位！'
            pass[0] = false
            clearTimeout(timer)
        },1000)
    }
})
//用户名检测
let timer_2
watch(() => userInfo.username,(newvalue,oldvalue) => {
    lastTip.value = ''
    isNullJudge(newvalue,oldvalue)
    clearTimeout(timer_2)
    errorName.value = ''
    pass[1] = true
    if(!/^(?!_)(?!.*?_$)[\u4e00-\u9fa5,\w]{1,10}$/.test(newvalue)&&newvalue !== ''){
        timer_2 = setTimeout(() => {
            errorName.value = '用户名只含有汉字、数字、字母、下划线，不能以下划线开头和结尾且长度不超过十位！'
            pass[1] = false
            clearTimeout(timer_2)
        },1000)
        return
    }
})
//邮箱检测
let timer_3
watch(() => userInfo.email,(newvalue,oldvalue) => {
    lastTip.value = ''
    isNullJudge(newvalue,oldvalue)
    clearTimeout(timer_3)
    errorEmail.value = ''
    pass[2] = true
    if(!/^([\d,a-z]{6,})@[\d,a-z]{2,}\.([a-z]{2,})$/.test(newvalue)&&newvalue !== ''){
        timer_3 = setTimeout(() => {
            errorEmail.value = '请输入正确的邮箱格式！'
            pass[2] = false
            clearTimeout(timer_3)
        },1000)
        return
    }
})
//密码检测
let timer_4
watch(() => userInfo.password,(newvalue,oldvalue) => {
    lastTip.value = ''
    isNullJudge(newvalue,oldvalue)
    clearTimeout(timer_4)
    errorPassword.value = ''
    pass[3] = true
    if(!/^[0-9,a-z,A-Z,_,\@,\#,\$]{6,30}$/.test(newvalue)&&newvalue !== ''){
        timer_4 = setTimeout(() => {
            errorPassword.value = '密码只能是数字、英文、_、@、#、$,且不能少于6位，多于30位！'
            pass[3] = false
            clearTimeout(timer_4)
        },1000)
        return
    }
})
//确认密码检测
let timer_5
watch(comfirmPassword,(newvalue,oldvalue) => {
    lastTip.value = ''
    isNullJudge(newvalue,oldvalue)
    clearTimeout(timer_5)
    errorConfirmPassword.value = ''
    pass[4] = true
    if(userInfo.password === ''&&newvalue !== ''){
        timer_5 = setTimeout(() => {
            errorConfirmPassword.value = '请先输入密码！'
            pass[4] = false
            clearTimeout(timer_5)
        },1000)
        return
    }else if(newvalue !== ''&&newvalue !== userInfo.password){
        timer_5 = setTimeout(() => {
            errorConfirmPassword.value = '确认密码不符！'
            clearTimeout(timer_5)
        },1000)
        return
    }
})
//验证码检测
watch(() => userInfo.identifyingCode,(newvalue,oldvalue) => {
    lastTip.value = ''
    isNullJudge(newvalue,oldvalue)
    errorIdentifyingCode.value = ''
    pass[5] = true
})

//点击注册
const register = async () => {
    //判断所有字段是否填写完整
    if(isNull.value !== 0){
        lastTip.value = '以上字段信息全为必填项！'
        return
    }
    // 判断所有字段是否通过校验
    if(!pass.every(i => i)){
        lastTip.value = '请规范以上所有字段信息！'
        return
    }
    let date = new Date()
    //获取当前时间
    userInfo.create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
                         + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    try{
        //注册
        let result = await userStore.requestRegister(userInfo)
        if(result){
            alert('注册成功')
            //跳回登录页面
            $emit('turn_to_login_page')
            Object.assign(userInfo,{
                account:'',
                username:'',
                email:'',
                password:'',
                identifyingCode:'',
                create_time:''
            })
            comfirmPassword.value = ''
            clearInterval(timer_code)
            timer_code = null
            identifyCode.value = '获取验证码'
        }
    }catch{}

}

//聚焦到下一个输入框
const next = (num,e) => {
    switch(num){
        case 1:{
            if(e.target.value === ''){
                errorAccount.value = '账号不能为空'
                break
            }
            input_name.value.focus()
            break
        }
        case 2:{
            if(e.target.value === ''){
                errorName.value = '用户名不能为空'
                break
            }
            input_email.value.focus()
            break
        }
        case 3:{
            if(e.target.value === ''){
                errorEmail.value = '邮箱不能为空'
                break
            }
            input_password.value.focus()
            break
        }
        case 4:{
            if(e.target.value === ''){
                errorPassword.value = '密码不能为空'
                break
            }
            input_confirmPassword.value.focus()
            break
        }
        case 5:{
            if(e.target.value === ''){
                errorConfirmPassword.value = '请输入再次确认密码'
                break
            }
            input_identifyingCode.value.focus()
            break
        }
        case 6:{
            if(e.target.value === ''){
                errorIdentifyingCode.value = '请输入验证码'
                break
            }
            break
        }
    }
}

let identifyCode = ref('获取验证码')
let timer_code = null

//获取验证码
const getIdentifyCode = async () => {
    if(timer_code !== null) return
    if(userInfo.email === ''){
        alert('请先填写邮箱')
        return
    }
    if(!/^([\d,a-z]{6,})@[\d,a-z]{2,}\.([a-z]{2,})$/.test(userInfo.email)){
        alert('请规范邮箱格式！')
    }
    let time = 60
    identifyCode.value = time + 's后重发'
    timer_code = setInterval(() => {
        if(time === 0){
            clearInterval(timer_code)
            timer_code = null
            identifyCode.value = '获取验证码'
            return
        }
        identifyCode.value = --time + 's后重发'
    },1000)
    try {
        let isRegister = 1
        let result = await sendCode(userInfo.email,isRegister)
        console.log(result);
        if(result.code === 0){
            alert(result.message)
        }
    } catch (error) {
        console.log(error)
        alert('验证码发送出错，请稍后重新发送！')
    }
}

</script>

<style scoped>
.webTitle{
    position: absolute;
    width: 300px;
    height: 50px;
    left: calc(50% - 150px);
    top: -50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
}
.registerBox{
    position: relative;
    width: 100%;
    height: 100%;
    color: rgb(139,175,86);
    display: flex;
    flex-direction: column;
}
.registerBox_top{
    flex: 4;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.register_top_item{
    position: relative;
    height: 12%;
    width: 80%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.register_top_item > input{
    border: none;
    background-color: #00000000;
    border-bottom: 1px solid rgb(139,175,86);
}
.registerBox_bottom{
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.register_field{
    text-align: right;
    width: 100px;
}
.errorTip{
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%,-60%);
    color: red;
    font-size: 12px;
    font-weight: 100;
    white-space: nowrap;
}
.register_btn{
    width: 200px;
    height: 50px;
    background-color: rgb(139,175,86);
    color: rgb(250,248,244);
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
}
.register_btn:hover{
    background-color: rgba(139,175,86,0.8);
}
.lastTip{
    height: 20px;
    color: red;
    font-size: 16px;
    font-weight: 100;
}
.identifyCode{
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 12px;
    width: 80px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    user-select: none;
    cursor: pointer;
}
</style>