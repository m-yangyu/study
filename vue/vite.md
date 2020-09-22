# vite

vite是跟随vue3.0一起出来的一个脚手架工具， 开发环境使用的是基于es6的模块依赖进行文件解析，生产环境使用rollup进行打包，抛弃webpack的构建方案

调试踩坑：

一定要用yarn， 如果用npm安装会导致部分包的路径存在问题，然后在启动项目的时候对应的server存在问题

## vite的执行路径

vite分为两个部分

1. client
2. server

在应用启动的时候会默认生成一个服务，监听对应当前项目的文件变化，然后通过socket的长链接将对应的修改的文件模块发送至client端进行新的模块加载

## client

在客户端， 会处理一共一下几种状态

1. vue-reload
2. vue-rerender
3. style-update
4. style-remove
5. js-update
6. custom
7. full-reload

### vue-reload

1. 文件监听
2. 文件修改缓存
3. 文件修改依赖管理
4. 返回给client端一个对应路径

获取server端返回的path路径，直接通过import动态加载对应模块，调用vue的reload方法直接重载当前的模块

## server

在server端， vite针对不同的文件在koa的中间件中进行构建，`wasm`, `json`, `jsx，tsx`,`vue`,`css`

### jsx,tsx

使用了esbuild来进行模块打包

### wasm, json

在当前文件的上下加上对应的import以及对应export直接导出当前的文件内容

### css

vue中使用css是存在两种模式

1. module
2. 直接加载的css

### vue

直接通过vue3的compiler编译vue文件，并使用esbuild打包对应js代码，生成的模块化内容，转向vue3的reload

## 与vue2.0使用webpack的区别

1. 使用webpakck的时候，在本地打包完成，然后实现对应模块的加载
2. vite的启动由于不需要打包更多的模块化内容，所以会更加的快速
3. 无需本地化打包，在直连当前的文件路径的时候，koa中间件已经打包了对应的文件，并输出到页面中
