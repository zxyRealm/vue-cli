<template>
  <div class="time-line--wrap">
    <el-tooltip
      :key="index"
      placement="top"
      :content="`${item.name}: ${item.timeStr}`"
      v-for="(item, index) in timeLineList">
      <div
        v-minwidth
        class="line-item"
        :class="item.type"
        :style="item.style">
        {{item.name}}
      </div>
    </el-tooltip>
    
  </div>
</template>
<script>
import { timeToNumber } from '@/utils/num'
export default {
  inject: ['ruleForm'],
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    prop: String,
    percent: Number
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('com prop', this.prop, this.percent)
    // console.log(this.ruleForm)
  },
  methods: {
    // 计算时间段样式
    computedLineStyle (start, end) {
      const total = 24 * 3600
      const width = (timeToNumber(end) - timeToNumber(start)) / total * 100 + '%'
      const left = (timeToNumber(start) / total) * 100 + '%'
      return {
        width,
        left
      }
    }
  },
  computed: {
    timeLineList () {
      const timeList = []
      const { 
              signOut,
              signInBegin,
              signInEnd,
              signInLateBegin,
              signInLateEnd,
              signOutEarlyBegin,
              signOutEarlyEnd,
              signOutBegin,
              signOutEnd 
            } = this.data
      if (signInBegin && signInEnd) {
        timeList.push({
          name: '签到',
          type: 'success',
          timeStr: `${signInBegin}-${signInEnd}`,
          style: this.computedLineStyle(signInBegin, signInEnd)
        })
      }
      if (signInLateBegin && signInLateEnd) {
        timeList.push({
          name: '迟到',
          type: 'danger',
          timeStr: `${signInLateBegin}-${signInLateEnd}`,
          style: this.computedLineStyle(signInLateBegin, signInLateEnd)
        })
      }
      if (signOut && signOutEarlyBegin && signOutEarlyEnd) {
        timeList.push({
          name: '早退',
          type: 'danger',
          timeStr: `${signOutEarlyBegin}-${signOutEarlyEnd}`,
          style: this.computedLineStyle(signOutEarlyBegin, signOutEarlyEnd)
        })
      }
      if (signOut && signOutBegin && signOutEnd) {
        timeList.push({
          name: '签退',
          type: 'success',
          timeStr: `${signOutBegin}-${signOutEnd}`,
          style: this.computedLineStyle(signOutBegin, signOutEnd)
        })
      }
      // console.log(timeList)
      return timeList
    }
  },
  directives: {
    minwidth: {
      inserted(el) {
        if (el.offsetWidth < 40) {
          el.innerText = ''
        }
      },
      componentUpdated (el) {
        if (el.offsetWidth < 40) {
          el.innerText = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line--wrap {
  position: relative;
  height: 22px;
  line-height: 22px;
  background: #ddd;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  .line-item {
    position: absolute;
    height: 100%;
    top: 0;
    // padding: 0 20px;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    &.success {
      background: green;
    }
    &.danger {
      background: red;
    }
  }
}
</style>
