# vite

vite是跟随vue3.0一起出来的一个脚手架工具， 开发环境使用的是基于es6的模块依赖进行文件解析，生产环境使用rollup进行打包，抛弃webpack的构建方案

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



## server