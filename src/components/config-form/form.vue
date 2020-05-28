/*
* @Desc 配置化表单
* @Author  折威
* @Date 2020-05-28 05:10:08
*/

<template>
  <el-form
    ref="configForm"
    class="config-form"
    :validate-on-rule-change="false"
    @submit.native.prevent
    :label-position="labelPosition"
    :rules="rules"
    :model="form"
    v-on="$attrs">
    <el-form-item
      :key="`item_${index}`"
      :prop="item.prop"
      :label="item.label"
      v-for="(item, index) in config.formList">
      <!-- type 为 text 或者 textarea -->
      <el-input
        v-if="['text', 'textarea'].includes(typeList[item.type]) || !typeList[item.type]"
        :placeholder="item.placeholder || `请输入${item.label}`"
        v-model="form[item.prop]"
        :type="typeList[item.type] || 'text'">
      </el-input>
      <!-- type 为 radio -->
      <el-radio-group
        v-else-if="['radio'].includes(typeList[item.type])"
        v-model="form[item.prop]">
        <el-radio
          :key="`radio_${index}`"
          :label="radio.value"
          v-for="(radio, index) in item.children">
          {{radio.label || radio.value}}
        </el-radio>
      </el-radio-group>
      <!-- type 为 checkbox -->
      <el-checkbox-group
        v-else-if="['checkbox'].includes(typeList[item.type])"
        v-model="form[item.prop]">
        <el-checkbox
          :key="`checkbox_${index}`"
          :label="checkbox.value"
          v-for="(checkbox, index) in item.children">
          {{checkbox.label || checkbox.value}}
        </el-checkbox>
      </el-checkbox-group>
      <!-- type 为 select -->
      <el-select
        v-else-if="['select'].includes(typeList[item.type])"
        v-model="form[item.prop]"
        :placeholder="item.placeholder || `请选择${item.label}`">
        <el-option
          v-for="(option, index) in item.children"
          :key="`option_${index}`"
          :label="option.label"
          :value="option.value">
        </el-option>
      </el-select>
    </el-form-item>
   
    <div class="form__footer">
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
      <template v-else>
        <el-button type="primary" @click="setConfigInfo">保存</el-button>
      </template>
    </div>
  </el-form>
</template>


<script>
export default {
  name: 'ConfigForm',
  props: {
    model: { // 表单绑定值
      type: Object,
      default: () => ({})
    },
    config: { // 生成表单内容的配置
      type: Object,
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      typeList: {
        0: 'text',
        1: 'radio',
        2: 'checkbox',
        3: 'select',
        4: 'textarea'
      },
      form: {},
      rules: {}
    }
  },
  mounted () {
    this.initFormData(this.config.formList)
  },
  methods: {
    // 初始化表单校验规则 / form
    initFormData (array) {
      array = array || []
      this.rules = {}
      array.forEach(item => {
        const { required, emptytip, label } = item
        const message = ([1, 2, 3].includes(item.type) ? '请选择' : '请输入') + label
        const rule = [{
          required,
          message: emptytip || message,
          trigger: [1, 2, 3].includes(item.type) ? 'change' : 'blur'
        }]
        // input text / textarea 内容长度限制
        if ([0, 4].includes(item.type) || !item.type) {
          let range = ''
          if (![null, undefined].includes(item.min) && ![null, undefined].includes(item.max)) {
            range = `${item.min}-${item.max}位`
          } else if (![null, undefined].includes(item.min)) {
            range = `${item.min}位以上`
          } else if (![null, undefined].includes(item.max)) {
            range = `${item.max}位以下`
          }
          if (range) {
            const rangeRule = {
              message: `请输入${range}字符`,
              trigger: 'blur'
            }
            if (![null, undefined].includes(item.min)) rangeRule.min = item.min
            if (![null, undefined].includes(item.max)) rangeRule.max = item.max
            rule.push(rangeRule)
          }
          
        }
        this.$set(this.rules, item.prop, rule)
        this.$set(this.form, item.prop, [2].includes(item.type) ? [] : '')
        this.$nextTick(() => {
          const form = this.$refs.configForm
          if (form) {
            form.clearValidate()
          }
        })
      })
    },
    // 获取信息
    getConfigInfo () {
      const params = this.form
      console.log(this.config.getrequest, params)
    },
    // 保存信息
    setConfigInfo () {
      const params = this.form
      this.$refs.configForm.validate((valid) => {
        if (valid) {

        }
      })
      console.log(this.config.getrequest, params)
    }
  },
  watch: {
    userInfo: {
      handler (val) {
        if (val && val.id) {
          this.getConfigInfo()
        }
      },
      immediate: true
    }
  }
}

</script>

<style scoped lang="scss">
.el-form--label-top {
  /deep/.el-form-item__label {
    padding: 0;
  }
}
.form__footer {
  margin: 30px 0;
}
</style>
