# webpack装逼指南

## 基本配置

## tapable

## plugin与loader

## demo实现方案

## plugin生命周期

## 按需加载

## code-spliting

## tree-shaking

### webpack生成3种模式的区别

### webpack如何生成这3种模块化方案的

### webpack的基础内容有什么

entry: 入口，可以添加入口文件信息，单页或者多页，就是配置不同的入口文件
output: 出口文件，根据入口生成不同的出口内容，以及输出方式，amd，cmd等等，chunkname也是在这边进行配置，使用contenthash能够有效的对文件的缓存进行控制
module: 针对文件的解析方式，比如将vue文件解析成不同内容的文件，loader的所在
plugin: 使用插件的地方
optimization: webpack4新增的一个属性，内置的优化外放

### 如果做到加载文件只引入当前文件的局部内容（tree shaking）

### webpack如何做到代码分割

### webpack3与webpack4的区别是什么

### webpack5新出的内容有什么更新

### plugin与loader的区别是什么

> loader

loader是提供文件解析的插件，能够针对文件进行编译，例如将ts文件编译成js文件

> plugin

plugin是在loader进行解析的各个关键步骤中添加一些额外的内容

### plugin的生命周期是什么

1. environment
2. afterEnvironment
3. initialize
4. beforeRun
5. run
6. beforeCompiler
7. compile
8. thisCompilation
9. compilatiion
10. make
11. afterCompiler
12. emit
13. afterEmit
14. done
15. afterDone

### 如何编写一个webpack plugin

1. 使用class返回一个apply的内部方法
2. 使用function，this上挂载一个apply方法

根据不同的生命周期，使用tapable提供的钩子函数，添加对应的钩子方法

compiler的生命周期中，会将当前编译的对象compiltion返回给钩子函数，在钩子内部添加对应的模块内容，实现plugin的扩展

### webpack的核心内容是啥？tapable是什么？有什么作用

遵循流程化的构建，将编译过程分解成不同的任务级别，然后生成对应的生命周期，提供在不同阶段生命周期的调用

tapable是提供生命周期你钩子以及钩子管理的工具

### webpack跟babel的关系是什么

webpack是文件统一编译的工具，babel是将js进行降级或者说将新版本的js转换为低版本浏览器可运行的代码

webpack提供一个入口，给babel去解析各种文件内容

### webpack跟rollup的区别在哪里

### 为什么要使用webpack

### 一个简易的webpack他需要实现什么内容