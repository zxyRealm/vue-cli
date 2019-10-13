## Vue 全家桶 & 原理



### vue-router

#### 使用 & 思考

```js
...
// 应用插件： 做了什么 install
// install 做了什么？
// 1. 注册组件
// 2. 挂载 router
Vue.use(VueRouter)

// router 做了什么
// 1. 解析路由配置
// 2. 响应url变化
// 3. 事件监听 hashchange
// 4. 组件切换 如何切换？
...
```



#### vue-router 源码实现（简易版）

需求分析

- 实现Router
  - 解析路由配置
  - 响应url 变化
  - 声明、注册router-link、router-view (源码中是在插件方法中实现的)
- 实现插件
  - 挂载$router
  - 声明$route
  - init()



代码实现

```js
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
    this.current = window.localtion.hash.slice(1) || '/'
  }

  createRouteMap () {
    this.router.forEach(item => {
      this.routeMap[item.path] = item
    })
  }
  //  ruoter-link / router-view 组件注册
  initComponents () {
    // 
    Vue.component("router-link", {
      props() {
        to: String
      },
      render() {
        return <a href={this.to}>{this.$slots.default}</a>
      }
    })

    Vue.component("router-view", {
      render:(h) => {
        var component = this.routeMap[this.current].component
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
      }
    }
  })
}

```



### vuex 数据管理



#### vuex 源码实现（简易版)

需求分析

- 实现Store
  - state响应式处理
  - 保存状态，实现dispatch、commit、getters
- 实现插件
  - 挂载store

代码实现

```js
let Vue

// 实现Store

class Store{
  constructor(options = {}) {
    // 响应化处理
    this.state = new Vue ({
      data: options.state
    })
    
    this.mutations = options.mutations || {}
    this.actions = options.actions || {}
  }
  //  type 是 mutaitons 中的函数名
  commit = (type, arg) => {
    this.mutations[type](this.state, arg)
  }

  dispatch (type, arg) {
    this.actions[type]({
      commit: this.commit,
      state: this.state
    },arg)
  }

}

// 实现插件
function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {Store, install}

```

