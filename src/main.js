import 'babel-polyfill'
import Vue from 'vue'
import './styles/common.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
