/*
* @Desc
* @Author  折威
* @Date 2020-03-11 00:34:53
*/

<template>
  <div class="data-header">
    <div class="title f-tc">
      <h1>大屏数据可视化</h1>
      <div class="time">{{currentTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-header',
  data () {
    return {
      currentTime: '',
      timer: null
    }
  },
  mounted () {
    this.currentTime = new Date().toLocaleString()
    this.alock()
  },
  methods: {
    alock () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.currentTime = new Date().toLocaleString()
        this.alock()
      }, 1000)
    }
  },
  beforeDestory () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">
.data-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
}
</style>
