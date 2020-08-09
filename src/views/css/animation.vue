/*
* @Desc Css 动画
* @Author  折威
* @Date 2020-07-13 14:16:58
*/

<template>
  <div class="page_content">
    <h2 class="page__title">{{$route.meta && $route.meta.title}}</h2>
    <div class="module__content">
      <h3 class="page__title page__title--sub">
        红绿灯
      </h3>
      <!-- 3色交通灯 -->
      <div class="tc-light">
        <div class="light"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'animation',
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
@keyframes g-light {
  0%{
    background: red;
  }
  10% {
    background: red;
  }
  39% {
    background: red;
  }
  40% {
    background: green;
  }
  70% {
    background: green;
  }
  71% {
    backgound: yellow;
  }
  100% {
    background: yellow;
  }
}

.tc-light {
  .light {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: red;
    margin-left: 30%;
    animation: g-light 10s linear infinite;
  }
}
</style>
