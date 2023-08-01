<template>
    <router-view v-slot="{ Component }">
        <div class="box">
            <transition name="fade">
                <component :is="Component"/>
            </transition>
        </div>
    </router-view>
</template>

<script setup>
</script>

<style scoped>
.box{
    width: 100%;
    height: calc(100% - 70px);
    position: relative;
    z-index: -1;
    overflow: hidden;
}
.fade-enter-from,
.fade-leave-to{
    opacity: 0;
}
.fade-enter-active{
    transition: all .5s .2s;
}
.fade-enter-to,
.fade-leave-from{
    opacity: 1;
}
.fade-leave-active{
    transition: all .5s;
}
</style>