/*
* @Desc 手机号
* @Author  折威
* @Date 2020-06-13 16:31:11
*/

<template>
  <div>
    {{phone}}
    <phone-input v-model="phone"></phone-input>
  </div>
</template>

<script>
import PhoneInput from '@/components/phone/phone'
export default {
  name: 'index',
  components: {
    PhoneInput
  },
  data () {
    return {
      phone: '+1 23423443'
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
