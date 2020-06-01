import axios from 'axios'
import router, { mergeRoutes, constantRoutes } from '@/router'
import Layout from '@/views/layout'
const state = {
  routes: [], // 侧边导航栏
  // config is a object or array
  formConfig: null
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.routes = routes
  },
  SET_FORM_CONFIG (state, config) {
    state.formConfig = config
  }
}

const actions = {
  generateRoutes ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/mock/form.json').then(res => {
        const config = res.data.data || {}
        const addRoutes = []
        commit('SET_FORM_CONFIG', config)
        if (Array.isArray(config)) {
          addRoutes.push({
            hidden: true,
            path: '/config',
            redirect: '/config/site_0'
          },{
            hidden: true,
            path: '/config/site',
            redirect: '/config/site_0'
          })
          addRoutes.push(...config.map((item, index) => {
            const pm = `site_${index}`
            return {
              path: '/config',
              redirect: `/config/${pm}`,
              component: Layout,
              children: [
                {
                  path: pm,
                  name: pm,
                  meta: {
                    title: item.title || "工地配置"
                  },
                  component: () => import('@/views/config-form')
                }
              ]
            }
          }))
        } else {
          addRoutes.push({
            hidden: true,
            path: '/config',
            redirect: '/config/site'
          })
          addRoutes.push(
            {
              path: '/config',
              component: Layout,
              children: [
                {
                  path: 'site',
                  name: 'configSite',
                  meta: {
                    title: config.title || '配置化表单',
                  },
                  component: () => import('@/views/config-form')
                }
              ]
            }
          )
        }
        const routes = mergeRoutes(addRoutes)
        commit('SET_ROUTES', routes)
        resolve(addRoutes)
      }).catch((error) => {
        commit('SET_FORM_CONFIG', {})
        console.error(error)
        reject()
      })
    })
  }
}
export default {
  namespace: true,
  state,
  actions,
  mutations
}