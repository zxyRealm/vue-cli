<template>
  <div class="about">
    <img :src="require('@/assets/logo.png')" alt="">
    <h1>This is an about page</h1>
    <el-button @click="getDataList">刷新</el-button>
    <el-checkbox-group @change="checkChange" v-model="currentList">
      <el-checkbox
        v-for="(item, index) in list"
        :checked="item.checked"
        :key="index"
        :label="item.id">
        {{item.label}}
      </el-checkbox>
    </el-checkbox-group>
    <ul class="check-wrap">
      <li>
        <span
          class="item"
          v-for="(item, index) in checkList"
          :key="index">{{item.label}} 
          <i class="el-icon-close" @click="delItem(item)"></i>
        </span>
      </li>
    </ul>
  </div>

</template>
<script>
export default {
  name: 'about-us',
  data () {
    return {
      currentList: [],
      list: [],
      checkList: []
    }
  },
  computed: {
    curKey () {
      return 'id'
    }
  },
  mounted () {
    console.info('我是个info, 你能找到我吗？')
    this.getDataList()
  },
  methods: {
    getDataList () {
      let num = Math.random()* 5 + 5
      const list = []
      for (let i = 0; i < num; i++) {
        const num = parseInt(Math.random() * 50)
        if (list.includes(num)) {
          num = parseInt(Math.random() * 50)
        }
        list.push({
          id: num,
          label: num
        })
      }
      this.currentList = this.initListCheckState(list)
      this.list = list
    },
    checkChange (val) {
      val = this.currentList || val
      const checkIds = this.checkList.map(item => item.id)
      this.list.forEach(item => {
        const isChecked = val.includes(item.id)
        const isInclude = checkIds.includes(item.id)
        if (!isInclude && isChecked) {
          this.checkList.push(item)
        }
      })
      console.log('group change', val)
    },
    delItem (val) {
      const unitKey = val[this.curKey]
      const index = this.checkList.findIndex(item => item[this.curKey] === unitKey)
      const curIndex = this.currentList.findIndex(item => item === unitKey)
      if (curIndex > -1) {
        console.log(curIndex, unitKey)
        this.currentList.splice(curIndex, 1)
      }
      this.checkList.splice(index, 1)
    },
    initListCheckState (list) {
      const checkIds = this.checkList.map(item => item[this.curKey])
      const listIds = list.map(item => item[this.curKey])
      return listIds.filter(id => checkIds.includes(id))
    }
  },
  watch: {
    checkList: {
      handler (val, oldVal) {
        // 监听处理删除事件 
        if (val.length < oldVal.length) {
          // const curIndex = 
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.check-wrap {
  height: 200px;
  margin: 20px 0;
  border: 1px solid #ddd;
  .item {
    margin-right: 6px;
  }
  .el-icon-close{
    cursor: pointer;
  }
}
</style>
