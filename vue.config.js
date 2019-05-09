// vue.config.js
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variables.sass')
        // path.resolve(__dirname, './src/styles/imports.styl')
      ]
    })
}

module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(true)
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    // types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
  }
}
