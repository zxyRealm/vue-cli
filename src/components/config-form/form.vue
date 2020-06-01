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
    <div class="page-title">
      {{$route.meta && $route.meta.title}}
    </div>
    <el-form-item
      :key="`item_${index}`"
      :prop="item.prop"
      :label="item.label"
      v-for="(item, index) in config.formList">
      <!-- type 为 text 或者 textarea -->
      <el-input
        v-if="['text', 'textarea'].includes(item.type) || !item.type"
        :placeholder="item.placeholder || `请输入${item.label}`"
        v-model="form[item.prop]"
        :type="item.type || 'text'">
      </el-input>
      <!-- type 为 radio -->
      <el-radio-group
        v-else-if="['radio'].includes(item.type)"
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
        v-else-if="['checkbox'].includes(item.type)"
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
        v-else-if="['select'].includes(item.type)"
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
// 正则校验
function validateRule(value, type) {
  let reg = ''
  switch (type) {
    case 0: // validate web url
      reg = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
      return {
        result: reg.test(value),
        message: '请输入合法网址'
      }
    case 1: // 仅限数字
      reg = /^(\d|([1-9]+\d*))$/
      return {
        result: reg.test(value),
        message: '请输入正整数'
      }
    case 2:
      reg = /^[A-Za-z]+$/
      return {
        result: reg.test(value),
        message: '请输入字母'
      }
    case 3:
      reg = /^[0-9A-Za-z]+$/
      return {
        result: reg.test(value),
        message: '请输入字母或数字'
      }
  }
}
export default {
  name: 'ConfigForm',
  props: {
    model: { // 表单绑定值
      type: Object,
      default: () => ({})
    },
    config: { // 生成表单内容的配置
      type: [Object, Array],
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: 'top'
    }
  },
  data () {
    function numberValidator (rule, value, callback) {
      if (value) {
        if (/^[\d]+$/.test(value)) {
          callback();
        } else {
          callback(new Error('仅限数字'));
        }
      } else {
        callback();
      }
    }
    return {
      form: {},
      rules: {}
    }
  },
  created () {
    this.initFormData(this.config.formList)
  },
  methods: {
    // 初始化表单校验规则 / form
    initFormData (array) {
      array = array || []
      this.rules = {}
      array.forEach(item => {
        const { required, emptytip, label } = item
        const message = (['radio', 'select', 'checkbox'].includes(item.type) ? '请选择' : '请输入') + label
        const rule = [{
          required,
          message: emptytip || message,
          trigger: ['radio', 'select', 'checkbox'].includes(item.type) ? 'change' : 'blur'
        }]
        // input text / textarea 内容长度限制
        if (!['radio', 'select', 'checkbox'].includes(item.type) || !item.type) {
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
          // 自定义校验规则
          const validateFun = (item.validator || '').indexOf('function') === 0 && eval('(' + item.validator + ')')
          // console.log(validateFun)
          if (typeof validateFun === 'function') {
            rule.push({
              validator: validateFun.bind(this),
              trigger: 'blur'
            })
          } else if ([0, 1, 2, 3].includes(item.validator)) {
            rule.push(this.baseValidator(item.validator))
          }
        }
        this.$set(this.rules, item.prop, rule)
        this.$set(this.form, item.prop, ['checkbox'].includes(item.type) ? [] : '')
        this.$nextTick(() => {
          const form = this.$refs.configForm
          if (form) {
            form.clearValidate()
          }
        })
      })
    },
    baseValidator (type) {
      const validator = (rule, value, callback) => {
        if (value) {
          const regResult = validateRule(value, type)
          if (regResult.result) {
            callback()
          } else {
            callback(new Error(regResult.message))
          }
        } else {
          callback()
        }
      }
      return {
        validator,
        trigger: 'blur'
      }
    },
    // 获取信息
    getConfigInfo () {
      const params = this.form
    },
    // 保存信息
    setConfigInfo () {
      const params = this.form
      this.$refs.configForm.validate((valid) => {
        if (valid) {

        }
      })
    }
  },
  watch: {
    userInfo: {
      handler (val) {
        if (val && val.id && !this.$slots.footer) {
          this.getConfigInfo()
        }
      },
      immediate: true
    }
  }
}

</script>

<style scoped lang="scss">
.page-title {
  margin-bottom: 20px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
}
.el-form--label-top {
  /deep/.el-form-item__label {
    padding: 0;
  }
}
.form__footer {
  margin: 30px 0;
}
</style>
