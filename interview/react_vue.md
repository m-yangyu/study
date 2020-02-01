1. react跟vue中为什么会需要写key

用于diff算法，在循环的相同dom中，如果存在key那么在进行vdom的对比的时候能够更快的分别当前是否发生变化，以及判断相同内容的vdom是否发生变化

2. React 中 setState 什么时候是同步的，什么时候是异步的？

- 正常情况下setState是异步
- setTimeout里面是同步的
- 当setState的参数是方法而不是对象的时候是同步的

3. React setState 笔试题，下面的代码输出什么？

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
