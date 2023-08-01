<template>
    <!-- 菜单栏 -->
    <div class="box" ref="menu" @mouseleave="leaveMenu" @mouseenter="enterMenu">
        <!-- 其他 -->
        <div class="box_item_top" @click="dragOut">
            <svg t="1688991398211" class="icon iconFontSize" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20571" width="200" height="200"><path d="M376.053929 561.350639H86.337861A86.440889 86.440889 0 0 0 0 647.6885v289.922125a86.492404 86.492404 0 0 0 86.337861 86.389375H376.053929a86.492404 86.492404 0 0 0 86.389375-86.389375v-289.922125A86.440889 86.440889 0 0 0 376.053929 561.350639z m8.396821 376.053929a8.551363 8.551363 0 0 1-8.396821 8.602877H86.337861a8.499849 8.499849 0 0 1-8.345306-8.39682v-289.922125a8.448335 8.448335 0 0 1 8.345306-8.345307H376.053929a8.499849 8.499849 0 0 1 8.396821 8.345307z" p-id="20572"></path><path d="M1018.694034 287.91307l-82.422779-142.488379a38.97052 38.97052 0 1 0-67.483651 38.996277l82.422779 142.488379a8.602878 8.602878 0 0 1-3.090854 11.487675l-251.08039 144.909548a8.087735 8.087735 0 0 1-6.336251 0.824228 8.242278 8.242278 0 0 1-5.151424-3.863568L540.899487 229.18684a8.499849 8.499849 0 0 1 3.090854-11.436161l251.028876-144.961062a38.996277 38.996277 0 0 0-38.944763-67.535165L504.839521 150.215515a85.668176 85.668176 0 0 0-40.284133 52.699064 84.637891 84.637891 0 0 0-1.906027 9.272563V127.90985A86.492404 86.492404 0 0 0 376.053929 41.520475H86.337861A86.440889 86.440889 0 0 0 0 127.90985v289.922125a86.440889 86.440889 0 0 0 86.337861 86.337861H376.053929a86.440889 86.440889 0 0 0 86.595432-86.337861V238.253345a85.822719 85.822719 0 0 0 10.302847 29.929772L618.170842 519.263507a85.513633 85.513633 0 0 0 61.817084 42.087132h-68.616963a86.492404 86.492404 0 0 0-86.389375 86.337861v289.922125a86.543918 86.543918 0 0 0 86.389375 86.389375H901.499145a86.492404 86.492404 0 0 0 86.337861-86.389375v-289.922125A86.440889 86.440889 0 0 0 901.499145 561.350639h-195.187444a85.925747 85.925747 0 0 0 29.723715-10.302847l251.08039-145.16712a86.440889 86.440889 0 0 0 31.578228-117.967602zM384.656807 417.831975A8.499849 8.499849 0 0 1 376.053929 426.177281H86.337861a8.448335 8.448335 0 0 1-8.345306-8.345306V127.90985a8.499849 8.499849 0 0 1 8.345306-8.396821H376.053929a8.551363 8.551363 0 0 1 8.396821 8.396821z m524.981587 229.856525v289.922125a8.499849 8.499849 0 0 1-8.345306 8.39682h-289.922125a8.551363 8.551363 0 0 1-8.396821-8.39682v-289.922125a8.499849 8.499849 0 0 1 8.396821-8.345307H901.499145a8.448335 8.448335 0 0 1 8.139249 8.345307z" p-id="20573"></path></svg>
        </div>
        <!-- 主页 -->
        <div class="box_item" @click="personalPage">
            <svg t="1688991773853" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23400" width="200" height="200"><path d="M675.2 529.1c-2.3-0.7-4.7-1.1-7.2-1.1-13.3 0-24 10.7-24 24 0 12.6 9.7 22.9 22 23.9 139.7 29.9 237 97.1 237 175.3C903 857.1 724.1 943 503.4 943s-399.6-85.9-399.6-191.8c0-103.9 171.9-188.4 386.6-191.7v167.7c0 13.2 10.7 24 24 24s24-10.7 24-24V412.9c90.7-15.2 159.8-94.1 159.8-189.1 0-28.4-6.2-55.3-17.2-79.5-3.2-9.5-12.2-16.4-22.7-16.4-13.2 0-24 10.7-24 24 0 4.6 1.3 8.8 3.5 12.5l-0.3 0.2c8.2 18.1 12.8 38.2 12.8 59.3 0 79.5-64.4 143.9-143.8 143.9s-143.8-64.4-143.8-143.9 64.4-144 143.8-144c22 0 42.8 4.9 61.4 13.8l0.1-0.1c3.1 1.5 6.7 2.4 10.4 2.4 13.2 0 24-10.7 24-24 0-10.6-6.9-19.6-16.4-22.8-24.2-11-51.1-17.2-79.5-17.2-105.9 0-191.8 85.9-191.8 191.8 0 100.6 77.4 183 175.8 191.1v96.7C250.8 516.1 59 621.7 59 751.2 59 883.7 259.4 991 506.5 991S954 883.7 954 751.2c0-100.4-115.3-186.4-278.8-222.1z" fill="#B5B5B5" p-id="23401"></path></svg>
            <div class="tip">主页</div>
        </div>
        <!-- 历史 -->
        <div class="box_item" @mouseenter="browsingHistory" @mouseleave="leaveBrowsingHistory">
            <svg t="1688991819444" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24436" width="200" height="200"><path d="M768 540.16a35.84 35.84 0 0 1-35.84 35.84h-184.32a72.106667 72.106667 0 0 1-72.106667-72.106667V264.106667a35.84 35.84 0 0 1 72.106667 0v240.213333h185.173333a35.84 35.84 0 0 1 34.986667 35.84zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z" fill="#5E5C5C" p-id="24437"></path></svg>
            <div class="tip">历史</div>
        </div>
        <!-- 消息 -->
        <div class="box_item" @click="information">
            <svg t="1688991931083" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28105" width="200" height="200"><path d="M808.533333 789.333333h-597.333333c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667h597.333333c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666666zM580.266667 938.666667h-138.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h138.666667c23.466667 0 42.666667 19.2 42.666666 42.666667s-19.2 42.666667-42.666666 42.666667z" p-id="28106"></path><path d="M339.2 725.333333V341.333333c0-93.866667 76.8-170.666667 170.666667-170.666666s170.666667 76.8 170.666666 170.666666v384h85.333334V341.333333c0-140.8-115.2-256-256-256s-256 115.2-256 256v384h85.333333z" p-id="28107"></path></svg>
            <div class="tip">消息</div>
        </div>
        <!-- 发布 -->
        <div class="box_item" @mouseenter="enterPublish" @mouseleave="leavePublish">
            <svg t="1688991994233" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33530" width="200" height="200"><path d="M1008.848831 31.181012L399.856872 701.100505a16.719649 16.719649 0 0 1-17.853184 4.534142L16.721866 584.062962a16.719649 16.719649 0 0 1-2.833839-30.605459L988.161808 5.109695a16.719649 16.719649 0 0 1 20.687023 26.071317z m9.351668-14.452578v871.688816a16.436265 16.436265 0 0 1-21.253791 15.869497l-525.960482-158.694973a16.436265 16.436265 0 0 1-8.501516-25.787933L988.445192 6.809998a16.436265 16.436265 0 0 1 29.755307 9.918436z m-674.453635 729.996875l-20.403639-6.517829 139.424869 274.032212a16.436265 16.436265 0 0 0 30.038691 0L571.870888 832.590625a16.436265 16.436265 0 0 0-10.485204-22.387326l-96.067135-28.338388a16.436265 16.436265 0 0 0-20.970407 17.5698l9.351668 89.549306a16.436265 16.436265 0 0 1-31.172227 9.351668l-77.647183-152.177143z" p-id="33531"></path></svg>
            <div class="tip">发布</div>
        </div>
    </div>
    <!-- 历史栏 -->
    <div class="browsinghistoryBox" ref="browsinghistoryBox" @mouseleave="mouseleave" @mouseenter="mouseenter">
        <!-- 记录 -->
        <div class="browsinghistoryBox_item" @click="record">
            <svg t="1688996054679" class="icon iconFontSize bigger" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35549" width="200" height="200"><path d="M264.533333 341.333333a25.6 25.6 0 1 1 0-51.2h392.533334a25.6 25.6 0 1 1 0 51.2H264.533333z m520.021334 442.811734A204.117333 204.117333 0 0 0 853.333333 631.466667c0-60.416-26.487467-114.688-68.266666-152.234667a204.458667 204.458667 0 0 0-51.2-33.6896A203.3664 203.3664 0 0 0 648.533333 426.666667a204.1856 204.1856 0 0 0-181.828266 110.933333A203.093333 203.093333 0 0 0 443.733333 631.466667c0 17.7152 2.491733 34.816 6.724267 51.2A204.8 204.8 0 0 0 648.533333 836.266667c17.339733 0 34.065067-2.389333 50.107734-6.4512a204.117333 204.117333 0 0 0 85.947733-45.6704zM250.0608 836.266667h245.521067a257.467733 257.467733 0 0 1-81.544534-102.4H264.533333a25.6 25.6 0 0 1 0-51.2h133.154134a254.020267 254.020267 0 0 1 12.9024-145.066667H264.533333a25.6 25.6 0 0 1 0-51.2h173.329067A255.7952 255.7952 0 0 1 648.533333 375.466667c29.934933 0 58.606933 5.461333 85.333334 14.9504V250.0608A62.395733 62.395733 0 0 0 671.5392 187.733333H250.0608A62.395733 62.395733 0 0 0 187.733333 250.0608v523.8784c0 34.372267 27.989333 62.327467 62.327467 62.327467zM785.066667 415.300267c71.68 45.397333 119.466667 125.2352 119.466666 216.1664 0 117.418667-79.530667 216.3712-187.528533 246.442666-13.9264 6.109867-29.2864 9.557333-45.4656 9.557334H250.0608A113.664 113.664 0 0 1 136.533333 773.9392V250.0608A113.664 113.664 0 0 1 250.0608 136.533333h421.4784A113.664 113.664 0 0 1 785.066667 250.0608v165.205333zM742.4 614.4a25.6 25.6 0 1 1 0 51.2h-102.4a25.6 25.6 0 0 1-25.6-25.6v-119.466667a25.6 25.6 0 1 1 51.2 0V614.4h76.8z" fill="#999999" p-id="35550"></path></svg>
        </div>
        <!-- 收藏 -->
        <div class="browsinghistoryBox_item" @click="collection">
            <svg t="1688996117913" class="icon iconFontSize bigger" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36509" width="200" height="200"><path d="M720.398507 959.573333c73.045333 31.317333 136.96-15.317333 129.706666-94.293333l-20.650666-226.218667 174.634666-199.722666c38.144-43.648 19.2-102.229333-37.418666-115.114667l-258.474667-58.794667-135.68-228.010666c-29.738667-49.877333-91.306667-49.92-121.045333 0L315.74784 265.429333 57.273173 324.224C0.953173 337.066667-18.33216 395.648 19.854507 439.338667l174.634666 199.722666-24.021333 264.405334c-5.248 57.770667 44.544 94.037333 97.877333 71.125333l243.626667-104.533333 208.426667 89.472z" fill="#3D3D3D" p-id="36510"></path></svg>
        </div>
    </div>
    <!----------------------------------------------------------------------------------------------------------->
    <!-- 发布栏 -->
    <!-- 查看已发布 -->
    <div class="publishBox_item" ref="publishBox_done" @click="hasPublish" @mouseenter="enterPublishBtn" @mouseleave="leavePublishBtn">
        <div class="rotateBack" ref="rotateBack_1">
            <svg t="1689066061608" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38788" width="200" height="200"><path d="M678.35 790.25a175 175 0 1 0-35.15 35.9l65.95 53.35a25 25 0 1 0 31.5-38.85l-62.3-50.4zM262 62h499.999a150 150 0 0 1 150 150v600a150 150 0 0 1-150 150H262a150 150 0 0 1-150-150V212A150 150 0 0 1 262 62z m274.999 750a125 125 0 1 1 0-250 125 125 0 0 1 0 250zM287 212a25 25 0 0 0 0 50h450a25 25 0 1 0 0-50H287z m0 200a25 25 0 0 0 0 50h450a25 25 0 1 0 0-50H287z" p-id="38789"></path></svg>
        </div>
    </div>
    <!-- 创作 -->
    <div class="publishBox_item" ref="publishBox_do" @click="publish" @mouseenter="enterPublishBtn" @mouseleave="leavePublishBtn">
        <div class="rotateBack" ref="rotateBack_2">
            <svg t="1689066223465" class="icon iconFontSize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="39312" width="200" height="200"><path d="M977.92 945.664c21.504 0 38.912 17.408 38.912 38.912 0 10.24-4.096 20.48-11.264 27.648-7.168 7.168-17.408 11.264-27.648 11.264H47.104c-10.24 0-19.968-4.096-27.648-11.264-7.168-7.168-11.264-17.408-11.264-27.648 0-10.24 4.096-20.48 11.264-27.648 7.168-7.168 17.408-11.264 27.648-11.264H977.92zM616.448 175.104l183.296 184.32c10.24 10.24 10.24 26.624 0 36.352l-393.728 396.288c-26.112 26.112-58.88 44.544-94.72 52.224l-184.32 41.984c-28.672 6.656-54.272-20.48-45.568-49.152l52.736-179.2c9.216-31.232 26.112-59.904 48.64-82.944l397.312-399.872c4.608-5.12 11.264-7.68 18.432-7.68 6.656 0 13.312 2.56 17.92 7.68z m294.4-130.56l18.432 18.432c55.296 55.808 55.296 146.432 0 202.752l-38.4 38.4c-4.608 5.12-11.264 7.68-18.432 7.68-6.656 0-13.312-2.56-18.432-7.68l-182.784-184.32c-10.24-10.24-10.24-26.624 0-36.352l38.4-38.912c26.624-26.624 62.976-41.984 100.352-41.984 38.4 0 74.24 14.848 100.864 41.984z m0 0" p-id="39313"></path></svg>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const $router = useRouter()

