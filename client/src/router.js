import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import notFound from './views/404.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'

Vue.use(Router)

 const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {path:'',component:Home},
        {path:'/home',name:"home",component:Home},
        {path:'/infoshow',name:"infoshow",component:InfoShow}
      ]
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'*',
      name:'/404',
      component: notFound
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})

// 路由守衛
router.beforeEach((to, from, next) =>{
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next('/login')
  }
})

export default router;