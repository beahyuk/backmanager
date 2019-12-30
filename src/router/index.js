import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/Login.vue')
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
