<template>
  <div>
  <h2> el-select remote</h2>
  <el-row>

    <or-select
      remote
      multiple
      filterable
      value-key="id"
      :loading="loading"
      :remote-method="remoteQuery"
      v-model="value">
      <or-option
        v-for="item in selectList"
        :style="{display: 'none'}"
        :value="item"
        :label="item.name"
        :key="`hide-${item.id}`"></or-option>
      <or-option
        v-for="item in list"
        :key="item.id"
        :value="item"
        :label="item.name">
      </or-option>
    </or-select>

    <h2> table 行合并 </h2>
    <el-table
      :span-method="arraySpanMethod"
      :data="timeList">
      <el-table-column
        fixed="left"
        prop="name"
        label="时间段名称"
        width="100"></el-table-column>
      <el-table-column
        fixed="left"
        prop="name"
        label="签到/签退时间段"
        width="130"></el-table-column> 
      <el-table-column
        fixed="left"
        prop="name"
        label="迟到/早退时间段"
        width="130"></el-table-column>
      <el-table-column
        fixed="left"
        prop="name"
        label="操作"
        width="80">
        <template slot-scope="{ row }">
          <i class="el-icon-edit mr10"></i>
          <i class="el-icon-delete"></i>
        </template>
      </el-table-column>
      <el-table-column
        min-width="46"
        v-for="(t, index) in timeStrList"
        :key="'t' + index"
        :label="t.label">
        <template slot-scope="{ row }">
          <time-line percent="100" :data="row"></time-line>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  </div>
</template>
<script>
import OrSelect from 'element-ui/packages/select'
import OrOption from 'element-ui/packages/option'
import TimeLine from '@/components/time-line'
import { timeToNumber } from '@/utils/num'
// 时间点顺序
const timeKeys = [
  'signInBegin',
  'signInEnd',
  'signInLateBegin',
  'signInLateEnd',
  'signOutEarlyBegin',
  'signOutEarlyEnd',
  'signOutBegin',
  'signOutEnd'
]

export default {
  provide () {
    return {
      ruleForm: this
    }
  },
  components: {
    OrOption,
    OrSelect,
    TimeLine
  },
  data () {
    return {
      value: [
        { name: '11111', id: 1 },
        { name: '55555', id: 5, label: '0000' }
      ],
      list: [],
      loading: false,
      timeList: [
        {
          name: '通用班次',
          signOut: true,
          signInBegin: '07:00',
          signInEnd: '09:00',
          signInLateBegin: '09:30',
          signInLateEnd: '10:00',
          signOutEarlyBegin: '',
          signOutEarlyEnd: '',
          signOutBegin: '18:00',
          signOutEnd: '22:00'
        }
      ],
      timeStrList: [
        { label: '00' },
        { label: '01' },
        { label: '02' },
        { label: '03' },
        { label: '04' },
        { label: '05' },
        { label: '06' },
        { label: '07' },
        { label: '08' },
        { label: '09' },
        { label: '10' },
        { label: '11' },
        { label: '12' },
        { label: '13' },
        { label: '14' },
        { label: '15' },
        { label: '16' },
        { label: '17' },
        { label: '18' },
        { label: '19' },
        { label: '20' },
        { label: '21' },
        { label: '22' },
        { label: '23' }
      ]
    }
  },
  mounted () {
    // this.selectList.push({ name: '11111', id: 1 })
    // console.log(timeToNumber('23:23'))
    // console.log(this.compareTimeSpot(this.timeList[0]))
  },
  methods: {
    remoteQuery () {
      this.loading = true
      let list = []
      setTimeout(() => {
        let sIndex = this.list.length
        for (let i = 0; i < 10; i++) {
          const id = sIndex + i
          const name = id.toString().repeat(5)
          list.push({ name, id })
        }
        this.list = this.list.concat(list)
        console.log(this.list)
        this.loading = false
      }, 500);

    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        return [1, 25]
      } else if (columnIndex > 4) {
        return [0, 0]
      }
    },
    // // 24 小时制时间字符串
    // timeToNumber (time) {
    //   if (time && typeof time === 'string' && time.includes(':')) {
    //     const tArr = time.split(':')
    //     const h = tArr[0] * 3600
    //     const m = tArr[1] * 60
    //     return h + m
    //   }
    //   return null
    // },
    // 时间顺序排列
    sortTimeToList (obj) {
      const newTimeList = []
      timeKeys.forEach(key => {
        // console.log(key)
        newTimeList.push(
          {
            key: key,
            value: obj[key] || ''
          }
        )
      })
      return newTimeList
    },
    compareTimeSpot (obj) {
      const timeList = this.sortTimeToList(obj)
      const timeNumList = timeList.filter(item => item.value).map(item2 => {
        return {
          ...item2,
          timeNum: timeToNumber(item2.value)
        }
      })
      for (let i = 0;i < timeNumList.length; i++) {
        if (timeNumList[i] && timeNumList[i + 1]) {
          if (timeNumList[i].timeNum > timeNumList[i + 1].timeNum) {
            return timeNumList[i + 1]
          }
        }
      }
      // console.log(timeNumList, timeList)
      return null
    }
  },
  computed: {
    selectList () {
      const listIds = this.list.map(item => item.id)
      return this.value.filter(item => !listIds.includes(item.id))
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
