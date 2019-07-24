<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home">
    <div>
      <h2>输入框聚焦提示示例</h2>
    </div>
    <div class="demo-content">
      <div class="left-item">
        <div
          v-for="(item, index) in list"
          :id="`point-left_${item.id}`"
          :key="index"
          :style="{ top: item.point[0] + 'px', left: item.point[1] + 'px' }"
          @mouseenter="showPointOfLine($event, item)"
          @mouseleave="hidePointOfLine($event, item)"></div>
      </div>
      <div class="right-item">
        <div
          v-for="(item, index) in list"
          :id="`point-right_${item.id}`"
          :key="index"
          :style="{ top: item.view[0] + 'px', left: item.view[1] + 'px' }"
          @mouseenter="showPointOfLine($event, item)"
          @mouseleave="hidePointOfLine($event, item)"></div>
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
    <div id="three--container" class="three--container">
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
          endpoints: [['Dot', { radius: 4 }], ['Dot', { radius: 4 }]],
          endpointStyles: [{ fill: 'transparent' }, { fill: 'transparent' }],
          paintStyle: { strokeWidth: 1, strokeDasharray: [5, 10], stroke: '#456' }
        },
        list: [
          { id: 1, point: [0, 10], view: [60, 20]},
          { id: 2, point: [20, 10], view: [100, 20]},
          { id: 3, point: [30, 10], view: [120, 80]},
          { id: 4, point: [50, 20], view: [90, 20]},
          { id: 5, point: [100, 20], view: [50, 10]},
          { id: 6, point: [35, 30], view: [80, 20]},
        ]
      }
    },
    created() {
      // this.checkWebHook()
      console.warn('看到我就说明自动部署成功了哦！！！')
      this.createPointLine()
    },
    mounted() {
      this.addLine()
      addEventListener('resize', () => {
        console.log(this.getViewPortSize())
      })
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

      addLine(point1, point2) {
        let source = document.getElementById('point-right')
        let target = document.getElementById('point-left')
        let p1 = this.getElementPosition(source)
        let p2 = this.getElementPosition(target)
        // this.createSvgShape(p1, p2)
        // let xy = this.getElementPosition(target)
        console.log(p1, p2)
        jsPlumb.ready((e) => {
          jsPlumb.connect({
            source: source,
            target: target,
            endpoint: 'Dot',
            connector: 'Straight',
            connectionsDetachable: false
          }, this.commonConfig)
        })
      },


      // 创建并显示两点间的连线
      createSvgShape(p1, p2) {
        if (!p1 || !p2) return
        const twConstants = {
          DIALECT_SVG: 'svg',
          DIALECT_VML: 'vml',
          NS_SVG: 'http://www.w3.org/2000/svg',
          NS_XLINK: 'http://www.w3.org/1999/xlink'
        }
        const svgId = 'svg-two-point--rect'
        const lineId = 'svg-two-point--line'
        let svgNode = document.getElementById(svgId)
        let svgLine = document.getElementById(lineId)
        let psx = Math.min(p1.x, p2.x) + 2 || 0
        let psy = Math.min(p1.y, p2.y) + 2 || 0
        let w = Math.abs(p2.x - p1.x) || 1
        let h = Math.abs(p2.y - p1.y) || 1
        if (!svgNode) {
          svgNode = document.createElementNS(twConstants.NS_SVG, twConstants.DIALECT_SVG)
          svgNode.id = svgId
          svgNode.setAttribute('version', '1.1')
          document.body.appendChild(svgNode)
        }
        svgNode.setAttribute('style', `position: absolute;top: ${psy}px;left: ${psx}px;width: ${w}px;height: ${h}px;`)
        if (!svgLine) {
          svgLine = document.createElementNS(twConstants.NS_SVG, 'line')
          svgLine.id = lineId
          svgLine.setAttribute('style', 'stroke:blue;stroke-width: 1px;stroke-dasharray: 5 10;')
          svgNode.appendChild(svgLine)
        }
        let pos = { x: psx - 2, y: psy - 2 }
        console.log(pos, p1, p2)
        if (this.equalsObj(pos, p1) || this.equalsObj(pos, p2)) {
          svgLine.setAttribute('x1', 0)
          svgLine.setAttribute('y1', 0)
          svgLine.setAttribute('x2', w)
          svgLine.setAttribute('y2', h)
        } else {
          svgLine.setAttribute('x1', 0)
          svgLine.setAttribute('y1', h)
          svgLine.setAttribute('x2', w)
          svgLine.setAttribute('y2', 0)
        }
        svgNode.setAttribute('display', 'block')
      },

      // 显示两点连线
      showPointOfLine(e, item) {
        console.log(e.target.id, item.id)
        // let targetId = e.target.id
        let p1 = this.getElementPosition(document.getElementById(`point-right_${item.id}`))
        let p2 = this.getElementPosition(document.getElementById(`point-left_${item.id}`))
        this.createSvgShape(p1, p2)
      },
      // 隐藏两点连线
      hidePointOfLine(e, item) {
        let svgNode = document.getElementById('svg-two-point--rect')
        if (svgNode) {
          svgNode.setAttribute('display', 'none')
        }
      },

      /*
       * 判断此对象是否是Object类型
       * @param {Object} obj
       */
      isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]'
      },
      /*
       * 判断此类型是否是Array类型
       * @param {Array} arr
       */
      isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]'
      },
      /*
       *  深度比较两个对象是否相同
       * @param {Object} oldData
       * @param {Object} newData
       */
      equalsObj(oldData, newData) {
        // 类型为基本类型时,如果相同,则返回true
        if (oldData === newData) return true
        if (this.isObject(oldData) && this.isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
          // 类型为对象并且元素个数相同
          // 遍历所有对象中所有属性,判断元素是否相同
          for (const key in oldData) {
            if (oldData.hasOwnProperty(key)) {
              if (!this.equalsObj(oldData[key], newData[key]))
              // 对象中具有不相同属性 返回false
                return false
            }
          }
        } else if (this.isArray(oldData) && this.isArray(oldData) && oldData.length === newData.length) {
          // 类型为数组并且数组长度相同
          for (let i = 0, length = oldData.length; i < length; i++) {
            if (!this.equalsObj(oldData[i], newData[i]))
            // 如果数组元素中具有不相同元素,返回false
              return false
          }
        } else { // 其它类型,均返回false
          return false
        }
        // 走到这里,说明数组或者对象中所有元素都相同,返回true
        return true
      },


      // 获取元素相对窗口坐标
      getElementPosition(e) {
        let [x, y] = [0, 0]
        while (e != null) {
          x += e.offsetLeft
          y += e.offsetTop
          e = e.offsetParent
        }
        return { x: x, y: y }
      },

      // 获取视口尺寸
      getViewPortSize(w) {
        w = w || window
        if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight }
        const d = w.document
        if (document.compatMode === 'CSS1Compat')
          return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight }
        return { w: d.body.clientWidth, h: d.body.clientHeight }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .demo-title {
    margin: 20px;
  }

  .three--container {
    width: 500px;
    height: 300px;
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
      /*#point-left {*/
        /*top: auto;*/
        /*bottom: 10px;*/
      /*}*/
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
