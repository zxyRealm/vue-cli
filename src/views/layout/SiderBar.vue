/*
* @Desc
* @Author  折威
* @Date 2020-03-21 15:14:17
*/

<template>
  <el-scrollbar class="menu-scrollbar">
    <el-menu
      :default-active="$route.meta && $route.meta.index"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#333"
      router
      active-text-color="#0B7EF9">
      <template v-for="(menu, index) in menuList">
        <el-submenu
          v-if="menu.children && menu.children.length"
          :index="menu.index"
          :router="menu.fullPath"
          :key="`munu-${index}`">
            <template slot="title">
              <i v-if="menu.icon" :class="menu.icon"></i>
              <span>{{menu.title}}</span>
            </template>
            <el-menu-item
              :index="subMenu.index"
              v-for="(subMenu, index) in menu.children"
              :router="subMenu.fullPath"
              :key="`sub-menu-${index}`">{{subMenu.title}}</el-menu-item>
          </el-submenu>

          <el-menu-item
            v-else
            :index="menu.index"
            :router="menu.fullPath"
            :key="`sub-menu-${index}`">
            <template slot="title">
              <i v-if="menu.icon" :class="menu.icon"></i>
              {{menu.title}}
            </template>
          </el-menu-item>
        </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'SiderBar',
  data () {
    return {
    }
  },
  computed: {
    appRoutes () {
      return this.$router.options.routes || []
    },
    menuList () {
      let list = JSON.parse(JSON.stringify(this.appRoutes))
      list = (list.find(route => route.name === 'Layout') || {}).children || []
      const newList = this.walkTree(list,
        (data, p) => {
          let { meta, path, children } = data
          const fullPath = ((p && p.path) || '/') + path
          return { ...meta, fullPath, children, path }
        },
        data2 => { // 过滤数据
          return data2.children || (data2.meta && data2.meta.showMenu)
        })
      return newList
    }
  },
  mounted () {
    console.log(this.$router.options.routes)
  },
  methods: {
    // 遍历树形数据
    walkTree (tree, cb, filter) {
      //
      const walk = (tree, parent, depth = 0) => {
        const isAllow = typeof filter === 'function' && filter(tree, depth)
        if (isAllow || filter === undefined) {
          let copy = {}
          copy = {
            ...tree,
            children: []
          }
          if (tree.children && tree.children.length) {
            tree.children.forEach(node => {
              const item = walk(node, tree, depth++)
              item && copy.children.push(item)
            })
          }
          if (typeof cb === 'function') {
            return cb(copy, parent, depth) || copy
          } else {
            return copy
          }
        }
      }
      if (Array.isArray(tree)) {
        return tree.map((item) => walk(item)).filter(item => item)
      } else {
        return walk(tree)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@mixin menuitem {
  height: auto;
  line-height: 1;
  padding-top: 12px;
  padding-bottom: 12px;
}
.menu-scrollbar {
  height: 100%;
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.el-menu {
  border-right: none;
}
.el-submenu {
  .el-menu-item {
    @include menuitem;
  }
}
/deep/.el-submenu__title,
.el-menu-item {
  @include menuitem;
}
</style>
