/*
* @Desc
* @Author  折威
* @Date 2020-05-31 15:32:51
*/
<template>
  <el-menu-item
    v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow &&onlyOneChild.meta"
    :index="resolvePath(onlyOneChild.path)">
    <i v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon"></i>
    <span class="menu__title">
      {{onlyOneChild.meta && $t(onlyOneChild.meta.title)}}
    </span>
  </el-menu-item>
  <el-submenu
    v-else
    :index="resolvePath(item.path)">
    <template slot="title">
      <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
      <span class="menu__title">
        {{item.meta && $t(item.meta.title)}}
      </span>
    </template>
    <side-bar-item
      :key="`sub_${sub.path}_${index}`"
      :item="sub"
      :base-path="resolvePath(sub.path)"
      v-for="(sub, index) in item.children">
    </side-bar-item>
  </el-submenu>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name: 'SideBarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {
      // onlyOneChild: null,
      isNoChild: false
    }
  },
  methods: {
    // 是否只有一个可见子路由
    hasOneShowingChild (children = [], parent) {
      const showChild = children.filter(child => {
        if (child.hidden) {
          return false
        } else {
          this.onlyOneChild = child
          return true
        }
      })
      if (showChild.length === 0) {
        this.onlyOneChild = { ...parent, path: '' }
      }
      return showChild.length <= 1
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      const p = path.resolve(this.basePath, routePath)
      return p
    }
  }
}
</script>

<style scoped lang="scss">
</style>
