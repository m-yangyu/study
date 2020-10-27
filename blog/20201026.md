vite是尤大大在vue3发布的时候，使用的一个构建工具

相信大家对vite的产生过程是相当的清楚了，现在就来深度的剖析下这个vite他究竟好在哪里，让尤大大这么用心的推广他

## vite是做什么的

首先我们知道，`vite`主要还是用来在开发跟发布过程中的一个替代`webpack`的解决方案

虽然生产环境依然还是通过`rollup`打包的，但是在开发环境中，是使用的vite自身的模式，来改正了`webpack`在打包依赖的过程中时间太长的问题

从这里可以看出

1. vite是一个基于开发环境下的构建工具
2. vite其实并不能完全替代webpack，更偏向于优化版的webpack-dev-server

## 为什么说无法替代webpack

至少在目前来说，vite还完全没有能够替换webpack的能力，不管是从社区还是从能力来讲，vite他本身还是太过脆弱，他的产生跟火热完全依赖于vue本身的热度

试想一下，如果要从webpack转向vite需要解决什么问题？

### 插件的问题

对于vite来说是插件，但是对于webpack来讲他就是loader

先来看看vite他是如果处理他的插件的

```javascript
// 简略几个插件
const resolvedPlugins = [
   ...(Array.isArray(configureServer) ? configureServer : [configureServer]),
   ...(transforms.length || Object.keys(vueCustomBlockTransforms).length
      ? [
          createServerTransformPlugin(
            transforms,
            vueCustomBlockTransforms,
            resolver
          )
        ]
      : []),
    assetPathPlugin,
    webWorkerPlugin,
    wasmPlugin,
    serveStaticPlugin
  ]
  resolvedPlugins.forEach((m) => m && m(context))
```

看着这段代码，不难发现几个问题

1. vite在服务端的代码是基于koa的，他的所有插件都是在这个基础，然而我们知道，koa的插件会被next分为两个阶段来执行代码，这就导致了你在编写一个新的插件的时候必定要思考你的插件的前后影响，而webpack是链式，每个loader执行完成之后将当前的source往后传递
2. 熟悉webpack的人都知道，每一个loader就是一个功能，也就是说解析一个文件，但是如果按照vite现在的插件模式的话，我们每一个插件可能会处理多个功能，打个比方，如果需要实现类似webpack解析scss文件的能力，那么就要在一个plugin里面执行了sass-loader，css-loader，style-loader的能力，然后将文件解析完成返回出来，这对于插件的复用性是比较差的
3. 无用插件依旧会经过执行，按照这种方式，即使只有一个插件解析一个文件，那么其他的插件依旧能被预加载进来

### webpack插件

webpack使用了这么多年，他的社区已经足够完善，并且在大部分公司都会有基于webpack开发自定义的一些插件，如果从头转向vite，那么就代表着要对自己之前写的插件要重新在整理一趟，并且可能完全无法复用，这就导致了额外的开发成本或者说修改了整个我们的构建流程，这样的升级是得不偿失的

更何况在webpack的社区中，已经有这么多人提供了如此多的plugin和loader，我并不觉得现今就直接使用vite替代webpack会是一个好的方案，但是vite可能会是未来的发展方向

## vite的优势

前面讲了这么多vite无法替代webpack的内容，但是vite肯定不是像这样说的如此不堪，不受重用

首先，基于开发环境的考验，我们知道webpack在文件越来越多的情况，依赖层次越来越深，每次打包都会加长时间，这就很影响我们在开发时候的效率，有时候就只修改了一个文案，但是打包却要打至少好几分钟，这是不可忍受的

### vite优化了什么

vite就是基于此进行了优化, 在启动开发环境的时候不会打包，而是借用了浏览器的es import

先看下import在浏览器里面的展现形式是如何的？

```javascript
<script type="module">
  import test from './test.js';
</script>
```

当我们在浏览器中使用type为module的script标签时，里面的import会被转换为浏览器请求

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33ff54fb199e477d988d469e6d0dc1f0~tplv-k3u1fbpfcp-watermark.image)

