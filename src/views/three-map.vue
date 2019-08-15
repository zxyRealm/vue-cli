<template>
  <div class="chain-container">
    <iframe
      :src="frame.path"
      :id="frame.id"
      scrolling="no"
      frameborder="0"
      ref="iframe"
      class="iframe"
    ></iframe>
  </div>
</template>
<script>

export default {
  name: 'MapContainer',
  components: {},
  data () {
    return {
      frame: {
        path: 'static/views/chain.html?mode=1&time=' + Number(new Date()),
        id: 'chainFrame'
      }
    }
  },
  methods: {
    getCountryData () {
      this.iframe.postMessage({
        cmd: 'post_country_data',
        data: {}
      }, '*')
    },
    getProvinceData (id, center, name) {
      let data = {
        groupGuid: this.groupGuid,
        nodeType: 'PROVINCE',
        code: id + '0000000000'
      }
      getChainCount(data).then(res => {
        const flowData = {
          name: name,
          totalFlow: res.data.allChainNumber,
          children: []
        }
        if (res.data.chainStoreCountList.length) {
          res.data.chainStoreCountList.forEach(item => {
            flowData.children.push({
              province: item.areaName,
              provinceId: item.code,
              totalFlow: item.storeNumber,
              type: 1
            })
          })
        }
        this.iframe.postMessage({
          cmd: 'post_province_data',
          data: flowData,
          id: id,
          center: center,
          name: name
        }, '*')
      })
    },
    getCityData (id, center, name) {
      let data = {
        groupGuid: this.groupGuid,
        nodeType: 'CITY',
        code: id.length === 6 ? id + '000000' : id + '00000000'
      }
      getChainCount(data).then(res => {
        const flowData = {
          name: name,
          totalFlow: res.data.allChainNumber,
          children: []
        }
        if (res.data.chainStoreCountList.length) {
          res.data.chainStoreCountList.forEach(item => {
            flowData.children.push({
              province: item.areaName,
              provinceId: item.code,
              totalFlow: item.storeNumber,
              type: 1
            })
          })
        }
        this.iframe.postMessage({
          cmd: 'post_city_data',
          data: flowData,
          id: id,
          center: center,
          name: name
        }, '*')
      })
    },
    handleMessage (event) {
      const data = event.data
      switch (data.cmd) {
        case 'chain-load_signal':
          this.getCountryData()
          break
        case 'province_signal':
          this.getProvinceData(data.data, data.center, data.name)
          break
        case 'city_signal':
          this.getCityData(data.data, data.center, data.name)
          break
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.handleMessage)
  },
  mounted () {
    this.$nextTick(() => {
      this.iframe = this.$refs.iframe.contentWindow
    })
    window.addEventListener('message', this.handleMessage)
  }
}
</script>
<style lang="scss" scoped>
  .chain-container {
    height: calc(100vh - 50px);
    .iframe {
      width: 100%;
      height: 100%;
      color: #2D3B80
    }
  }
</style>
