<template>
  <div>
    <h1>系统摄像头拍照功能调研</h1>
    <div id="web-camera" class="web-camera--wrap"></div>
    <!-- <web-cam @error="handleCamError" ref="webCam"></web-cam> -->
    <div class="handle--wrap">
      <el-button @click="startCapture">拍照</el-button>
    </div>
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
        width: 500,
        height: 300,
        image_format: 'jpg',
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
      WebCam.reset()
      WebCam.on('error', (error) => {
        console.error('webcam error', error.message)
      })
      WebCam.set(this.cameraConfig)
      WebCam.attach('#web-camera')
    },
    // 开始抓拍
    startCapture () {
      WebCam.snap(data => {
        this.dataUrl = data.replace('', '')
        console.log('data', data)
      })
    },
    handleCamError (error) {
      console.error('error', error)
    }
  }
}
</script>

<style lang="scss" scoped>
.web-camera {
  &--wrap {
    width: 500px;
    height: 300px;
    margin: 10px 0;
    border: 1px solid $border-color;
    border-radius: 3px;
  }
}
</style>
