import { defineStore } from "pinia";

let themeSettingStore = defineStore('ThemeStore',{
    state:() => {
        return{
            //默认主题  默认为主题方案数组的第一项
            defaultTheme: parseInt(sessionStorage.getItem('CodeFragmentSharingTheme')) || 1,
            //主题方案数组
            Theme_plans:[],
        }
    },
    actions:{
        //修改主题方案
        setTheme(){
            if(this.defaultTheme < this.Theme_plans.length){
                this.defaultTheme++
                sessionStorage.setItem('CodeFragmentSharingTheme',this.defaultTheme)
            }else{
                this.defaultTheme = 1
                sessionStorage.setItem('CodeFragmentSharingTheme',this.defaultTheme)
            }
        },
        //设置主题方案的class组
        setThemeClass(...classesArgs){
            if(classesArgs.length === 0) return
            this.Theme_plans = classesArgs
        },
    },
    getters:{
        //获取主题色方案
        getTheme(state){
            if(state.Theme_plans.length === 0){
                console.warn('您并未传入任何主题类！')
                return []
            }
            return state.Theme_plans[state.defaultTheme-1]
        },
        //获取当前主题色索引
        getdefaultTheme(state){
            return state.defaultTheme
        }
    }
})

export default themeSettingStore