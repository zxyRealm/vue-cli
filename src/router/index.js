import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/views/layout'
import About from '@/views/About.vue'
import NoticeList from '@/views/notice.vue'
import DataList from '@/views/list.vue'
import FlowTest from '@/views/flow-test.vue'
import Folder from '@/views/upload/folder'
import TimeLine from '@/views/time-line'
import RealStream from '@/views/real-stream'
import Systems from '@/router/modules/system' 
// 404 page
import Error404 from '@/views/error/404'
import axios from 'axios'
Vue.use(Router)
// 基本配置子项
const constantRoutes = [
  {
    path: '/',
    redirect: '/home/index',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/house',
    children: [
      {
        path: '',
        name: 'homeIndex',
        alias: '/house',
        meta: {
          icon: '',
          title: '首页'
        },
        component: Home
      }
    ]
  },
  ...Systems,
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: ':id',
        name: 'noticeList',
        meta: {
          title: '系统通知',
          index: '/notice
          '
        },
        component: NoticeList,
        props: true
      }
    ]
  },
  {
    path: '/about',
    redirect: '/about/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'aboutIndex',
        component: About,
        meta: {
          title: '关于我们',
        }
      }
    ]
  }
]
export const noFoundRoutes = [
  {
    path: '*',
    name: 'error',
    meta: {
      title: 'page not found'
    },
    hidden: true,
    component: Error404
  }
]

export const mergeRoutes = (subs) => {
  if (subs) {
    return [
      ...constantRoutes,
      ...subs
    ]
  }
  return [
    ...constantRoutes
  ]
}

const createRouter = (routes) => new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routes || mergeRoutes()
})
const router = createRouter()

export function resetRouter(routes) {
  const newRouter = createRouter(routes)
  router.matcher = newRouter.matcher // reset router
}
export default router