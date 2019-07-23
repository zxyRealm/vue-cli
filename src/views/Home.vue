<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home">
    <div>
      <h2>输入框聚焦提示示例</h2>
    </div>
    <div class="demo-content">
      <div class="left-item">
        <div id="point-left"></div>
      </div>
      <div class="right-item">
        <div id="point-right"></div>
      </div>
      <!--<uniubi-input-->
      <!--:class="[name,{ items: name }]"-->
      <!--focus-message="我是focus提示信息"-->
      <!--v-model.trim="userForm.password">-->
      <!--<template slot="prepend">Http://</template>-->
      <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
      <!--</uniubi-input>-->
      <!---->
    </div>
    <!--<el-form-->
    <!--ref="userForm"-->
    <!--class="focus-form"-->
    <!--label-width="80px"-->
    <!--label-position="left"-->
    <!--@submit.native.prevent-->
    <!--:rules="rules"-->
    <!--:model="userForm">-->
    <!--<el-form-item-->
    <!--label="点我试试"-->
    <!--prop="password">-->
    <!--<uniubi-input-->
    <!--:class="[name,{ items: name }]"-->
    <!--show-password-->
    <!--focus-message="我是focus提示信息"-->
    <!--placeholder="我可是提示信息哦！"-->
    <!--v-model.trim="userForm.password">-->
    <!--<template slot="prepend">Http://</template>-->
    <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
    <!--</uniubi-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item-->
    <!--label="名称"-->
    <!--prop="name">-->
    <!--<uniubi-input-->
    <!--show-password-->
    <!--focus-message="不要乱输哦，会被拒绝的！"-->
    <!--placeholder="请输入名称"-->
    <!--@keyup.enter="submit"-->
    <!--v-model.trim="userForm.name">-->
    <!--</uniubi-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
  </div>
</template>

<script>
  // @ is an alias to /src
  import UniubiInput from '@/components/input'
  import { jsPlumb } from 'jsplumb'
  // import CurrentUser from '@/components/current-user'
  import axios from 'axios'
  // const JsPlumb = require('jsplumb')

  export default {
    name: 'home',
    components: {
      UniubiInput
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
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },
        userForm: {
          name: '',
          password: ''
        },
        commonConfig: {
          isSource: false,
          connector: ['Straight'],
          connectionsDetachable: false,
          endpoints: [['Dot', { radius: 4, }], ['Dot', { radius: 4 }]  ],
          endpointStyles : [{ fill: 'transparent' }, { fill: 'transparent' } ],
          paintStyle: { strokeWidth: 1, strokeDasharray: [5, 10], stroke: '#456' }
        }
      }
    },
    created() {
      // this.checkWebHook()
      console.warn('看到我就说明自动部署成功了哦！！！')
      this.createPointLine()
    },
    mounted() {
      this.addLine()
    },
    methods: {
      submit() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            console.log('validate success')
          }
        })
      },
      checkWebHook() {
        axios.post('/api/autoBuildWeb').then(res => {
          console.log(res)
        })
      },
      createPointLine() {
        let dom = document.getElementById('two-point-of-line')
        if (!dom) {
          dom = document.createElement('div')
          dom.id = 'two-point-of-line'
        }
        dom.style.borderBottom = '1px dashed #f00'
        dom.style.position = 'absolute'
        dom.style.width = '100px'
        dom.style.top = '300px'
        dom.style.left = '200px'
        document.body.appendChild(dom)
      },

      addLine() {
        // let firstInstance = JsPlumb.getInstance()
        jsPlumb.ready((e) => {
          jsPlumb.connect({
            source: 'point-left',
            target: 'point-right',
            endpoint: 'Dot',
            connector: 'Straight',
            connectionsDetachable: false
          }, this.commonConfig)
          console.log(jsPlumb.Defaults)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .demo-title {
    margin: 20px;
  }

  .demo-content {
    margin: 20px 0;
    width: 400px;
    overflow: hidden;
    > div {
      position: relative;
      float: left;
      width: calc(50% - 12px);
      height: 300px;
      border: 1px dashed #ddd;
      &:nth-child(1) {
        margin-right: 20px;
      }
      > div {
        position: absolute;
        width: 5px;
        height: 5px;
        top: 15px;
        right: 50px;
        background: #0B7EF9;
      }
    }
  }

  .focus-form {
    width: 400px;
    margin: 20px 0;

  }

  .demo::placeholder {
    color: red;
  }
</style>
