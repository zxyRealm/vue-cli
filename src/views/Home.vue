<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home">
    <img :src="url">
    <div>
      <!--<el-button>el-button</el-button>-->
      <h2>输入框聚焦提示示例</h2>
    </div>
    <uniubi-input
      :class="[name,{ items: name }]"
      show-password
      focus-message="我是focus提示信息"
      placeholder="我可是提示信息哦！"
      v-model.trim="userForm.password">
      <template slot="prepend">Http://</template>
      <el-button slot="append" icon="el-icon-search"> </el-button>
      <!--<template slot="append">.com</template>-->
    </uniubi-input>
    <el-form
      ref="userForm"
      class="focus-form"
      label-width="80px"
      @submit.native.prevent
      :rules="rules"
      :model="userForm">
      <el-form-item
        label="点我试试"
        prop="password">
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name">
        <uniubi-input
          show-password
          focus-message="不要乱输哦，会被拒绝的！"
          placeholder="请输入名称"
          @keyup.enter="submit"
          v-model.trim="userForm.name">
        </uniubi-input>
      </el-form-item>
    </el-form>

    <h3> This is a flex Demo</h3>
    <div>
      <div :style="{transform: 'scale(1.5)' }"> this is a flex box</div>
      <input class="demo" placeholder="只是个例子" type="text"/>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import UniubiInput from '@/components/input'
  import CurrentUser from '@/components/current-user'

  export default {
    name: 'home',
    components: {
      HelloWorld,
      UniubiInput,
      CurrentUser
    },
    data() {
      return {
        name: '',
        url: require('../assets/logo.png'),
        rules: {
          password: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 6, max: 18, message: '长度为6-18位', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur'}
          ]
        },
        userForm: {
          name: '',
          password: ''
        }
      }
    },
    created() {
      console.log('this is home', eval(process.env.VUE_APP_HOST))
      console.info('我和上面的是一家的')
      console.error('我是他们的兄弟，但是我有些特别哦！')
    },
    methods: {
      submit() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            console.log('validate success')
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .focus-form {
    width: 400px;
    margin: 20px auto;

  }
  .demo::placeholder {
    color: red;
  }
</style>
