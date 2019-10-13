<template>
  <div>
    <h2>朋友圈</h2>
    <ul>
      <li v-for="user in list" :key="user.name">
        {{user.name}}
        今年{{user.age}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "路人A", age: "18" },
        { name: "路人B", age: "19" },
        { name: "路人C", age: "28" },
        { name: "路人D", age: "38" },
        { name: "路人E", age: "48" },
        { name: "路人F", age: "58" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>