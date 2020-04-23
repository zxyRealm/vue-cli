## React 组件2



#### 表单组件的实现

```

```

#### 弹窗类组件实现

```

```

#### 树形组件实现

```

```

#### 常见组件优化技术

1. 定制组件的 `shouldComponentUpdate` 钩子

    可根据实际业务场景，进行项目的性能优化

2. `PureComponent`

    实现 了 `prop` 和`state` 值的浅比较, 并且 `PureComponent` 中的 `shouldComponentUpdate()` 会跳过所有子组件的 `prop` 更新。因此，注意确保其子组件也都是"纯"的组件。

3. `React.memo`

    高阶组件，仅适用于函数组件。可用作性能优化，通过传入第二个参数，可以自定义对比过程

    ```jsx
    import React form 'react'
    function DemoComponent (props) {
        return (
        /* props 渲染 */    
        	<div></div>
        )
    }
    
    function areEqual (prevProps, nextProps) {
        /* 比较 prevProps 与 nextProps 是否相同 */
        return prevProps == nextProps
    }
    
    export default React.memo(DemoComponent, areEqual)
    ```

    

