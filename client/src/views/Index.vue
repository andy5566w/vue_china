<template>
    <div class="index">
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
    export default {
        components:{
            'appHeader': Header
        }
    }
</script>

<style scoped>
    .index{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>