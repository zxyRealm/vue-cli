##  								`Vue` 组件化实战

## 组件化

提高开发效率，可复用，提升项目的可维护性，便于多人协同开发

### 组件通讯

#### 父组件传子组件

- 属性 `props`  

```js
// child
props: { content: String }
// parent
<demo content="hello world"/>
```

- 特性 `$attrs`

```js
// child
this.$attr.content = ''
// parent
<demo content="hello world"/>
```

- 引用 `$refs`

```js
// parent
<demo ref="comp"/>
mounted () {
   this.$refs.comp.aa = ''
}
```

- 子元素 `$children`

```
// parent
this.$children[0].aa = ''
```

> $children 获取子元素是无序的



#### 子组件传父组件

自定义事件：` $emit("eventName", data)`



#### 兄弟组件间传值

使用共同祖辈组件搭桥，`$parent` 或 `$root`

```js
// b1 监听接收
this.$parent.$on('eventName', (data)=> {})
// b2 抛出事件传值
this.$parent.$emit('eventName', data)
```



#### 祖先组件于后代组件间传值

​	当组件层级嵌套较深时，使用 `props` 逐层传递过于繁琐且不实用，此时可使用  `provide/inject` `API` 实现数据传递

```js
// ancestor 祖先传值
privode () {
    return {
        foo: 'foo !'
    }
}
// descendtant 需要接收值的后代设置
inject: ["foo"]
```



#### 任意组件间传值

- 事件总线：创建一个事件派发、监听和回调管理的类或方法，如：`new Vue()`
- `vuex` :  创建全局唯一的数据管理者 `store` , 通过它管理数据并通知组件状态更新



### 插槽

​	实现内容分发，用于开发复合组件

- 默认插槽(后备内容/匿名插槽)

  单个组件内只能存在一个，未指定名称的内容均视为默认插槽的内容

- 具名插槽

  将内容分发到子组件指定位置

- 作用域插槽

  可使插槽内容能访问子组件中才有的数据

- 动态插槽名(2.6.0 新增)

  ```vue
  <template v-slot:[dynamicSlotName]></template>
  ```

  

## 组件化实战

### 组件开发过程

1. 需求分析
   - 梳理并罗列组件功能点
2. 实现
   - 分步实现各个功能点



### 全局控件开发 

1. 一个可在全局任意地方创建的实例的方法

   创建实例

   - `new Vue()`

     ```js
     const vm = new Vue({
         render(){}
     })
     // 获取组件实例
     const comp = vm.$el
     ```

   - `Vue.extend()`

     ```js
     const Ctor = Vue.extend(Component)
     // 获取组件实例
     const comp = new Ctor({...})
     ```



### 递归组件

#### Tree 组件开发分析

树形数据即一个数组结构的深层嵌套

```vue
<template>
	<!-- 引用 --> 
	<Tree :data="data"></Tree>
</template>

<script>
    let data = [
        {
            ...
            name: 'Node-1',
            children: [
                {
                    ...
                    name: "Node-1-1",
                    children: []
                }
            ]
        }
    ]
</script>
```

**需求拆分**

1. 展示树形数据最外层结构

   - 子组件可循环引用

     ```vue
     <!-- Tree.vue -->
     <ul>
     	<TreeItem v-for"item in data" :data="item" :key="item.id"></TreeItem>
     </ul>
     ```

   - 先展示出基本的外层结构

     ```vue
     <!-- TreeItem.vue -->
     <li>
         <span>{{data.name}}</span>
         <!-- children 内容展示 -->
     </li>
     ```

2. 展示树形数据子集结构

   - 循环子集数据并展示
   - 完成最基本的数据结构的展示，不带任何其他功能

   ```vue
   <!-- TreeItem.vue -->
   <li>
       ...
   	<!-- children 内容展示 -->
       <ul>
       	<TreeItem v-for="sub in item.children" :key="item.id" :data="sub" />
       </ul>
   </li>
   ```

   

3. 逐步添加属性、事件

   - 点击展开折叠方法
   - 节点点击回调
   - `name`  、`children`  配置方式

   ... 等等



