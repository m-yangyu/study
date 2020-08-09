# webpack

默认行为是打包结果以CMD的模块加载方案执行

## runtime是什么

webpack打包完成之后，运行各模块的方法，默认会打包进entry文件中，可以使用`manifest插件`将`runtime`打出来，进行缓存

## runtime做了什么

1. 闭包存放对应的模块变量， 是一个数组
2. 提供了加载的方法，`__webpack_require__`
3. 实现按需加载的方法`webpackJsonpCallback`

### __webpack_require__

是webpack封装的require的方法， 内部设有文件引用缓存

如果文件已经被引用过， 那么就不会再次引用而是直接用的之前引用的`module缓存`

## code spliting && tree shaking

如果进行了代码分割， 那么被分割出来的代码会独立成一个模块， 然后模块获取的时候进行缓存

> qa： 同一个文件，被不同的地方引用不同的内容，分割出来的是一个模块还是多个模块？

同一个文件被多处引用， 只会打包出一个模块， 然后如果当前文件中的有模块没有被使用到， webpack默认会直接删除模块的引用（tree shaking）

并不会将当前js中的部分没有使用到的方法进行一个删除

## manifest

## module cache