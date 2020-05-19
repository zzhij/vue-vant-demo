import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', keepAlive: false }
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/form/index.vue'),
    meta: { title: '表单', keepAlive: false },
    redirect: '/form/drop-select',
    children: [{
      path: 'drop-select',
      name: 'DropSelect',
      component: () => import('../views/form/drop-select/index.vue'),
      meta: { title: '下拉框', keepAlive: false }
    }, {
      path: 'verify',
      name: 'Verify',
      component: () => import('../views/form/verify/index.vue'),
      meta: { title: '表单验证', keepAlive: false }
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: '其他', keepAlive: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
