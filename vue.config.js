// vue.config.js
const fs = require('fs')
const { NODE_ENV, BASE_URL } = process.env

module.exports = {
  publicPath: BASE_URL, // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源的目录
  runtimeCompiler: true,
  // transpileDependencies: ['element-ui/packages/'],
  lintOnSave: NODE_ENV === 'development', // 开发环境下保存时lint代码
  productionSourceMap: true, // 生产环境的 source map
  configureWebpack: { // webpack 简单配置
  },
  chainWebpack: config => { // webpack 链式配置
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      sass: {
        data: `@import "@/styles/var.scss";@import "@/styles/mixin.scss";`
      }
    }
  },
  devServer: { // 参考 webpack-dev-server 配置项
    contentBase: './public',
    disableHostCheck: false, // host 检查
    // https: true,
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
    ca: fs.readFileSync('./ca.key'),
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
