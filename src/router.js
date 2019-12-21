import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
// const NoticeList = () => import(/* webpackChunkName: "notice" */ './views/notice.vue')
// const DataList = () => import(/* webpackChunkName: "list" */ './views/list.vue')
// const Error404 = () => import('./views/error/404.vue')

import About from './views/About.vue'
import NoticeList from './views/notice.vue'
import DataList from './views/list.vue'
import FlowTest from './views/flow-test.vue'
import Folder from './views/upload/folder'
import TimeLine from './views/time-line'
import Error404 from './views/error/404'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
      component: DataList
    },
    {
      path: '/test',
      name: 'test',
      component: FlowTest
    },
    {
      path: '/folder',
      name: 'Folder',
      component: Folder
    },
    {
      path: '/time-line',
      name: 'TimeLine',
      component: TimeLine
    },
    {
      path: '*',
      name: 'error',
      component: Error404
    }
  ]
})
