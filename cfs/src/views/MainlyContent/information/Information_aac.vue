<template>
    <Information_box v-model:hasBeenAorC="hasBeenAorC"/>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import Information_box from './Information_box.vue'
import { getAACInfo } from '../../../api/user'

//初始化消息
const init = async () => {
    try {
        let result = await getAACInfo()
        hasBeenAorC.splice(0,hasBeenAorC.length)
        result.data.forEach(i => hasBeenAorC.push(i))
    } catch (error) {
        console.log(error,'请求失败')
    }
}

onMounted(() => {
    init()
})

let hasBeenAorC = reactive([])
</script>

<style scoped>
</style>