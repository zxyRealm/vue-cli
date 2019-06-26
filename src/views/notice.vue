<template>
  <div class="notice__content--wrap">
    <ul class="notice--list">
      <li
        v-for="(item, $index) in noticeList"
        class="notice-item"
        :key="$index">
        <span class="index">{{$index + 1}}.</span>
        <span class="content ellipsis">{{item.text}}</span>
        <span>{{new Date().toLocaleString()}}</span>
        <i class="el-icon-close g-fr" @click="del(item)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      noticeList: [
        { text: '1oqf积分撒打飞机沙发了房间啊发上来就按了关机阿萨德链接发快递费放假啊' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .notice-item {
    height: 62px;
    padding: 20px 40px;
    box-sizing: border-box;
    border-bottom: 1px solid $global-gray-border;
    text-align: left;
    line-height: 1.2;
    &:nth-child(2n + 1) {
      background: gray;
    }
    > * {
      display: inline-block;
      vertical-align: middle;
    }
    &:before{
      content: '';
      display: inline-block;
      height: 10px;
      width: 10px;
      border-radius: 5px;
      margin-right: 12px;
      background: $theme-blue;
      vertical-align: middle;
    }
    .index{
      margin-right: 14px;
    }
    .content{
      width: auto;
      max-width: calc(100% - 280px);
      margin-right: 30px;
    }
  }
</style>
