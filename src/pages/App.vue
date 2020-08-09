<template>
  <div id="app">
    <!-- 我是中文你这也算吗 -->
    <!-- <p>你是个假的标题么？</p>
    <p title="这是要国际化的内容哦！"></p>
    <div class="" :content="$t('当前数量{count}个', { count: count })">
    </div> -->
    普通静态文本
    <p>标签内文本</p>
    {{`模板中文本`}}
    <!-- 此种插值为非正确格式 -->
    <div>{{`模板中包含插值${textContent}多位置插值${count}人`}}</div>
    {{$t('文本中插值法{count}, 多个插值也可以{textContent},没关系', { count })}}
    <el-button data-name="按钮">保存</el-button>
    <!-- 同名字段 -->
    <el-button>保存</el-button>
    <p :title="$t('这是一个补充说明', {})"></p>
  </div>
</template>

<script>
import i18n from '@/locales'
export default {
  name: 'app',
  components: {},
  data () {
    const type = 'name'
    return {
      textContent: 'js 部分文本信息',
      select: `模板语法${this.count}`,
      count: 10,
      title: '这是一个标题，哈哈哈哈'
    }
  },

  filters: {
    numberFilter () {
      return i18n.t('怎么用都可以的')
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
