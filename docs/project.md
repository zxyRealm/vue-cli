## 前端工程化

前端工程生命周期

​	开发 -> 测试 -> 部署 -> 维护



工程生命周期中应用的系统化、严格约束、可量化方法都可称之为工程化。工程化程度越高，工程中因人的个体差异导致的缺陷就越少，项目质量就可得到更有有效的保障。

#### 模块化

##### `JS` 模块化

1. CommonJS

   `Node.js` 中模块化方案，基于 `Common JS` 实现

   - 每个文件一个模块，有自己作用域，不会污染全局变量；
   - `require`  同步加载依赖的其他模块，`module.exports` 导出需要暴露的接口；
   - 多次 `require` 同一模块只会第一次加载时运行
   - 各模块按引入顺序依次执行

2. `AMD`

   采用异步的方式加载模块，允许指定回调函数

   - 使用 `define` 定义模块，使用 `require` 加载模块；
   - 异步加载，可以并行请求加载模块；
   - 原生 `JS` 无法直接运行 `AMD` 规范模块代码，需引入第三方插件，如果 `requirejs`

3. CMD

   类似 `AMD` 规范

4. UMD

   兼容 `AMD` 和 `CommonJS` , 在 `Nodejs` 和 浏览器环境均可运行

5. ES6 Module

   `ES6` 标准层面实现的模块化，`ECMA` 提出的模块化标准

   使用 `import` 引入模块， `export` 导出模块；

   一个只读引用，只在真正调用的地方开始执行

   支持度暂不完善，需进行代码转换为以上某一种模块化规范

##### `CSS` 模块化

1. 预处理器

​	如 Less、Sass、Stylus等预处理器给 CSS 带来了编译能力，可使用变量、运算、函数等实现合并文件。

2. `OOCSS` && `SMACSS`

   `OOCSS` 和 `SMACSS` 是 `css` 相关的方法论。

   a.  `OOCSS` 即面向对象 `css`, 旨在编写高可复用，低耦合，高扩展的 `css` 代码;

​	分离结构和主题（Separate structure and skin）

​	分离容器和内容（Separate container and content）

​	b.   `AMCSS` 是可扩展性 `css`, 它的核心是结构化的 `css` 代码

​	`CSS` 分类： Base、Layout、Module、State、Theme

​	命名规则

​	最小化适配深度

3. `BEM`
4. `CSS in JS`
5. `CSS module`



#### 组件化

1. React、Vue、Angular

   `JSX` vs 模板 `DSL`

   `React` 使用 `JSX`, 灵活，作用域和 `JS` 一致。`Vue`、`Angular` 采用模板 `DSL`, 编程性受限，作用域和 `JS` 隔离，可静态分析、更好的代码检查、和性能优化。

2. `Web Component`

   `W3C` 组件化标准

   `Custom Element`：带有特定行为且用户自命名的 `HTML` 元素，扩展 `HTML` 语义

   `Shadow Dom`：对标签样式的 `Dom` 封装，可实现局部作用域。

   `HTML Template & Slots` ：可复用的 `HTML` 标签，提供了和自定义标签相结合的接口，提高组件的灵活性

#### 规范化

1. 代码规范

   `husky`   lint-staged

2. 文档规范

   `JSDoc`：根据 `.js` 文件中的注释，生成 `API` 文档

   `Docz`：基于 `MDX` 的高效、零配置的文档生成工具，目前只支持 `React`

   `StoryBook`：集组件开发、查看、测试的文档工具

   `react-styleguidist`：和 `StoryBook` 类似，生成 `React` 组件开发环境的文档服务，基于 `Webpack` 支持 `HRM`。

3. 流程规范

   `githab-flow`

   `git-flow`

   `gitlab-flow`



#### 自动化

1. 构建

2. 测试

3. CI/CD

   1. 看下图，理解 敏捷开发(Agile)、持续集成(CI)、持续交付/部署(CD)、开发运维一体化(DevOps)涵盖的生命周期范围。`CI/CD` 是 `DevOps` 的部分流程中的一种解决方法。

      ![img](E:/vue-project/vue-cli3.0/docs/images/ci-cd.jpeg)

   CI 中开发人员需要频繁地向主干提交代码，这些新提交的代码在最终合并到主干前，需要经过编译和自动化测试（通常是单元测试）进行验证。

   

   CD 指的是，频繁地将软件的新版本，交付给质量团队或者用户，以供评审。如果评审通过，代码就进入生产阶段。持续部署是持续交付的延伸，实现自动将应用发布到生产环境。

   ​	持续部署常用解决方案： 蓝盾 `DevOps` 平台、`orange-ci`、`QCI`