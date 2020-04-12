## react 源码

### 初探

react同样是用rollup进行打包的，但是跟vue有明显的差别，vue针对Vue这个function为一个核心进行构建更多的内容，而react不用，虽然也是有react一个核心库，但是他更多的是在react中创建了很多虚拟类，所有的实现都放到其他的扩展库中，所以常见的情况下，我们引用react，必须引用react-dom，因为在react库中并没有任何实现的内容，而react-dom中有render这个方法是react最核心的一个方法，贯穿了react的核心内容

### react库

react的核心库，内部有各种方法以及组件，hooks等内容，react内部只实现了针对各个组件或者各个方法的虚拟类，并没有实现，需要在react-dom的render方法中对对应的内容进行处理才能渲染出对应的页面

