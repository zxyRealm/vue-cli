# 			国际化中文提取

​	目的： 实现国际化项目中文文案提取的工具化，提高国际化项目开发工作

​	初步支持： `Vue`

​	未来支持： `React`

### 一、实现方案

![i18n-pick-flow](.\images\i18n-pick-flow.png) 

#### 1. 中文文案格式约束

1.  文案内容必须是在以下格式内包裹

   - `$t('欢迎')`
   - `this.$t('欢迎')`
   - `i18n.t('欢迎')`

2. 不支持 key 值的变量模式

   如以下形式

   ```vue
   <template>
   	<div>
           {{$t(`page_header_button_${type}`)}}
       </div>
   </template>
   <script>
       export default {
           data () {
               return {
                   type: 'add'
               }
           }
       }
   </script>
   ```

   

### 二、技术应用

