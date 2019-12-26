<template>
  <div class="real-stream">
    <div
      v-for="(item, index) in streamList"
      :key="index"
      class="video-item">
      <div class="title">{{item.name}}</div>
      <div class="video-box">
        <video
          width="500"
          height="400"
          :id="`video-target-${index}`"
          class="video-target"></video>
      </div>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.min.css'
const VideoJs = require('video.js')
// require('videojs-flash')
require('videojs-contrib-hls')

  export default {
    data () {
      return {
        player: null,
        streamList: [
          {
            src: 'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8',
            name: 'CCTV5 高清'
          }
          // {
          //   src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
          //   name: '湖南卫视'
          // }
        ],
        videoList: [],
        videoOptions: {
          language: 'zh-CN',
          fluid: true,
          controls: true,
          techOrder: ['html5'],
          sources: [
            {
              src: 'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8'
            }
          ]
        }
      }
    },
    mounted () {
      this.initVideo()
      VideoJs.language_ = 'zh-CN'
      console.log(VideoJs)
    },
    methods: {
      initDataList (arr) {
        const list = (arr || []).map((item, index) => {
          return {
            ...item,
            id: `video-target_${index}`
          }
        })
        list.forEach(item => {
          this.initVideo(item)
        })
      },
      // 初始化 video
      initVideo (item) {
        const video = VideoJs('video-target-0', this.videoOptions, (e) => {
          console.log(video)
          // video.play()
        })
        this.player = video
      }
    },
    beforeDestroy () {
      if (this.player) {
        this.player.dispose()
      }
    }
  }
</script>
<style lang="scss" scoped>
.real-stream {
  // display
  overflow: auto;
  padding: 0 10px;
  .video-item {
    float: left;
    width: 48%;
    box-sizing: border-box;
    background: #eee;
    margin-bottom: 16px;
    + .video-item {
      margin-left: 4%;
    }
    &:nth-child(2n + 1) {
      margin-left: 0;
    }
  }
  .title {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    box-sizing: box-sizing;
    background: #999;
  }
  .video-box {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(100% * 9 / 16);
  }
  .video-target {
    // position: absolute;
    // width: 100%;
    // height: 100%;
  }
}
</style>