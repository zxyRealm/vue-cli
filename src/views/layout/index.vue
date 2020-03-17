/*
* @Desc 
* @Author  折威
* @Date 2020-03-11 00:45:48
*/

<template>
  <div>
    <nav class="nav--wrap">
      <router-link class="nav-item" to="/">首页</router-link>
      <router-link class="nav-item" to="/list">列表</router-link>
      <router-link class="nav-item" to="/notice">通知</router-link>
      <router-link class="nav-item" to="/test">测试</router-link>
      <router-link class="nav-item" to="/folder">Folder</router-link>
      <router-link class="nav-item" to="/time-line">TimeLine</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
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
.nav--wrap {
  height: 50px;
  line-height: 50px;
}
.nav-item {
  margin: 0 15px;
}
</style>
