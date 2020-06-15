/*
* @Desc 手机号国际化
* @Author  折威
* @Date 2020-06-13 16:32:20
*/

<template>
<div>
  <el-input
    class="phone__input"
    @blur="handleBlur"
    v-model="phone">
    <el-select
      @change="handleSelectChange"
      slot="prepend"
      v-model="flags">
      <el-option
        :key="index"
        :label="`+${item.ab}`"
        :value="`+${item.ab}`"
        v-for="(item, index) in countrys">
        <span
          :style="{
            backgroundPosition: `-1px -${17 * item.index}px`
          }"
          class="flags"></span>
        <span>
          {{item.name}} +{{item.ab}}
        </span>
      </el-option>
    </el-select>  
  </el-input>
</div>
</template>

<script>
import { IZ, Rcb } from './public/data'
export default {
  name: 'PhoneInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      countrys: Rcb,
      phone: '', // 手机号
      flags: '' // 国家区号
    }
  },
  computed: {
    // 所有国家区号
    totalflags () {
      const flagsList = []
      Object.keys(this.countrys).forEach(c => {
        flagsList.push(this.countrys[c].ab)
      })
      return flagsList
    }
  },
  mounted () {
    this.sortAreaData()
  },
  methods: {
    sortAreaData () {
      const areaList = []
      Object.keys(Rcb).forEach(key => {
        areaList.push({
          ...Rcb[key],
          key
        })
      })
      const newList = areaList.sort((a, b ) => a.name.localeCompare(b.name))
      console.log(newList)
    },
    // 拼接完整手机号
    formatFullPhone () {
      const fullPhone = `${this.flags} ${this.phone}`
      this.$emit('input', fullPhone)
    },
    handleSelectChange (event) {
      this.formatFullPhone()
      this.$emit('change', event)
    },
    handleBlur (event) {
      this.formatFullPhone()
      this.$emit('blur', event)
    },
    checkFlagValid (flag) {
      return (flag || '').indexOf('+') === 0
    }
  },
  watch: {
    value: {
      handler (val) {
        // 根据首位前缀中 + 判定此号码是否包含国家区号
        console.log('==== ', val)
        const hasFlags = this.checkFlagValid(val)
        const arr = (val || '').trim().split(/\s+/)
        if (hasFlags) {
          // 包含区号，区号和手机号用空格隔开
          console.log(arr)
          this.phone = (arr[1] || '').trim()
          this.flags = arr[0].trim()
        } else if (val.indexOf('+') === 0) {
          this.flags = ''
          this.phone = (arr[0] || '').trim()
        } else {
          this.flags = '+86'
          this.phone = (arr[0] || '').trim()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.flags {
  display: inline-block;
  height: 80%;
  width: 60px;
  background-image: url(../../assets/images/flags.png);
  background-size: 24px 3876px;
  width: 24px;
  height: 16px;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.phone__input {
  /deep/.el-select {
    .el-input__inner {
      width: 90px;
    }
  }
}
</style>
