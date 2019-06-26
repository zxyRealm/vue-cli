// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  publicPath: '', // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源的目录
  indexPath: 'index.html',
  filenameHashing: true, // 文件名哈希
  pages: undefined, // 在 multi-page 模式下构建应用
  lintOnSave: true, // 开发环境下保存时lint代码
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  transpileDependencies: [], // Babel 显式转译一个依赖
  productionSourceMap: false, // 生产环境的 source map
  crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
  configureWebpack: { // webpack 简单配置
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            pure_funcs: ['console.log', 'console.info'] // 打包时去除console.log console.info
          }
        },
        parallel: true
      })
    ]
  },
  chainWebpack: config => { // webpack 链式配置
  },
  css: {
    modules: false, // CSS Modules 模块
    extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
    sourceMap: false,
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      sass: {
        data: `@import "@/styles/variables.scss";@import "@/styles/mixin.scss";`
      }
    }
  },
  devServer: { // 参考 webpack-dev-server 配置项
    contentBase: './public',
    disableHostCheck: false, // host 检查
    proxy: {
      '/api': {
        target: 'http://47.75.65.255',
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 参考 http-proxy-middleware 配置项
  },
  pluginOptions: { // 传递任何第三方插件选项
  }
}
