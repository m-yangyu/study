### react跟vue中为什么会需要写key

用于diff算法，在循环的相同dom中，如果存在key那么在进行vdom的对比的时候能够更快的分别当前是否发生变化，以及判断相同内容的vdom是否发生变化

### React 中 setState 什么时候是同步的，什么时候是异步的？

- 正常情况下setState是异步
- setTimeout里面是同步的
- 当setState的参数是方法而不是对象的时候是同步的

### React setState 笔试题，下面的代码输出什么？

``` javascript

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};

0 0 2 3

```

### 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

`v-model` 是一个语法糖，他的内部实现实际上也只是一个监听和回调，当 view 上数据修改的时候，会触发 change 事件，直接将写入的数据跟 vue 中存储的数据进行修正，而直接修改 vue 中的数据的时候，会触发 vue 的更新策略（diff算法），然后去更新新的dom内容

### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

virtual DOM 并不会比 原生DOM 快，因为虚拟dom最后也是通过原生dom去操作页面上的内容，并且内部增加了diff算法来耗时，所以单纯从时间角度来讲，肯定是操作原生dom来的快，但是虚拟dom能够通过diff判断出操作的区域，减少原生dom的操作，所以会显得比较快

### 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

因为这个是一个纯函数，他的返回值是要修改对应的属性，如果是异步操作会导致没有返回值会出现问题

### 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

Vue 遵循单向数据流的概念，数据只能从上到下，而不能从下到上的修改，在初始化init的时候就会在get里面添加判断是否更新，更新的话就报错

### 双向绑定和 vuex 是否冲突

可能从一些方面来讲，有些东西是有冲突的，在严格模式下，v-model是不能直接将vuex的数据直接拿来使用，这一方面上来讲确实存在冲突，但是，从别的地方去思考一下这个问题，v-model本身是绑定当前组件内的状态，而vuex确实全局的状态管理，所以vuex从本质上来讲还并不是当前的组件的状态，首先要转换成当前组件的状态也就是，computed，通过设置computed的get和set方法来将数据挂载在当前组件上

### Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

监听属性只能监听到其中一个属性，监听数组存在性能问题，所以vue是重写了数组的方法

[解析文章](https://segmentfault.com/a/1190000015783546)

### vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

不需要，默认vue中的所有事件已经是代理的了，react相同

### 为什么选择vue或者react

选vue：

1. vue比react更加轻量级
2. vue的模板语言更加偏向正常的html开发
3. vue用法上更加简单

选react：

1. react在构建大型项目的时候，写法上，以及架构上更不容易出现问题（vue模板容易出现不容易发现的问题，毕竟react全部都是js）
2. 如果需要同时构建app，web，小程序等等，使用react他的生态更好一些
3. react的生态更加繁华

### 为什么react需要hooks

### 什么是react的fibler，有什么优缺点

### react中的setState是如果进行更新的

### 什么是virtual Dom

### 聊聊redux与vuex的设计思想

redux与vuex的核心思想其实是比较类似的，都是全局状态管理，设置全局的state，来保证组件间的通信，不同的地方在于

redux需要通过action进行更新，直接修改state的值是不会触发修改，这个符合react的设计思想，并且在redux中最重要的概念就是middleWare，因为有了中间件所以能够对数据更新以及数据收集有更好的处理与收集

vuex是可以直接修改对应的state的内容，但是更推荐使用action进行更新，可以进行状态修改跟踪

### 从数据驱动去理解redux

### redux的中间件具体做了什么

### vue跟react的diff算法上有什么差异
