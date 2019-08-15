<template>
  <div class="main-container">
    <h1 class="main-title">
      this is a list
    </h1>
    <div class="content">
      <div class="content-inner">

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'list'
}
</script>

<style lang="scss" scoped>

  .main-title {
    position: absolute;
    top: 0;
    height: 50px;
    width: 100%;
    line-height: 50px;
  }

  .content {
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 0;
    background-color: #0B7EF9;
  }
</style>
