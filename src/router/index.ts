import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../components/Login.vue'
import home from '../components/home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: home
  }
]

const router = new VueRouter({
  //  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const hasToken = !!sessionStorage.getItem('token')
  // 登录页面直接放行
  if (to.path === '/login') {
    return next()
  } else if (to.path === '/logout') {
    sessionStorage.clear()
    next('/login')
  } else {
    // 有权限,跳转页面
    if (hasToken) {
      console.log('has pemmision')
      next()
      // 没有权限，返回登录页面
    } else {
      return next('/login')
    }
  }
})

export default router
