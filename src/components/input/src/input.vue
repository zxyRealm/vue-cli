<template>
  <div class="uniubi-input">
    <el-input
      v-bind="$attrs"
      v-on="inputListeners">
    </el-input>
    <transition name="el-zoom-in-top">
      <div v-if="showFocusMessage" class="focus--message">
        {{focusMessage}}
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'UniubiInput',
    inheritAttrs: false,
    props: {
      focusMessage: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isFocus: false,
        inputValue: ''
      }
    },
    computed: {
      inputListeners: function () {
        let vm = this
        // `Object.assign` 将所有的对象合并为一个新对象
        return Object.assign({},
          // 我们从父级添加所有的监听器
          this.$listeners,
          // 然后我们添加自定义监听器，
          // 或覆写一些监听器的行为
          {
            // 这里确保组件配合 `v-model` 的工作
            input: function (val) {
              vm.inputValue = val
              vm.$emit('input', val)
            },
            focus: function (event) {
              let form = vm.form;
              let formItem = vm.formItem
              if (vm['focusMessage']) {
                form.clearValidate([formItem.$props.prop])
                vm.isFocus = true
              }
            },
            blur: function () {
              vm.isFocus = false
            }
          }
        )
      },
      form() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'ElForm') {
          if (parentName === 'ElFormItem') {
            this.isNested = true;
          }
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      formItem() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'ElFormItem') {
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      showFocusMessage () {
        console.log(this.inputValue.length)

        return this.focusMessage && this.isFocus && this.inputValue
      }
    }
  }
</script>

<style lang="scss">
  .uniubi-input {
    position: relative;
  }

  .focus--message {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 4px;
    font-size: 12px;
    color: gray;
    box-sizing: border-box;
  }
</style>
