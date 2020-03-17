/*
* @Desc 大屏数据展示
* @Author  折威
* @Date 2020-03-11 00:33:48
*/

<template>
  <div ref="wrap" class="data-view">
    <d-header></d-header>
    <div class="content">
      <div class="top">

      </div>
      <div class="bottom">

      </div>
    </div>
  </div>
</template>

<script>
import DHeader from './component/header'

export default {
  name: 'index',
  components: {
    DHeader
  },
  data () {
    return {

    }
  },
  mounted () {
    this.scaleBodySize
    window.addEventListener('resize', this.scaleBodySize)
  },
  methods: {
    scaleBodySize () {
      const rw = document.body.clientWidth / 1920
      const rh = document.body.clientHeight / 1080
      console.log('w', document.body.clientWidth, 'h', document.body.clientHeight)
      const scale = `scale(${rw}, ${rh})`
      const wrap = this.$el
      wrap.style.transform = scale
      wrap.style['-webkit-transform'] = scale
      wrap.style['-moz-transform'] = scale
      wrap.style['-o-transform'] = scale
      wrap.style['-ms-transform'] = scale
      wrap.style['transform-origin'] = 'left top'
    }
  },
  beforeDestory () {
    window.removeEventListener('resize', this.scaleBodySize)
  }
}
</script>

<style scoped lang="scss">
.data-view {
  width: 1920px;
  height: 100%;
  overflow: hidden;
}
.content {
  padding: 20px;
  box-sizing: border-box;
  .top {
    height: 700px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
  .bottom {
    height: 260px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ddd;
  }
}
</style>
