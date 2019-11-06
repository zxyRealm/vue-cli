// 文件夹上传实例
<template>
  <div>
    <input type="file" />
    <el-button class="btn" @click="init" name="test">上 传</el-button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      document.addEventListener('DOMContentLoaded', function(event) {
        document
          .getElementById('fileInput')
          .addEventListener('change', function() {
            var uploadFile = function(file, path) {
              console.log(path, file)
              // handle file uploading
            }
            var iterateFilesAndDirs = function(filesAndDirs, path) {
              for (var i = 0; i < filesAndDirs.length; i++) {
                if (
                  typeof filesAndDirs[i].getFilesAndDirectories === 'function'
                ) {
                  var path = filesAndDirs[i].path

                  // this recursion enables deep traversal of directories
                  filesAndDirs[i]
                    .getFilesAndDirectories()
                    .then(function(subFilesAndDirs) {
                      // iterate through files and directories in sub-directory
                      iterateFilesAndDirs(subFilesAndDirs, path)
                    })
                } else {
                  uploadFile(filesAndDirs[i], path)
                }
              }
            }
            // begin by traversing the chosen files and directories
            if ('getFilesAndDirectories' in this) {
              this.getFilesAndDirectories().then(function(filesAndDirs) {
                iterateFilesAndDirs(filesAndDirs, '/')
              })
            }
          })
      })
    }
  }
}
</script>

<style>
.test {
  color: #ddd;
}
</style>
