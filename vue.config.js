// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const THEME = process.env.VUE_APP_UNIUBI_THEME
module.exports = {
  publicPath: process.env.BASE_URL, // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源的目录
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html'
    },
    chain: {
      entry: 'src/index/chain.js',
      template: 'template/chain.html',
      filename: 'static/views/chain.html'
    }
  }, // 在 multi-page 模式下构建应用
  lintOnSave: true, // 开发环境下保存时lint代码
  productionSourceMap: false, // 生产环境的 source map
  configureWebpack: { // webpack 简单配置
    plugins: [
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     warnings: false,
      //     compress: {
      //       pure_funcs: ['console.log', 'console.info'] // 打包时去除console.log console.info
      //     }
      //   },
      //   parallel: true
      // })
    ]
  },
  chainWebpack: config => { // webpack 链式配置
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      sass: {
        data: `@import "@/styles/variables.scss";@import "/assets/theme/${THEME}/var.scss";@import "@/styles/mixin.scss";`
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
