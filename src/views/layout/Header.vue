/*
* @Desc
* @Author  折威
* @Date 2020-03-21 15:10:55
*/

<template>
  <div class="app-header">
    <h1 class="title">学习笔记</h1>
    <el-dropdown class="g-fr" @click="handleClick">
      <el-button type="text">{{currentLanguage.label}}</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :key="index"
          v-for="(lang, index) in languages">
          {{lang.label}}
        </el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      currentLanguage: {},
      languages: [
        {
          value: 'zh-CN',
          label: '中文'
        },
        {
          value: 'en',
          label: 'English'
        }
      ]
    }
  },
  mounted () {
    this.currentLanguage = this.languages.find(item => item.value === this.$i18n.loclale) || this.languages[0]
  },
  methods: {
    handleClick (name) {
      console.log('name-------', name)
    }
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
