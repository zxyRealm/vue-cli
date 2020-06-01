/*
* @Desc 
* @Author  折威
* @Date 2020-05-28 05:23:36
*/

<template>
  <div>
    <config-form
      :config="config"></config-form>
  </div>
</template>

<script>
import ConfigForm from '@/components/config-form'
// import config from '@/mock/form'
export default {
  name: 'index',
  components: {
    ConfigForm
  },
  data () {
    return {
      // config: config.data
    }
  },
  computed: {
    config () {
      let { formConfig } = this.$store.state.permission
      formConfig = JSON.parse(JSON.stringify(formConfig))
      if (Array.isArray(formConfig)) {
        const params = this.$route.path.split('/')
        const index = params[params.length - 1].split('_')[1]
        return formConfig[index] || {}
      } else {
        return formConfig
      }
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
