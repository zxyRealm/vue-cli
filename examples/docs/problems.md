# 问题汇总

### Q：iframe跨域通讯问题处理

A：使用现代浏览器自有postMessage的API

使用语法：otherWindow.postMessage(message, targetOrigin, [transfer]);

message:  将要发送到其他 window的数据
targetOrigin:  通过窗口的origin属性来指定哪些窗口能接收到消息事件

---

### Q：Vue项目中使用iframe引入html后，html页面中资源引用问题

A：以相对路径的方式引用资源, 不论资源文件夹和入口文件是否在同一服务下都不会有问题。

create at 2019-02-27

---

### Q: element-ui(2.5.4) el-dialog 组件在IE浏览器中创建又立即消失

A: 将el-dialog组件 close-on-click-modal属性设置为false即可解决

create at 2019-03-01

---
### Q: pm2 日志输出导致服务器内存消耗

A: 关闭pm2 自身的日志输出

* pm2 会默认将日志输出在 ~/.pm2/logs 目录下，开启pm2日志输出后启动的node项目的
日志信息会被全部保留，linux 服务器上可用 `du -sh .[!.]*` 命令查看隐藏文件占用
内存空间大小，由于.pm2 属于隐藏文件夹 `du -sh *` 会无法查看到隐藏文件夹文件
大小

---
### Q: vue-router在mode: hash 模式下在ie浏览器中改变地址栏路劲回车键无法刷新页面

A: 启用mode: history 模式 (使用此模式需要部署web的服务添加404错误拦截处理)

---
### Q: chrome68及以下版本 videojs播放rtmp流 设置全屏显示bug

A:  样式中添加 

```css
.video-js.vjs-fullscreen{
   width: 100vw!important;
}
```

 原因：全屏后.video-js 元素实际宽度变为0，导致视频容器无法展示

---

### Q: element-ui库中el-tree组件setCurrentKey方法使用注意事项

* 异步更新el-tree组件data值，setCurrentKey设置无效，is-current名不存在（直观效果是highlight-current设置后无效）

A：将setCurrentKey 方法放在 nextTick() 中执行

---

### Q: 组件名导致报错`Do not use built-in or reserved HTML elements as component id: time`;

A: 由于组件名与 HTML标签、Vue 保留标签重复引起的，修改vue组件名，添加前缀以此保证组件名与HTML中预留字段或标签名不一样

---

### Q: @vue/cli 启动项目通过域名访问时出现错误 `Invalid Host Header` 

A: 在vue.config.js文件中添加配置信息；添加 `allowedHosts`或者`disableHostCheck`项，任选其一即可

```javascript
// vue.config.js
module.export = {
  devServer: {
      contentBase: './',
      port: '3010',
      allowedHosts: [ // 添加host白名单，host前的.不要省略
        '.uniubi.com'
      ],
      disableHostCheck: true, //取消host检查
  }  
}
  
```
---

### Q: @vue/cli 移除打包后index.html中 prefetch 链接

A: 在vue.config.js文件中添加 `chainWebpack`配置项删除 `prefetch` 插件

详情请看 [官方说明文档](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch)

```js
// vue.config.js
module.export = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  }
}

```
### Q: vue 项目中使用 addEventListener、$on等监听事件注意事项  
   页面组件使用了 addEventListener、$on 后如果不在beforeDestroy生命周期中销毁
会造成监听事件的累加，从而出现事件和请求的重复执行，如果不注意造成的问题不易排查

A: 使用了 addEventListener、$on后，确保在beforeDestroy生命周期中使用 removeEventLister、$off 进行销毁

---

### Q: chrome 上去除密码自动填充


A: element-ui 组件库中 在 `type = 'password'` 的input元素上添加 `autocomplete='new-password''`即可

---

### Q: chrome 上去除input自动填充背景色

A: 
```css
input:-webkit-autofill{
  -webkit-box-shadow: 0 0 0 10000px white inset!important;
}
```

----



### Q:  element-ui 组件中 `pointer-events: none;`样式会造成在ie中子元素  点击事件无法被触发，el-input组件中 `slot='suffix'`方式添加的元素可复现此问题

A: 将其样式改为 `pointer-events: all;`



----



### Q:  小于1的浮点数转百分比特殊值处理  

示例： .29 * 100  != 29



A: 处理方法，添加通用方法

```js
/* 浮点数转百分比
* {[Number, String]} 需要转换的浮点数
* {Number} 保留小数点后几位， 默认展示全部
*/

function floatToPercent (num, fixed) {
  let number
  if (Number(num) > 1) {
    number = num * 100
  } else if (!Number(num)) {
    number = 0
  } else {
    let numStr = num.toString().split('.')[1]
    if (numStr.length < 2) numStr = numStr + '0'
    number = Number(numStr.slice(0, 2) + '.' + numStr.slice(2))
  }
  return (fixed !== undefined ? number.toFixed(fixed) : number) + '%'
}
```



### Q: el-scrollbar 组件在mac 和window表现不一致

 问题详情： el-scrollbar宽度使用百分比设置时，窗口缩放width会存在小数， 此时在window上会出现系统滚动条的一像素边框，但是mac 上此时正常显示，原因是mac 和 window 上系统滚动条宽高不一致

目标浏览器： Chrome / Safari 

element源码中 `.el-scrollbar__wrap` 上的内联样式为

```

.el-scrollbar__wrap {
    margin-bottom: -15px;
    margin-right: -15px;
 }
```



A:  问题处理方式

给el-scrollbar添加一个公用class, 设置样式如下

```
.el-scrollbar.fix-scrollbar {
  &::-webkit-scrollbar {
    height: 17px;
    width: 17px;
  }
  .el-scrollbar__wrap {
    margin-bottom: -17px !important;
    margin-right: -17px !important;
  }
}
```



>  `::-webkit-scrollbar` 伪类样式设置后， 浏览器的滚动条系统渲染就关闭了，此时系统滚动条没有了其他样式，因为el-scrollbar 为自定义滚动条样式，所以必须隐系统滚动条，所以此时系统滚动条的其他样式我们不必关心。



### Q:  vue-cli3.x 库构建es6 编译问题配置

此时默认已经创建了一个库模式的项目结构

A： 问题处理

`package.json`	

```json
"script": {
    "lib": "vue-cli-service build --target lib --name test --dest lib packages/index.js"
}

```

如上在`package.json` 文件中添加构建命令， `npm run lib` 即可构建出一个打包后的库

`vue.config.js`

```js
module.exports = {
  chainWebpack: config => {
    // 此处不可添加 babel 的额外配置，否侧会覆盖掉 babel.config.js 和 browserslist 文件配置对js转译的处理效果
  }  
}

```

