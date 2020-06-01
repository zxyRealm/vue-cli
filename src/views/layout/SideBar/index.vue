/*
* @Desc
* @Author  折威
* @Date 2020-03-21 15:14:17
*/
<template>
  <el-scrollbar class="menu-scrollbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#333"
      router
      active-text-color="#0B7EF9">
      <side-bar-item
        :item="route"
        :base-path="route.path"
        :key="`${route.path}_${index}`"
        v-for="(route, index) in menuList">
      </side-bar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import path from 'path'
import { mapState } from 'vuex'
import { isExternal } from '@/utils/validate'
import SideBarItem from './SideBarItem'
export default {
  name: 'SiderBar',
  components: {
    SideBarItem
  },
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'permission_routes',
      'routes'
    ]),
    activeIndex () {
      const { meta, path } = this.$route
      if (meta && meta.index) {
        return meta.index
      }
      return path
    },
    appRoutes () {
      return this.$router.options.routes || []
    },
    menuList () {
      const routes = this.$store.state.permission.routes || []
      // return JSON.parse(JSON.stringify(this.$store.state.permission.routes))
      return this.filterRoutes(routes)
    }
  },
  mounted () {
    console.log(this.$router.options.routes, this.$store.state)
  },
  methods: {
    filterRoutes (routes) {
      const newRoutes = []
      routes.forEach(item => {
        if (!item.hidden) {
          if (item.children && item.children.length) {
            item.children = this.filterRoutes(item.children)
          }
          newRoutes.push(item)
        }
      })
      return newRoutes
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
  /deep/.el-submenu {
    .el-menu-item {
      @include menuitem;
    }
  }
  /deep/.el-submenu__title,
  .el-menu-item {
    @include menuitem;
  }
}

</style>
