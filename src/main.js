import 'babel-polyfill'
import Vue from 'vue'
import './styles/common.scss'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './plugins/element/element.js'
import './permission'
import i18n from '@/locales'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
