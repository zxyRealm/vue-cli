<template>
  <div class="wrap">
    <div>
      <el-scrollbar>
        <ul class="list-wrap">
          <li class="list-item" v-for="(item, index) in list" :key="index">{{index + 1}}</li>
        </ul>
      </el-scrollbar>
    </div>
    <div>
      <el-button type="primary">按 钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: 8
    }
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: row;
}
.wrap div {
  width: 100%;
}
.el-scrollbar {
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.content {
  height: 1200px;
  background: #f00;
}
.list-item {
  height: 120px;
  line-height: 120px;
  font-size: 20px;
  margin-bottom: 20px;
  background: #ff0;
}
</style>