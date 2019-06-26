<template>
  <div class="container">
    <header>
      <slot name="header">
        我是头部诶
      </slot>
    </header>
    <main>
      <slot>
        我是主题内容
      </slot>
    </main>
    <footer>
      <slot name="footer">
        我在最下面
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'current-user',
  props: {
    user: {
      type: Object,
      default: () => ({
        name: '我是现在'
      })
    }
  },
  data () {
    return {
      other: {
        id: Math.random(),
        name: '你知道我是谁吗？',
        tag: '我是标签诶'
      }
    }
  }
}
</script>

<style scoped>

</style>