let menu = ref()
let browsinghistoryBox = ref()
let publishBox_done = ref()
let publishBox_do = ref()
let rotateBack_1 = ref()
let rotateBack_2 = ref()

//控制菜单栏收起定时器
let timer = null
//控制历史栏收起定时器
let timer_2 = null
//控制发布栏收起定时器
let timer_3 = null

//鼠标进入历史项
const browsingHistory = () => {
    browsinghistoryBox.value.style.display = 'block'
}

//路由导航：浏览历史
const record = () => {
    $router.push('/record')
}

//路由导航：收藏
const collection = () => {
    $router.push('/collection')
}

//路由导航：消息
const information = () => {
    $router.push({
        name:'information_comment'
    })
}

//路由导航：发布
const publish = () => {
    if($router.currentRoute.value.path === '/publish') return
    $router.push('/publish')
}

//路由导航：已发布
const hasPublish = () => {
    $router.push('/hasPublish')
}

//路由导航：主页
const personalPage = () => {
    $router.push({
        name:'personalPage'
    })
}

//鼠标移出历史栏时
const mouseleave = () => {
    browsinghistoryBox.value.style.display = 'none'
    timer = setTimeout(() => {
        menu.value.style.height = '70px'
        menu.value.style.borderLeftWidth = '0px'
        menu.value.style.borderBottomWidth = '0px'
    },100)
}

