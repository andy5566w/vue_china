<template>
    <el-row class="menu_page">
    <el-col>
        <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff">
        <router-link to="/home">
            <el-menu-item index="0">
                <i class="fa fa-margin fa-server"></i>
                <span slot="title">首頁</span>
            </el-menu-item>
        </router-link>
        </el-menu>
    </el-col>
    </el-row>
</template>

<script>
    export default {
        name:'left-manu',
        data(){
            return {
                items:[
                    {
                        icon: 'fa-money',
                        name:'資金管理',
                        path: 'fund',
                        children:[
                            {path: 'fundlist',name:'資金流水'}
                        ]
                    },
                    {
                        icon: 'fa-asterisk',
                        name:'訊息管理',
                        path: 'info',
                        children:[
                            {path: 'infoshow',name:'個人訊息'}
                        ]
                    }
                ]
            }
        }
        
    }
</script>

<style scoped>

</style>