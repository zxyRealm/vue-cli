<template>
  <div>
    <h1>系统摄像头拍照功能调研</h1>
    <!-- <form id="web-camera">
      <input type="button" value="拍照" @click="startCapture">
    </form> -->
    <div id="web-camera" class="web-camera--wrap"></div>
    <div class="handle--wrap">
      <el-button @click="startCapture">拍照</el-button>
    </div>
    <img v-if="dataUrl" :src="dataUrl" alt="">
  </div>
</template>

<script>
// webcamjs 使用文档
// https://github.com/jhuckaby/webcamjs/blob/master/DOCS.md
import WebCam from 'webcamjs'

export default {
  data () {
    return {
      cameraConfig: { // webcam 配置信息
        width: 320,
        height: 240,
        dest_width: 320,
        dest_height: 240,
        crop_width: 320,
        crop_height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
      },
      dataUrl: '' // 抓拍图 base64 编码
    }
  },
  mounted () {
    this.initCamera()
    // console.log(WebCam)
  },
  methods: {
    // 初始化
    initCamera () {
      this.destoryCamera()
      WebCam.on('error', (error) => {
        console.error('webcam error', error.message)
      })
      WebCam.on('live', data => {
        console.log('camerar is alreay')
      })
      WebCam.on('load', (data) => {
        console.log('webcam load', data)
      })
      WebCam.set(this.cameraConfig)
      WebCam.attach('#web-camera')
    },
    // 销毁 camera
    destoryCamera () {
      WebCam.reset()
      WebCam.off('live')
      WebCam.off('load')
      WebCam.off('error')
    },
    // 开始抓拍
    startCapture () {
      WebCam.snap(data => {
        this.dataUrl = data
        console.log('data', data)
      })
    },
    handleCamError (error) {
      console.error('error', error)
    }
  },
  beforeDestroy () {
    this.destoryCamera()
  }
}
</script>

<style lang="scss" scoped>
.web-camera {
  &--wrap {
    margin: 10px 0;
    border: 1px solid $border-color;
    border-radius: 3px;
  }
}
</style>