//鼠标移出菜单栏时的消除操作
const leaveMenu = () => {
    timer = setTimeout(() => {
        menu.value.style.height = '70px'
        menu.value.style.borderLeftWidth = '0px'
        menu.value.style.borderBottomWidth = '0px'
    },100)
}
//鼠标移入历史栏时清除timer
const mouseenter = () => {
    clearTimeout(timer)
    clearTimeout(timer_2)
}
//鼠标进入菜单栏
const enterMenu = () => {
    clearTimeout(timer)
    menu.value.style.height = '470px'
    menu.value.style.borderLeftWidth = '2px'
    menu.value.style.borderBottomWidth = '2px'
}

//鼠标移出历史项时
const leaveBrowsingHistory = () => {
    timer_2 = setTimeout(() => {
        browsinghistoryBox.value.style.display = 'none'
    },100)
}

//鼠标进入发布项
const enterPublish = () => {
    clearTimeout(timer_3)
    elAppearByRoate(1)
}

//鼠标移出发布项
const leavePublish = () => {
    timer_3 = setTimeout(() => {
        elAppearByRoate(0)
    },100)
}

//鼠标进入发布栏按钮
const enterPublishBtn = () => {
    clearTimeout(timer_3)
    clearTimeout(timer)
}

//鼠标移出发布栏按钮
const leavePublishBtn = () => {
    timer_3 = setTimeout(() => {
        elAppearByRoate(0)
    },100)
    timer = setTimeout(() => {
        menu.value.style.height = '70px'
        menu.value.style.borderLeftWidth = '0px'
        menu.value.style.borderBottomWidth = '0px'
    },100)
}

