## React redux



### `PureComponent` 和 `Component` 

`PureComponent` 为纯组件，会对组件 `prop` 和 `state` 状态值进行浅比较，`prop`  和  `state` 无变化时组件就不会更新, 合理使用可用于性能优化。

​	注意点：

​	1. 使用时请确保组件及其子组件均为纯组件

