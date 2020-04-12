## react 概念解析

### 状态提升

react中的状态提升指的是当前兄弟组件中公用的数据提取到父组件里面，包含redux

### react获取数据方式

使用 `componentDidMount` 生命周期来请求接口获取数据

#### 为什么使用componentDieMount来获取

1. 在react初次渲染的过程中，其他生命周期中调用接口获取数据无法保证渲染，因为请求是异步的
2. `componentDidMount` 生命周期中，界面上已经渲染完毕，请求只会进行重新渲染
3. `componentWillMount` 生命周期中setState不会更新数据

### 什么是redux

redux是react的状态管理库

#### 如何使用redux

redux单向数据流，通过action->reducer->store->ReactComponent的流程将数据写入store并更新视图

其中

action是拥有type以及otherData属性的，他表示一个修改的内容，将action传入dispatch，redux会默认将我们action中对应的type所对应的reducer的内容进行相关联

reducer是一个纯函数，输入为action的type以及otherData数据，并返回新的state数据

修改完成之后会自动反馈到视图上，并更新数据数据

### 错误边界

`getDerivedStateFromError` 或 `componentDidCatch` 实现其中任意一个方法，那么这个组件就会成为错误边界组件，当将其他组件放在他的子组件里面的时候，一旦其他组件发生错误，则会回退UI

### Portals

`Portals` 是一个能够直接将子组件构建在父组件之外的方法

`React.creaetePortals`