<template>
  <div id="app">
    <nav class="nav--wrap">
      <router-link class="nav-item" to="/">首页</router-link>
      <router-link class="nav-item" to="/list">列表</router-link>
      <router-link class="nav-item" to="/notice">通知</router-link>
      <router-link class="nav-item" to="/map">地图</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style scoped>
  #app {
    /*min-height: 100vh;*/
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 0 30px;
  }
  .nav--wrap{
    height: 50px;
    line-height: 50px;
  }
  .nav-item{
    margin: 0 15px;
  }
</style>
