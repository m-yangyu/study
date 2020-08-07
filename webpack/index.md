# webpack

默认行为是打包结果以CMD的模块加载方案执行

## runtime是什么

webpack打包完成之后，运行各模块的方法，默认会打包进entry文件中，可以使用`manifest插件`将`runtime`打出来，进行缓存

## runtime做了什么

1. 闭包存放对应的模块变量， 是一个数组
2. 提供了加载的方法，`__webpack_require__`
3. 实现按需加载的方法`webpackJsonpCallback`
