/*
* @Desc
* @Author  折威
* @Date 2020-03-11 00:45:48
*/

<template>
  <el-container class="outer--wrap">
  <el-header>
    <app-header></app-header>
  </el-header>
  <el-container class="inner--wrap">
    <el-aside width="200px">
      <sider-bar></sider-bar>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppHeader from './Header'
import SiderBar from './SideBar'
export default {
  name: 'index',
  components: {
    AppHeader,
    SiderBar
  },
  data () {
    return {

    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="scss">
.outer--wrap {
  height: 100%;
}
.inner--wrap {
  height: calc(100% - 60px);
  overflow: hidden;
}
.el-header {
  border-bottom: 1px solid $global_gray_border;
  // background: $header-bg;
}
.el-aside {
  // background: $aside-bg;
}
.el-main {
  // background: $theme-bg;
}
.nav--wrap {
  height: 50px;
  line-height: 50px;
}
.nav-item {
  margin: 0 15px;
}
</style>