vite就是基于此做了一系列内容，简单讲述下流程

1. 使用浏览器的es import的能力，拦截当前请求
2. 获取到当前文件
3. 根据不同的文件类型，解析对应的文件

这是vite在文件被访问的时候发生的几件事情，通过koa的中间件，解析了不同类型的文件，并生成源码返回给浏览器进行展示，一般就解析一个文件而言，这个速度是非常快的，所以vite在使用的时候会很难感觉到他在解析等待的过程，是一个在毫秒级别的热刷新服务

### vite热更新

前面讲过了vite在更新过程中是只解析当前更改过的文件，那他是如何做到修改文件并改变页面上的变化

首先，vite在应用启动的时候，会在本地启动两个服务，一个是前端的路径服务，另一个是文件解析的后端服务，两个服务之间使用websocket进行连接

每当页面内容被修改之后，会触发后端服务的文件监听，这里监听使用的是`chokidar`库（有兴趣可以去看下）

具体内容都是在hmr这个插件中，内部使用watch监听文件，除去vue跟css以外的其他文件类型热更新监听都是在`serverPluginHmr.ts`下

```javascript
watcher.on('change', (file) => {
  if (!(file.endsWith('.vue') || isCSSRequest(file))) {
    // everything except plain .css are considered HMR dependencies.
    // plain css has its own HMR logic in ./serverPluginCss.ts.
    handleJSReload(file)
  }
})
```

vue跟css是单独写在了对应的插件中，独立做热更新处理

在server端获取到文件更新之后会推送到client端，然后根据不同的type进行处理

1. vue-reload
2. vue-rerender
3. style-update
4. style-remove
5. js-update
6. custom
7. full-reload

针对于vue的处理是直接使用vue3.0中的更新方法进行组件更新

## 如何扩展vite

经过上面的陈述，我们知道，vite的热更新是依赖于几个方面

1. websocket的长连接
2. koa中间件编译

知道这两个处理方式，我们就能够去对vite进行一层扩展，只需要做好几件事情

第一步就是基于koa的中间件进行对应文件类型的编译（写完后可以使用`configureServer`添加插件），先看下类似的插件是怎么写的

```javascript
import { ServerPlugin } from '.'
import { isImportRequest } from '../utils'

export const wasmPlugin: ServerPlugin = ({ app }) => {
  app.use((ctx, next) => {
    if (ctx.path.endsWith('.wasm') && isImportRequest(ctx)) {
      ctx.type = 'js'
      ctx.body = `export default (opts = {}) => {
        return WebAssembly.instantiateStreaming(fetch(${JSON.stringify(
          ctx.path
        )}), opts)
          .then(obj => obj.instance.exports)
      }`
      return
    }
    return next()
  })
}
```
这个是处理wasm文件的插件，主要还是根据文件类型然后改变返回值内容，在中间的过程就是我们编译的过程

当我们插件写好之后，接下来就是如果在client端监听到这个文件变化然后修改文件内容

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97afcca7c546409dbc4b24f563f07baa~tplv-k3u1fbpfcp-watermark.image)

这个是vite启动之后，他的main.js加载了一段文件内容，也就是说依据`createHotContext`方法接受了websocket返回回来的信息，并修改了当前组件

按照这个逻辑，我们就可以添加一个js文件，内部使用socket跟server端链接，监听我们需要的文件返回，并做相应的操作

这样就可以完成一个自定义的，不仅仅是基于vue的vite

## 结尾

vite是一个新出来的技术，他的社区繁荣以及各种类型的插件都还没有开展起来，现在就直接将webpack替换我认为是不可能的，毕竟webpack都已经使用了这么长时间了，基本的内容以及使用的习惯都在了，但是vite确实很强，提升了很强的开发效率，可以考虑将vite跟webpack结合使用，或者如果将vite的思想带到webpack，这个可能会是一个很长的摸索过程