<template>
  <div id="app">
    <!-- 我是中文你这也算吗 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data () {
    const type = 'name'
    return {
      select: '',
      count: 10,
      title: '你是不知道，这是个啥事'
    }
  },
  filters: {
    numberFilter () {
      return /* i18n.t */ I18N.common.app_content_list_title
    }
  }
}
</script>

<style scoped>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 30px;
} */

</style>
