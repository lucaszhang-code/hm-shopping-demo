import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/index.vue";
import Layout from "@/views/layout/index.vue";
import Myorder from "@/views/myorder/index.vue";
import Pay from "@/views/pay/index.vue";
import Search from "@/views/search/index.vue";
import SearchList from "@/views/search/list.vue"
import Prodetail from "@/views/prodetail/index.vue";
import Home from "@/views/layout/home.vue";
import Category from "@/views/layout/category.vue";
import Cart from "@/views/layout/cart.vue";
import User from "@/views/layout/user.vue";
import store from "@/store";
import login from "@/views/login/index.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/login', component: Login},
        {
            path: '/', component: Layout,
            children: [
                {path: '/home', component: Home},
                {path: '/category', component: Category},
                {path: '/cart', component: Cart},
                {path: '/user', component: User}
            ],
            redirect: '/home'
        },
        {path: '/myorder', component: Myorder},
        {path: '/pay', component: Pay},
        {path: '/search', component: Search},
        {path: '/searchList', component: SearchList},
        //动态路由，将来确定是哪个商品，路由中携带id
        {path: '/prodetail:id', component: Prodetail}
    ]
})

//所有的路由在真正被访问之前（解析渲染对应组件页面前），都会先经过全局前置守卫
//只有全局守卫放行了才能到达对应的页面
//全局守卫
//to到哪去，到哪去的完整路由对象（路径，参数）
//from从哪来，从哪来的完整路由对象（路径，对象）
//next():是否放行
//(1)next()直接放行，放行到to要去的路径
//(2)next(路径) 进行拦截，拦截到next里面配置的路径

//定义一个数组，专门给用于存放需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
    // console.log(to, from, next)
    //看to.path是否在authUrls中
    if (!authUrls.includes(to.path)) {
        //非权限页面直接放行
        next()
        return
    }
    //是权限页面，需要判断是否有token
    const token = store.getters.token
    if (token) next()
    else next('/login')
})

export default router
