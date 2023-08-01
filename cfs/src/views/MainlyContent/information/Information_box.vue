<template>
    <div class="information_comment_mainly">
        <TransitionGroup name="list" tag="div">
            <div class="information_comment_item" v-for="item in hasBeenCommented" :key="item">
                {{ item.commenter_name }}评论了你。
                <span>{{ item.comment_time }}</span>
                <span @click="deleteInfo(item)">删除</span>
            </div>
            <div class="information_comment_item" v-for="item in hasBeenAorC" :key="item">
                {{ item.giver_name }}认可了你。
                <span>{{ item.give_time }}</span>
                <span @click="deleteInfo(item)">删除</span>
            </div>
        </TransitionGroup>
        <div class="zero_item_tip" v-if="typeof hasBeenCommented === 'object'&&hasBeenCommented.length === 0">暂无消息</div>
        <div class="zero_item_tip" v-if="typeof hasBeenAorC === 'object'&&hasBeenAorC.length === 0">暂无消息</div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { deleteCommentInfo,deleteGiveInfo } from '../../../api/search'

let props = defineProps(["hasBeenCommented","hasBeenAorC"]);
let $emit = defineEmits(['update:hasBeenCommented','update:hasBeenAorC']);

let value = ref('')

for(let i in props){
    if(props[i] !== undefined){
        value.value = i
        break
    }
}

const deleteInfo = async (item) => {

    try {
        let result = value.value === 'hasBeenCommented' ? await deleteCommentInfo(item.id) : await deleteGiveInfo(item.id)
        console.log(result)
        for(let i in props){
            if(i === value.value){
                $emit(`update:${i}`,props[i].splice(props[i].indexOf(item),1))
            }
        }
    } catch (error) {
        console.log(error,'请求失败')
    }

}

</script>

<style scoped>
.information_comment_mainly{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
}
.information_comment_item{
    position: relative;
    margin: 20px 0 0 10%;
    width: 80%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
}
.information_comment_item > span:first-of-type{
    position: absolute;
    right: 100px;
}
.information_comment_item > span:last-of-type{
    position: absolute;
    right: 0px;
    user-select: none;
    cursor: pointer;
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
.zero_item_tip{
    position: absolute;
    width: 500px;
    height: 100px;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    font-size: 50px;
    line-height: 100px;
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>