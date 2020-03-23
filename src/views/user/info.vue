<template>
  <div>
    <h2>用户详情</h2>
    <div>
      <p>用户名：{{info.name}}</p>
      <p>性别：{{info.sex}}</p>
      <p>地址：{{info.addres}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {
        name: '彩彩',
        sex: '小萌妹',
        address: '黑水路彩虹桥天堂小镇幸福家园'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
