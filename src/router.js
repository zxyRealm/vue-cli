import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
const Error404 = () => import('./views/error/404.vue')
const NoticeList = () => import('./views/notice.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/notice',
      name: 'notice',
      component: NoticeList
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/list',
      name: 'list',
      component: import('./views/list.vue')
    },
    {
      path: '*',
      name: 'error',
      component: Error404
    }
  ]
})
