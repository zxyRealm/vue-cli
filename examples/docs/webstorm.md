# 	     vue项目中webstorm常用配置

### 1.  识别webpack 中@等别名符

在 Settings -> languages&frameworks -> JavaScript-> Webpack  里选择配置文件路劲即可

vue-cli2.0:    build/webpack.base.conf.js

vue-cli3.0： node_modules/@vue/cli-service/webpack.config.js 

需要注意的是如果在scss中使用@别名则需要加~号。比如在src目录下有一个var.scss文件，其他文件引用时则需写成：

```scss
@import "~@/var.scss";
```

### 2.  重新设置项目资源根目录

在 Setttins -> Directories 中选取要作为根目录的文件夹后，点击 Resource Root，之后Apply 即可

