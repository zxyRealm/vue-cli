/*
* @Desc 
* @Author  折威
* @Date 2020-03-21 15:10:55
*/

<template>
  <div class="app-header">
    <h1 class="title">学习笔记</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  .title {
    font-size: 22px;
    font-weight: normal;
  }
}
</style>
