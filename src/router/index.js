import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Main from '@/views/layout'
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

Vue.use(Router)
const baseRoutes = [
  {
    path: '*',
    name: 'error',
    component: Error404
  }
]

const AppRouter = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      name: 'Layout',
      children: [
        ...Systems,
        {
          path: 'notice',
          name: 'notice',
          component: NoticeList
        },
        {
          path: 'home',
          name: 'home',
          meta: {
            showMenu: true,
            index: '/home',
            title: '首页'
          },
          component: Home
        },
        {
          path: 'about',
          name: 'about',
          meta: {
            showMenu: true,
            index: '/about',
            title: '关于'
          },
          component: About,
          children: [
            {
              path: 'item1',
              meta: {
                showMenu: true,
                title: '示例一号',
                index: '/about/item1'
              }
            }
          ]
        },
        {
          path: 'list',
          name: 'list',
          meta: {
            showMenu: true,
            index: '/list',
            title: '列表'
          },
          component: DataList
        },
        {
          path: 'test',
          name: 'test',
          component: FlowTest
        },
        {
          path: 'folder',
          name: 'Folder',
          component: Folder
        },
        {
          path: 'time-line',
          name: 'TimeLine',
          component: TimeLine
        },
        {
          path: 'real-stream',
          name: 'RealStream',
          component: RealStream
        },
        {
          path: 'array',
          name: 'Array',
          meta: {
            showMenu: true,
            index: '/array',
            title: '数组方法'
          },
          component: () => import('@/views/array.vue')
        },
        {
          path: 'config-form',
          name: 'configForm',
          meta: {
            showMenu: true,
            index: '/config-form',
            title: '配置化表单'
          },
          component: () => import('@/views/config-form')
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      component: Error404
    }
  ]
})
AppRouter.onReady(function () {
  console.log(arguments)
})
export default AppRouter