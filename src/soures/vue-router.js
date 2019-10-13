let Vue

// 实现Router

export default class VueRouter {
  constructor(options) {
    this.$options = options
    // path component 映射
    // 将路由配置解析成 {"/": Home, "/about": About}形式的映射关系
    this.routeMap = {}

    // 通过 Vue 实现响应式
    // current 保存当前hash
    this.app = new Vue({
      data: { current: "/"}
    })
  }

  // 初始化
  init () {
    //  监听hash change
    this.hashEvent()
    // 创建路由映射
    this.createRouteMap()
    //  注册组件
    this.initComponents()
  }

  hashEvent () {
    addEventListener("load", this.handleHashChange.bind(this), false)
    addEventListener("hashchange", this.handleHashChange.bind(this), false)
  }
  // hash 变化处理
  handleHashChange () {
    this.app.current = window.location.hash.slice(1) || '/'
  }

  createRouteMap () {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
    console.log(this.routeMap)
  }
  //  ruoter-link / router-view 组件注册
  initComponents () {
    // 
    Vue.component("router-link", {
      props: {
        to: String
      },
      render() {
        return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    })

    Vue.component("router-view", {
      render:(h) => {
        var component = this.routeMap[this.app.current].component
        // h: createElement函数
        return h(component)
      }
    })
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 添加到Vue实例原型上，可在本实例的任意组件内访问$router
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}
