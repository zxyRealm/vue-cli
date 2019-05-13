<template>
  <div class="home">
    <img :src="url">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <hello-world></hello-world>
    <header class="demo-header">This is demo</header>
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>

  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    data() {
      return {
        url: require('../assets/logo.png')
      }
    },
    created() {

      console.log('this is home', eval(process.env.VUE_APP_HOST))
    }
  }
</script>
