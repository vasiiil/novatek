import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/one',
    name: 'one',
    component: () => import(/* webpackChunkName: "one" */ '../components/tabs/TabOne.vue')
  },
  {
    path: '/two',
    name: 'two',
    component: () => import(/* webpackChunkName: "two" */ '../components/tabs/TabTwo.vue')
  },
  {
    path: '/three',
    name: 'three',
    component: () => import(/* webpackChunkName: "three" */ '../components/tabs/TabThree.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
