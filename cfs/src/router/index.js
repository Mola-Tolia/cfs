import { createRouter,createWebHistory } from "vue-router";
import { tokenVerify } from '../api/enter'
import userStore from '../store/modules/user'
import pinia from '../store/index'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        // 主页面
        {
            path:'/',
            name:'main',
            component:() => import('../views/Main.vue'),
            children:[
                // 首页
                {
                    path:'/home',
                    name:'home',
                    component:() => import('../views/MainlyContent/Home.vue')
                },
                // 浏览记录
                {
                    path:'/record',
                    name:'record',
                    component:() => import('../views/MainlyContent/Record.vue')
                },
                // 收藏
                {
                    path:'/collection',
                    name:'collection',
                    component:() => import('../views/MainlyContent/Collection.vue')
                },
                // 消息
                {
                    path:'/information',
                    name:'information',
                    component:() => import('../views/MainlyContent/Information.vue'),
                    children:[
                        {
                            path:'/information_comment',
                            name:'information_comment',
                            component:() => import('../views/MainlyContent/information/Information_comment.vue'),
                        },
                        {
                            path:'/information_aac',
                            name:'information_aac',
                            component:() => import('../views/MainlyContent/information/Information_aac.vue'),
                        }
                    ]
                },
                // 个人中心
                {
                    path:'/personalCenter',
                    name:'personalCenter',
                    component:() => import('../views/MainlyContent/PersonalCenter.vue')
                },
                // 个人主页
                {
                    path:'/personalPage',
                    name:'personalPage',
                    component:() => import('../views/MainlyContent/personalPage.vue')
                },
                // 发布
                {
                    path:'/publish',
                    name:'publish',
                    component:() => import('../views/MainlyContent/Publish.vue'),
                    props($router){
                        return {
                            id:$router.query.id
                        }
                    }
                },
                // 已发布
                {
                    path:'/hasPublish',
                    name:'hasPublish',
                    component:() => import('../views/MainlyContent/HasPublish.vue')
                },
                // 搜索
                {
                    path:'/search',
                    name:'search',
                    component:() => import('../views/MainlyContent/Search.vue')
                },
                // 文章
                {
                    path:'/article',
                    name:'article',
                    component:() => import('../views/MainlyContent/Article.vue')
                }
            ],
            redirect:'/home'
        },
        // 登录注册
        {
            path:'/accountEnter',
            name:'accountEnter',
            component:() => import('../views/AccountEnter.vue')
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/404/index.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: 'Any'
        },
    ]
})

router.beforeEach(async (to,from,next) => {
    //前往登录注册页面直接放行
    if(to.path === '/accountEnter'){
        next()
        return
    }
    //前往其他页面判断token是否有效
    if(localStorage.getItem('token')){
        try {
            let result = await tokenVerify()
            if(result.code === 1){
                userStore(pinia).setIsLogin()
                next()
                return
            }else{
                console.log('无效token')
            }
        } catch (error) {
            console.log(error,'token校验请求失败')
        }
    }
    //若token无效如下三个路由导航放行
    if(to.path === '/home' || to.path === '/search' || to.path === '/article'){
        next()
    }else{
        if(confirm('登录超时或还未登录，是否前往登录？')){
            next('/accountEnter')
        }else{
            next('/home')
        }
    }
})

export default router