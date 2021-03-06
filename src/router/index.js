import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)
const routes = [
  
  {
    path: '/china',
    name: 'china',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/china.vue'),
    children: [
      {
        path: "/china/index",
        component: () =>import("../views/china/index.vue")
      },
      {
        path: "/china/detailed",
        component: () =>import("../views/china/detailed.vue")
      },
      {
        path: "/china/predict",
        component: () =>import("../views/china/predict.vue")
      },
    ]
  },
  {
    path: '/world',
    name: 'world',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/world.vue'),
    children: [
      {
        path: "/world/index",
        component: () =>import("../views/world/index.vue")
      },
     
      {
        path: "/world/predict",
        component: () =>import("../views/world/predict.vue")
      },
    ]
  },
  {
    path: '/loading',
    name: 'loading',
   
    component: () => import('../components/loading.vue')
  },
  {
    path: '/',
    redirect:"/loading",
    component: () => import(/* webpackChunkName: "about" */ '../views/china.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由守卫  强制先获取数据
router.beforeEach((to, from,next) => {
  if (store.state.isLogin == true || to == "/loading") {
    //判断是否已经获取过数据，数据获取则进入下一页面
    next()
  } else { 
    //无获取数据则先跳转loading页面进行数据获取
    // alert("先读取数据！！")
    store.state.isLogin = true
    next("/loading")
    return true
  }
})
export default router
