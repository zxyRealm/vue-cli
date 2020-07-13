<template>
  <div class="about">
    <el-select
      @visible-change="handleVisibleChange"
      v-model="personId">
      <div
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-distance="5"
        :infinite-scroll-immediate="false"
        v-infinite-scroll="load">
        <el-option
          v-for="i in count"
          :key="i"
          :label="i"
          :value="i"></el-option>
        <li v-if="loading">Loading...</li>
      </div>
    </el-select>
    <i class="el-icon-arrow-left" @click="() => { $router.push('/about') }"></i>
    <el-button @click="addStorage">Add</el-button>
    <!-- <img :src="require('@/assets/logo.png')" alt=""> -->
    <h1>This is an about page</h1>
    <el-button @click="getDataList">{{$t('common_refresh')}}</el-button>
    {{$t('测试')}}
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
import langData from '@/node/index'

export default {
  name: 'about-us',
  data () {
    return {
      infiniteDisabled: false,
      personId: '',
      count: 10,
      loading: false,
      currentList: [],
      list: [],
      checkList: [],
      newObj: {}

    }
  },
  computed: {
    curKey () {
      return 'id'
    },
    noMore () {
      return this.count > 20
    },
    disabled () {
      return this.loading || !this.infiniteDisabled
    },
    localList: {
      get () {
        return JSON.parse(localStorage.getItem('list')) || []
      },
      set (val) {
        localStorage.setItem('list', JSON.stringify(val))
      }
    }
  },
  mounted () {
    console.info('我是个info, 你能找到我吗？')
    // this.getDataList()
    this.initStorage('init')
    this.unfoldObjectKey(langData, this.newObj, '')
    console.log(this.newObj, Object.keys(this.newObj))
  },
  methods: {
    unfoldObjectKey (obj, newObj, parentsKey) {
      // const newObj = {}
      Object.keys(obj).forEach((key) => {
        const fullKey = `${parentsKey}.${key}`.replace(/^(\.)(.*)/, '$2')
        if (typeof obj[key] === 'object') {
          this.unfoldObjectKey(obj[key], newObj, fullKey)
        } else {
          if (parentsKey) newObj[fullKey] = obj[key]
        }
      })
    },
    getStorage () {
      return JSON.parse(localStorage.getItem('list')) || []
    },
    initStorage () {
      const local = this.getStorage()
      local.forEach(item => {
        this.setStorage(item, 'init')
      })
    },
    setStorage (data, type) {
      const local = this.getStorage()
      const index = local.findIndex(i => i.name === data.name)
      if (index === -1) local.push(data)
      // console.log(index, data, this)
      if (type === 'init' || index === -1) {
        this.$notify({
          title: this.$t('提示'),
          message: `${data.name}<br/>
          <a target="_blank" href="/">new page</a>`,
          duration: 0,
          dangerouslyUseHTMLString: true,
          onClose: () => {
            this.clearStorage(data)
          }
        })
      }
      localStorage.setItem('list', JSON.stringify(local))
    },
    addStorage () {
      const name = this.getStorage().length.toString().repeat(3)
      this.setStorage({ name })
    },
    clearStorage (data) {
      if (!data) return
      const cur = this.getStorage().filter(item => item.name !== data.name)
      localStorage.setItem('list', JSON.stringify(cur))
    },
    handleVisibleChange (val) {
      this.infiniteDisabled = val
    },
    load () {
      console.log('loading...')
      this.loading = true
      const timer = setTimeout(() => {
        this.count += 2
        this.loading = false
        clearTimeout(timer)
      }, 1500)
    },
    getDataList () {
      let num = Math.random() * 5 + 5
      const list = []
      for (let i = 0; i < num; i++) {
        num = parseInt(Math.random() * 50)
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
<style lang="scss" scoped>
.text-ellipsis {
  display: inline-block;
  height: 100%;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: none;
}
.flex-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // flex-flow: row-reverse wrap;
  justify-content: space-around;
  .flex-item {
    padding: 10px;
    border-radius: 50%;
    background: #dab;
    margin-left: 10px;
    margin-bottom: -6px;
  }
  .left {
    flex: 0;
    width: 100px;
    float: left;
    max-width: 30%;
  }
  .right {
    height: 100%;
    overflow: hidden;
    padding-left: 10px;
  }

}
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
