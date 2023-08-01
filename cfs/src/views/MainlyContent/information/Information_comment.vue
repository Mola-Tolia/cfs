<template>
    <Information_box v-model:hasBeenCommented="hasBeenCommented"/>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import Information_box from './Information_box.vue'
import { getCommentInfo } from '../../../api/user'

//初始化消息
const init = async () => {
    try {
        let result = await getCommentInfo()
        hasBeenCommented.splice(0,hasBeenCommented.length)
        result.data.forEach(i => hasBeenCommented.push(i))
    } catch (error) {
        console.log(error,'请求失败')
    }
}

onMounted(() => {
    init()
})

let hasBeenCommented = reactive([])
</script>

<style scoped>
</style>