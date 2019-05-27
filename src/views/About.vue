<template>
  <div class="about">
    <img :src="require('@/assets/logo.png')" alt="">
    <h1>This is an about page</h1>
  </div>

</template>
<script>
  export default {
    name: 'about',
    mounted () {
      console.info('我是个info, 你能找到我吗？')
    }
  }
</script>
<style lang="scss">
</style>
