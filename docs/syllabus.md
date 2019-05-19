
* 新版本特性  
* 开发常用配置项
* 



#### 新版版特性

1.交互式的项目脚手架  
2.@vue/cli + @vue/cli-service-global 快速原型开发  
3.丰富的官方插件集合  
4.完全图形化管理界面  
5.精简开发配置方式

#### 开发常用配置项

1.浏览器兼容性

  browserslist、polyfill 
  
2.HTML和静态资源

 index文件可支持lodash template 语法进行插值  
 
 Prefetch 是一种resource hint(资源提示)，Vue CLI 
 应用会为所有作为 async chunk 生成的
 JavaScript 文件 (通过动态 import() 按需 
 code splitting 的产物) 自动生成 prefetch 提示
 
 3.css 预处理器
 
  配置使变量、混合可全局使用
   自动化导入  
   预处理器loader 传递选项
   
 4.环境变量和模式
 
    默认模式 development、production、test 
    
    注意模式不同于 NODE_ENV  
    