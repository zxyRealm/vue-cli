/*
* @Desc 页面布局
* @Author  折威
* @Date 2020-07-13 14:11:59
*/

<template>
  <div>
    <h2 class="page__title">{{$route.meta && $route.meta.title}}</h2>
    <div class="module__content">
      <h3 class="page__title page__title--sub">
        子元素自适应父元素高度
      </h3>
      <div class="example__box">
        <div class="parent f-clear">
          <div class="child"> childA </div>
          <div class="child"> childB childB childB childB childB childB childB childB childB childB childB childB childB childB  </div>
        </div>
      </div>
      <h3 class="page__title page__title--sub">
        固定宽高比
      </h3>
      <div class="example__box">
        <div class="fixed-wrapper">
          <div class="fixed-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
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
.parent {
  display: flex;
  position: relative;
  width: 500px;
  padding: 10px;
  background: #0f0;
  .child {
    display: inline-block;
    flex: 1;
    width: 50%;
    padding: 10px;
    background: wheat;
    box-sizing: border-box;
  }
}
.fixed-wrapper{
  width: 100%;
  height: 30vh;
  border: 1px solid #ddd;
  margin-bottom: 50px;
  .fixed-item {
    position: relative;
    border: 1px solid greenyellow;
    &:after {
      content: '';
      display: inline-block;
      padding-bottom: calc(100% * (9 / 45));
    }
  }
}
</style>
