# 源码解读2

## 学习源码思路

整理源码学习的整体学习方式，梳理 `Vue` 实现的整理流程

通过 <a href="https://githab.com/vuejs/vue" target="_blank">github 仓库地址</a> 下载源码，以 `package.json` 为起始点逐步查找入口文件，

确定入口文件，执行了哪些主要方法，方法的执行顺序，方法执行处理了哪些内容。

​	以下思维导图中主要关注的 `Vue` 在 `web` 中 `SPA` 的实现方式，`ssr` 部分未做详细分解

```mermaid
graph LR
a[Vue 实例] --> b[initGlobalAPI]
a --> c1[Mixin]
c1 --> c1-1[initMixin]
c1-1 --> c1-1-1[initLifeCycle]
c1-1 --> c1-1-2[initEvents]
c1-1 --> c1-1-3[initRender]
c1-1 --> c1-1-4[callHook/beforeCreate]
c1-1 --> c1-1-5[initInjections]
c1-1 --> c1-1-6[initState]
c1-1 --> c1-1-7[initProvide]
c1-1 --> c1-1-8[callHook/created]
c1-1 --> c1-1-9[$mount]
c1 --> c1-2[stateMixin]
c1-2 --> c1-2-1[$data/$props/$set/$delete]
c1-2 --> c1-2-2[$watch]
c1 --> c1-3[eventsMixin]
c1-3 --> c1-3-1[$on/$once/$off/$emit]
c1 --> c1-4[lifecycleMixin]
c1-4 --> c1-4-1[_update/$forceUpdate/$destory]
c1 --> c1-5[renderMixin]
c1-5 --> c1-5-1[installRenderHelpers]
c1-5 --> c1-5-2[$nextTick]
a --> c[$isServer]
a --> d[$ssrContext]
a --> e[FunctionalRenderContext]

```



> 1. `inject` :  `resolve injections before data/props`  
>
>    `provide` :  `resolve provide after data/props` 
>
> 需要注意二者其执行顺序
>
> 2.  `eventsMixin`  中表明子组件中的事件是由自身来派发和监听的，最终是回调函数在父组件中定义





## 数据响应式

​	响应式是 `Vue `的特性之一，非侵入性的响应系统。`Vue` 实例的 data 属性接收一个对象，初始化时 `Vue` 会遍历此对象的所有属性，给每个属性添加 `getter/setter`，并在此时进行依赖收集




​	`Vue` 示例接收一个 `JavaScript` 对象

首先初始化` props / data `（`initProps` / `initData`）

`observe`  为 `data` 创建一个 `Observer` 实例

- `observe`  为 data 创建一个 `Observer` 实例

- `Obserser`  遍历对象属性，做相应的处理
  - 针对对象和数组分别处理

- `defineReactive` 给data 中的每个 key 添加数据劫持
  - `Dep` 依赖管理
  - 处理 `Dep` 和 `Wather` 之间的相互关系
  - 



