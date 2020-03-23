/*
* @Desc 数组重排
* @Author  折威
* @Date 2020-03-03 11:32:29
*/

<template>
  <div class="wrap">
    <h1>{{currentTime}}</h1>
    <el-button @click="addItem">Add item</el-button>
    <input type="text" v-model="domStr">
    <span @click="calcuStringWidth(domStr)">get width</span><br/>
    <span style="font-size: 12px;" id="dom-node" @click="getNode()">{{domStr}}</span>
    <ul class="list-wrap">
      <li class="item"
        :key="index"
        v-for="(item, index) in dataList">
        <i
          class="f-pointer"
          @click="handleLock(index)"
          :class="item.lock ? 'el-icon-lock f-red' : 'el-icon-unlock'">
        </i>
        {{item.value + '-' + index}}
      </li>
    </ul>

    <el-dialog
      width=""
    >

    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'array',
  data () {
    return {
      alarmTimer: null,
      oldTime: '',
      currentTime: '',
      audio: null,
      domStr: 'dom',
      num: 1,
      dataList: [],
      timer: null,
      isHandle: false,
      playNumber: 0
    }
  },
  mounted () {
    // this.checkSleep()
    this.dataList = Array.from({ length: 6 }, (v, i) => ({ lock: false, value: i }))
    // window.addEventListener('resize', this.scaleBodySize)
    window.addEventListener('touchstart', this.handleTouchStart)
  },
  methods: {
    // 通过定时器判定当前页面是否休眠
    checkSleep () {
      clearInterval(this.alarmTimer)
      this.oldTime = Date().now
      this.alarmTimer = setInterval(() => {
        const now = new Date().getTime()
        console.log(new Date(now).toLocaleTimeString())
        // 时间间隔大于 4 s, 则默认页面被休眠了，再次出现时刷新页面数据
        if (now - this.oldTime > 4 * 1000) {
          clearInterval(this.alarmTimer)
          console.log('time out 4s -------')
          setTimeout(() => {
            this.checkSleep()
          }, 0)
          // const c = confirm('页面新开始，数据更新了！')
        }
        this.oldTime = now
      }, 2000)
    },
    axiosRequest () {
      console.log('refresh data')
      const time = setTimeout(() => {
        clearTimeout(time)
        this.checkSleep()
      }, 0)
    },
    scaleBodySize () {
      const rw = document.body.clientWidth / 1920
      const rh = document.body.clientHeight / 1080
      console.log('w', document.body.clientWidth, 'h', document.body.clientHeight)
      const scale = `scale(${rw}, ${rh})`
      document.body.style.transform = scale
      document.body.style['-webkit-transform'] = scale
      document.body.style['-moz-transform'] = scale
      document.body.style['-o-transform'] = scale
      document.body.style['-ms-transform'] = scale
      document.body.style['transform-origin'] = 'left top'
    },
    setIntervalTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.autoPlayAudio()
      }, 2000)
    },
    handleTouchStart () {
      console.log('touch start---------')
      if (this.audio) {
        this.audio.play()
      }
    },
    autoPlayAudio () {
      // ie 上可自动播放，无限制
      // 最新 chrome 上设置 muted 也无法进行自动播放
      if (!this.audio) {
        this.audio = document.createElement('audio')
        // this.audio.setAttribute('controls', true)
        this.audio.src = require('@/assets/audio/ding.mp3')
        // this.audio.style.width = '100%'
        // this.audio.style.height = '100%'
        // this.audio.style.postion = 'absolute'
        // this.audio.style.overflow = 'hidden'
        // this.audio.id = 'auto-play-audio'
        // this.audio.style.position = 'absolute'
        // this.audio.style.zIndex = '-999'
        // this.audio.setAttribute('muted', 'muted')
        // this.audio.loop = false
        document.body.appendChild(this.audio)
      }
      this.audio.load()
      const audioPlay = this.audio.play()
      audioPlay.then(() => {
        console.log('can auto play')
      }).catch((error) => {
        if (!this.isHandle && !this.playNumber) {
          this.$confirm('开启语音', '提示').then(() => {
            this.isHandle = true
          }).catch(() => {
            this.isHandle = true
          })
        }
        this.playNumber++
        console.log('not permission', error)
      })

      // this.$nextTick(() => {
      //   // 初始化 web audio api
      //   const AudioContext = window.AudioContext || window.webkitAudioContext
      //   const audioCtx = new AudioContext()
      //   // 设置音频源
      //   const source = audioCtx.createMediaElementSource(this.audio)
      //   // 初始化音量节点
      //   const gainNode = audioCtx.createGain()
      //   gainNode.gain.setValueAtTime(1, audioCtx.currentTime)
      //   source.connect(gainNode)
      //   gainNode.connect(audioCtx.destination)
      //   this.audio.play()
      // })
      // this.audio.oncanplaythrough = (e) => {
      //   console.log('audio', e)
      //   this.audio.play()
      // }
      // this.audio.setAttribute('muted', false)
      // this.audio
    },
    calcuStringWidth (str) {
      const div = document.createElement('span')
      div.style.position = 'absolute'
      div.style.visibility = 'hidden'
      div.style.whiteSpace = 'nowrap'
      div.style.wordBreak = 'none'
      div.style.fontSize = '12px'
      div.innerHTML = str
      document.body.appendChild(div)
      const width = div.offsetWidth
      document.body.removeChild(div)
      console.log('width', width)
      return width
    },
    getNode () {
      const dom = document.getElementById('dom-node')
      if (dom) {
        const type = Object.prototype.toString.call(dom)
        console.log(type)
      }
      console.log()
    },
    // 对数组重新排序
    handleArrayIndex (arr, item) {
      const local = JSON.parse(JSON.stringify(arr))
      if (item) {
        const first = local.splice(0, 1)[0] || {}
        const index = local.findIndex(item => !item.lock)
        local.splice(index, 0, first)
        local.unshift(item)
        console.log('arr', local)
        this.dataList = local
      } else {
        const index = local.findIndex(item => !item.lock)
        const lastItem = local.splice(index, 1)[0] || {}
        local.unshift(lastItem)
      }
      this.dataList = local
    },
    addItem () {
      // 锁定5个为上限
      const item = {
        lock: false,
        value: this.num++
      }
      console.log(item)
      this.handleArrayIndex(this.dataList, item)
    },
    handleLock (index) {
      const item = this.dataList[index]
      const limitLen = this.dataList.filter(item => item.lock).length
      // debugger
      console.log(limitLen, item)
      if (limitLen >= 5 && !item.lock) {
        this.$message.error('锁定数量已达上限')
      } else {
        item.lock = !item.lock
        console.log(index)
        // debugger
        // this.dataList[index], 'lock', !item.lock)
        console.log(this.dataList)
      }
      this.handleArrayIndex(this.dataList)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.scaleBodySize) {
      window.removeEventListener('resize', this.scaleBodySize)
    }
    if (this.alarmTimer) {
      clearInterval(this.alarmTimer)
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  min-width: 1080px;
  min-height: 720px;
}
.f-red {
  color: #f00;
}
.f-pointer {
  cursor: pointer;
}
.list-wrap {
  width: 200px;
  height: 200px;
  margin: auto;
  overflow: hidden;
  .item {
    float: left;
    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-bottom: 10px;
    border: 1px solid #f0f;
    box-sizing: border-box;
    &:nth-child(1) {
      width: 130px;
      height: 130px;
      margin-left: 0;
    }
    &:nth-child(n + 4) {
      float: right;
    }
    &:nth-child(6) {
      margin-left: 0;
    }
  }
}
</style>
