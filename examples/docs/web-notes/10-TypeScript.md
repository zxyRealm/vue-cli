# TypeScript

​	TypeScript 是 JavaScript 的超集，可编译成普通的 JavaScript 代码，并且具有类型系统，下文中将 `TypeScript`  简称为  `TS` ,  `JavaScript`  简称为  `JS` 。



### 基本类型

​	`TS` 支持 `JS` 包含的所有数据类型，同时还提供了枚举类型方便使用。

​       其中基本类型包含： `boolean`  、 `number` 、 `string` 、`[]/Array`、 `enum`  、`any`、 `viod` 、 `null/undefined`、`never`、`<>/as`

#### 布尔值

```typescript
// 简单的 ture/false 值
let reading: boolean = false
```

#### 数值

```typescript
// 在 typescript 中，所有数值都是浮点型，支持二进制、八进制、十进制、十六进制
let age: number = 18
let hex: number = 0xf00
let binary: number = 0b100
let octonary: number = 0o700
```

#### 字符串

```typescript
// 使用方式和 js 相同
let name: string = 'Tom'
let sex: string = 'boy'
let sentence: string = `${ name } is a ${ sex }.`
```

#### 数组

```typescript
// 数据类型后加[]
let list: number[] = [1,2,3]
// 数组泛型 Array<数据类型>
let list2: Array<number> = [1,2,3]
```

#### 元组

​	允许表示一个已知数量和数据类型的数组，各类型不必相同

```typescript
// 访问已知索引元素会得到正确的类型，访问越界元素会得到联合类型
let list: [number, string]
list = [18, 'Tom'] // OK
list = ['Tom', 18] // Error

console.log(list[1].substr(0)) // Error 数组无substr方法
list[3] = false // Error 布尔值不是（number || string）类型
```

#### 枚举

```typescript
// 元素默认编号0开始，也可手动设置成员编号，如：以下即以1开始
enum Color {Red = 1,Green,Blue}
let c: Color = Color.Red
// 可根据枚举值获取值
let colorName = Color[3] 
console.log(colorName) // Blue
```

#### 任意值

```typescript
// 编译阶段无法确定数据类型的变量指定类型，如：应用第三方库或插件
let data: any = 'hello world'
data.substr(0, 2) // he

// Object 类型允许任意赋值，但不能调用其任意方法
let data2: Object = 4

data2.toFixed() // Error Property 'substr' does not exist on type 'Object'.
```

#### 空值

​	`void` 表示没有任何类型，它只能被赋予 `undefined` 和 `null` ， 单独声明 `void` 类型变量时没有实际意义。

```typescript
// 函数没有返回值是比较常用
function foo ():void {
    alert('this is a test')
}
```



#### Null 和 Undefined 

​	默认情况下 `null` 和 `undefined` 是所有类型的子类型，本身类型用处不大。

#### Never

​	`never` 表示永远不存在的值的类型，它是任意类型的子类型，它本身没有子类型

```typescript
// 返回 never 的函数必须存在一个无法到达的终点
function checkState():never {
    throw New Error('this is a error')
}
```

#### 类型断言

​	告知编辑器，此数据类型已经过校验不必检验。

<> 语法

```typescript
// <> 语法
let str = 'this a message'
let len = (str<string>).length
```

as 语法

```typescript
// as 语法
let str2 = 'this a message'
let len2 = (str2 as string).length
```



> 注意**：使用类型断言后，原数据不是指定的数据类型，编辑器也不会报错，因为此时编辑器已经认为数据就是断言指定的数据类型。

```typescript
// 此时编辑器不会报错，但是代码运行时会异常
let str3 = 4
let len3 = (str3 as string).length
```

### 变量声明

#### 解构

```typescript
// 解构数组或者对象时，如果需要指定类型，需要在后面添加完整模式
let [a, b]:[number,string] = [1, '2']
let {k: name, f: age}:{k: string, f: number} = {}
```

### Interface

​	`TS` 核心之一是对值的结构进行类型检查，有时称之为“鸭式变型法” 或 “结构性子类型化”。