//发布栏元素旋转出现或消失
const elAppearByRoate = (isAppear) => {
    if(isAppear){
        publishBox_done.value.style.transform = 'rotate(90deg)'
        publishBox_do.value.style.transform = 'rotate(270deg)'
        publishBox_done.value.style.opacity = '1'
        publishBox_do.value.style.opacity = '1'
        rotateBack_1.value.style.transform = 'rotate(-90deg)'
        rotateBack_2.value.style.transform = 'rotate(-270deg)'
    }else{
        publishBox_done.value.style.transform = 'rotate(0deg)'
        publishBox_do.value.style.transform = 'rotate(0deg)'
        rotateBack_1.value.style.transform = 'rotate(0deg)'
        rotateBack_2.value.style.transform = 'rotate(0deg)'
        setTimeout(() => {
            publishBox_done.value.style.opacity = '0'
            publishBox_do.value.style.opacity = '0'
        },350)
    }
}


</script>

<style scoped>
.container_1 path{
    /* svg图片颜色 */
    fill: var(--theme_1_color);
}
.container_1 .box{
    border-left-color: var(--theme_1_border);
    border-bottom-color: var(--theme_1_border);
}
.container_2 path{
    /* svg图片颜色 */
    fill: var(--theme_2_border);
}
.container_2 .box{
    border-left-color: var(--theme_2_border);
    border-bottom-color: var(--theme_2_border);
}
.container_3 path{
    /* svg图片颜色 */
    fill: var(--theme_3_color);
}
.container_3 .box{
    border-left-color: var(--theme_3_border);
    border-bottom-color: var(--theme_3_border);
}
.browsinghistoryBox{
    display: none;
    position: absolute;
    top: 150px;
    margin-left: -80px;
    height: 140px;
    width: 80px;
}
.browsinghistoryBox + .box{
    border-left: 2px solid rgb(72, 105, 137);
    border-bottom: 2px solid rgb(72, 105, 137);
}
.browsinghistoryBox_item{
    position: relative;
    height: 50%;
    width: 100%;
}
.bigger{
    transition: width,height .3s;
}
.bigger:hover{
    width: 50px;
    height: 50px;
}
.box{
    position: relative;
    width: 100%;
    height: 70px;
    transition: height .3s;
    overflow: hidden;
    box-sizing:border-box;
    border-radius: 0 0 0 5px;
    z-index: 2;
    border-left-width: 0px;
    border-bottom-width: 0px;
    border-left-style: solid;
    border-bottom-style: solid;
}
.box_item_top{
    position: relative;
    float: right;
    width: 100px;
    right: 0;
    height: 70px;
    text-align: center;
    transition: background-color .3s;
    box-sizing: border-box;
}
.box_item{
    position: relative;
    float: right;
    width: 100px;
    height: 100px;
    text-align: center;
    transition: background-color .3s;
    box-sizing: border-box;
}
.box_item:hover{
    background-color: rgb(255, 255, 255, 0.3);
}
.iconFontSize{
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.tip{
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%,-100%);
    height: 30px;
    line-height: 30px;
    transition: opacity .5s;
}
.box_item:hover .tip{
    opacity: 1;
}
.publishBox_item{
    opacity: 0;
    position: absolute;
    width: 100px;
    height: 100px;
    top: 370px;
    right: 0;
    transform-origin: left bottom;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    transition: transform .5s;
}
.rotateBack{
    width: 100%;
    height: 100%;
    transition: transform .5s;
}
.publishBox_item:hover .rotateBack{
    animation: clipPath 1.8s ease-out 1 forwards;
}
@keyframes clipPath {
    0%{
        clip-path: circle(0%);
    }100%{
        clip-path: circle(100%);
    }
}
</style>