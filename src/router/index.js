import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        component:()=>import('../components/Login.vue'),
    },
    {
        path:'/home',
        component:()=>import('../components/Home/Home.vue'),
    },
  ]

 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 //利用路由导航守卫判断用户是否登录
// 利用token来判断，若此时session中还有token则可以继续访问
router.beforeEach((to,from,next)=>{
    if(to.path=='/login') return next();
    const tokenStr=window.sessionStorage.getItem('token');
    if(!tokenStr) return next('/login');
    next()
  })

export default router
