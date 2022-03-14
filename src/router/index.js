import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/china',
    name: 'china',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/china.vue'),
    
  },
  {
    path: "/china/detailed",
    component: () =>import("../views/china/detailed.vue")
  },
  {
    path: '/loading',
    name: 'loading',
   
    component: () => import('../components/loading.vue')
  },
  {
    path: '/',
    redirect:"/china",
    component: () => import(/* webpackChunkName: "about" */ '../views/china.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
