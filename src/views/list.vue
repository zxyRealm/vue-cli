<template>
  <div>
    this is a list
    <my-tree></my-tree>
    <h1>CSS 应用</h1>
    <h3>居中</h3>
    <el-button @click="getRouter">Routes</el-button>
  <router-link to="config">config</router-link>
    <div class="center--wrap">
      <div class="center-item flex-item">
        <div class="sub-item">
          哈哈哈法拉老师的发生了地方建安路附近建安地方
        </div>
        <div class="sub-item">
          楼上的交付时间按法律水电费啊法律时代峻峰垃圾袋发件方大方
        </div>
      </div>
      <div class="center-item pseudo-item">
        <div class="sub-item">
          哈哈哈法拉老师的发生了地方建安路附近建安地方
        </div>
        <div class="sub-item">
          楼上的交付时间按法律水电费啊法律时代峻峰垃圾袋发件方大方
        </div>
        <i class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script>
import myTree from './el-tree'
export default {
  components: {
    myTree
  },
  name: 'list',
  methods: {
    getRouter () {
      this.$router.addRoutes([
        {
          path: '/config',
          name: 'config',
          meta: {
            showMenu: true,
            title: '配置化表单',
            index: '/config'
          },
          component: () => import('@/views/config-form')
        }
      ])
      console.log(this.$router)
    }
  }
}
</script>

<style lang="scss" scoped>
.center--wrap {
  padding: 0 20px;
}
.center-item {
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  &.flex-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 伪类实现子元素上下左右居中
  &.pseudo-item {
    text-align: center;
    &:after {
      content: '';
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle;
    }
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.sub-item {
  display: inline-block;
  width: 100px;
  padding: 6px;
  border-radius: 2px;
  border: 1px solid #999;
  &+ .sub-item {
    margin-left: 10px;
  }
}
</style>
