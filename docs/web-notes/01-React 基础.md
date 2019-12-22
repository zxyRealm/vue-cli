## React 基础



#### 1. 生命周期

```jsx
class Clock extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    // 在后代组件抛出错误是调用，不允许执行副作用
    static getDerivedStateFromProps (error) {
        
    }
    // 在后代组件抛出错误后被调用，允许执行副作用，可用于错误日志记录
    componentDidCatch (error, info) {
        
    }
    // 会在初始挂载或者后续更新中调用
    static getDerivedStateFromProps (props, state) {
        // 返回一个对象来更新 state, 如果返回 null 则不更新
        return state || null
    }
   // 挂载, 仅执行一次 
    componentDidMount ()  {
        
    }
    // 首次渲染或 foreUpdate () 时不会调用
    // 当props 或 state 变化时，会在渲染前调用
    shouldComponentUpdate () {
       // 返回 Boolean 
       return true 
    }
    // 初始化、更新
    render () {
        return (
        	<div>
            </div>
        )
    }
    // 在最近一次渲染输出前调用，可在变更前从DOM中获取一些信息。
    // 此生命周期的任何返回值都将作为参数传给 componentDidUpdate()
    getSnapshotBeforeUpdate () {
        
    }
    // 更新后立即调用，首次渲染不执行
    // 组件更新后，可操作 DOM
    componentDidUpdate () {
        
    }
    
    // 卸载，仅执行一次
    componentWillUnmount () {
        
    }   
}
```



## 2. `JSX ` 中的 this

1. `constructor` 中 bind(this)

```jsx
class Example extends React.Component {
    constructor (props) {
        this.myClickEvent = this.myClickEvent.bind(this)
    }

    myClickEvent () {
        console.log('click mine')
    }

    render () {
        return (
            <div>
                <button onClick={this.myClickEvent}>Click me</button>
            </div>
        )
    }
}

```



2.  使用 class fields 语法

```jsx
myClickEvent = () => {
    console.log('click mine')
}
```



3. 在回调中使用箭头函数

```jsx
myClickEvent () {
    console.log('click mine')
}

render () {
    return (
        <div>
            <button onClick={() => this.myClickEvent()}>Click me</button>
        </div>
    )
}
```

