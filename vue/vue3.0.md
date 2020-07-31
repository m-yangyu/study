# Vue3.0

## 构建工具

vite-app

npm init vite-app { projectName }

## 社区依赖

暂时只有bate版本的库，vue-router， vuex

安装完vue3之后需要同步自己手动安装一下vue-router, vuex

## vue-router使用

createRouter, 创建一个router应用， 写法上来讲跟老的vue-router没有什么差别， 只是增加了获取路由的方法，可以直接通过useRouter获取到当前的路由信息

currentRouter是一个vue中的ref，就是一个简单的变量进行维护， 从value中取值

## vuex使用

从根本意义上来讲， 感觉没有vuex存在的必要性了， 因为vuex比较简单， 只提供了一个状态绑定跟修改的功能，没有时间回溯，没有任何的其余操作

由于vue3提供了可以共用状态的能力， 那么就可以直接申请一个全局状态的状态树出来， 而不需要去使用vuex

跟react跟redux的关系上有一定的差距， redux还有着时间回溯的能力，但是针对于vuex，从根本意义上来讲的话， 跟全局状态是没有差别的， 所以可以考虑从vue3中移除vuex的使用

## vue3的使用

### reactive

### ref

### readonly

### 