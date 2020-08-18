# webpack

webpack是处理js文件模块化的工具， 将大型的javascript应用，分割成多个小模块进行按需加载，并将文件解析进行优化压缩，减少文件体积

webpack4之后通过contenthash打包对应的文件，生成稳定不变的hash名，增加浏览器缓存的效率， webpack3的时候使用的chunkhash，如果vue文件内容的css改变则会导致js也跟着改变，缓存失效

默认行为是打包结果以CMD的模块加载方案执行

## runtime是什么

webpack打包完成之后，运行各模块的方法，默认会打包进entry文件中

可以使用`optimization`中的`runtimeChunk`打包出`runtime`文件，用于缓存

## runtime做了什么

1. 闭包存放对应的模块变量， 是一个数组
2. 提供了模块加载的方法，`__webpack_require__`
3. 实现按需加载的方法`requireEnsure`

### __webpack_require__

是webpack封装的require的方法， 内部设有文件引用缓存

如果文件已经被引用过， 那么就不会再次引用而是直接用的之前引用的`module缓存`

## code spliting && tree shaking

如果进行了代码分割， 那么被分割出来的代码会独立成一个模块， 然后模块获取的时候进行缓存

> qa： 同一个文件，被不同的地方引用不同的内容，分割出来的是一个模块还是多个模块？

同一个文件被多处引用， 只会打包出一个模块， 然后如果当前文件中的有模块没有被使用到， webpack默认会直接删除模块的引用（tree shaking）

并不会将当前js中的部分没有使用到的方法进行一个删除

### 按需加载

在我们项目中， 当项目越来越大的时候， 一次如果将文件全部加载，那会导致页面加载js，css时间过长，空白时间太长的情况

所以，webpack提供了一个按需加载的能力，`import()`，这个import跟es模块加载的import还是存在区别的， 在webpack中，会默认将当前的`import()`方法打包成一个新的模块， 然后创建`chunkId`，通过`__webpack_require__.e`即`requireEnsure`的方法进行动态的模块加载

直接调用`__webpack_require__`方法是获取已加载的模块方法， 而是用`requireEnsure`方法则是将js动态的引入进页面，通过`jsonp`的形式

## manifest

在webpack使用chunk生成各个模块的之后，调用`__webpack_require__`方法的时候，使用的参数是当前的chunkId，会通过当前的映射关系找到对应的模块id

而这么一大堆的集合就是manifest
   
## module cache