import Vue from 'vue'
import VueRouter from 'vue-router'

// 这样引入实现路由懒加载
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Welcome.vue')

const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/User/user.vue')

const GoodsList = () => import(/* webpackChunkName: "GoodsList_Add" */ '@/components/Goods/list.vue')

const Order = () => import(/* webpackChunkName: "Order_Report" */ '@/components/Order/order.vue')
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        component: Login,
    },
    {
        path:'/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            // { path: '/rights', component: Rights },
            // { path: '/roles', component: Roles },
            // { path: '/categories', component: Cate },
            // { path: '/params', component: Params },
            { path: '/goods', component: GoodsList },
            // { path: '/goods/add', component: Add },
            { path: '/orders', component: Order },
            // { path: '/reports', component: Report },
        ]
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
