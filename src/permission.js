import router, { noFoundRoutes } from '@/router'
import store from '@/store'
import Layout from '@/views/layout'
import Router from 'vue-router'
router.beforeEach(async (to, from, next) => {
  // 异步路由加载后必需通过 vuex 本地缓存状态
  if (store.state.permission.formConfig) {
    next()
  } else {
    try {
      const routes = (await store.dispatch('generateRoutes'))
      routes.push(...noFoundRoutes)
      router.addRoutes(routes)
      // 确保异步路由刷新后能够正常跳转 可用 next(to), 不可用 next()
      next({ ...to, replace: true })
    } catch (error) {
      console.error('error', error)
      router.addRoutes(noFoundRoutes)
      next()
    }
  }
})
