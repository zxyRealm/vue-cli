// 文件夹上传实例
<template>
  <div>
    <uploader
      single
      @file-added="handleFileAdd"
      @files-added="handleFilesAdd"
      ref="uploader"
      :fileList="fileList"
      :options="options"
      class="uploader-example">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn :attrs="attrs">
        <p>Drop files here to upload or</p>
        select images
      </uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
  <el-button @click="getFileList">Get Files</el-button>
    <!-- <input type="file" />
    <el-button class="btn" @click="init" name="test">上 传</el-button> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueUploader from 'vue-simple-uploader'
Vue.use(VueUploader)

export default {
  data () {
    return {
      uploader: null,
      options: {
        initFileFn: this.initFileFn,
        // readFileFn: this.readFileFn,
        target: '',
        testChunks: false
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js

      },
      fileList: [],
      attrs: {
        accept: 'image/png,image/jpeg,image/jpg,application/x-zip-compressed'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.uploader = this.$refs.uploader
    },
    initFileFn (root, files, file) {
      console.log(root, files, file)
    },
    readFileFn (root, files, file) {
      console.log(root, files, file)
      return root
    },
    getFileList () {
      console.log(this.uploader.fileList)
    },
    handleFileAdd (file) {
      const fileName = file.name
      const type = fileName.substr(fileName.lastIndexOf('.') + 1)
      // console.log('file', type, file)
      if (!['png', 'jpeg', 'jpg', 'zip'].includes(type)) {
        this.$message.closeAll()
        this.$message.warning('仅允许png、jpg、jpeg格式')
        file.ignored = true
      }
      // console.log(file.relativePath.match(/\//g))
      if (file.relativePath.match(/\//g).length > 1) {
        file.ignored = true
      }
    },
    handleFilesAdd (file, fileList) {
      const fileName = file.name || ''
      const type = fileName.substr(fileName.lastIndexOf('.') + 1)
      // zip 或者文件夹 只允许单个上传
      const oneItem = fileList.length === 1 && (fileList[0].type)

      if (!['png', 'jpeg', 'jpg', 'zip'].includes(type)) {
        // this.$message.closeAll()
        // this.$message.warning('仅允许png、jpg、jpeg格式')
        // file.ignored = true
      }
      console.log('file list', fileList)
    }
  },
  watch: {
    fileList (val) {
      console.log(val)
    }
  }
}
</script>

<style>
.test {
  color: #ddd;
}
</style>
