## VUE学习笔记

> vue2.0的源码阅读

[vue的源码阅读思维导图](https://www.processon.com/view/link/5e0dc665e4b0f8e58dc860bd)

![vue思维导图](../public/image/8.png)

### 为什么用proxy代替definePrototype

1. definePrototype 不能够监听数组的方法，vue里面是重写了数组方法
2. definePrototype 只能监听一个对象上的一个属性，监听一个对象需要循环遍历，proxy不用

### vue执行更新的步骤是什么

1. 通过Dep类进行依赖搜集
2. 通过Watcher类进行监听属性变化
3. 通过Scheduler进行使用调度
    - 收集变化的属性（queue）
    - 使用nextTick进行更新（调用Watcher的run）

### nextTick做了什么

判断使用什么样的方法进行异步调用

1. promise
2. MutationObserver
3. setImmediate
4. setTimeout

按照上面的顺序依次判断，存在即使用

### slot的scope是怎么实现的

vue内部在进行parse的时候会将带有scope的slot封装成一个function， 而function的参数就是传入的scope的值

### computed怎么实现的

实际上是一个Watcher对象，Watcher里面有一个dirty的参数来控制是否更新，在update的时候会将dirty设置为true

### 为什么能在this上访问到data的属性

vue将数据放在this._data上面，并在this上面设置了监听，返回值是从this._data上返回的

### forceUpdate干了什么

将所有的watcher重新进行运算

### vue的$on,$emit等event是怎么实现的

Vue的prototype上添加了一个events，`$on` 将方法添加到events中，`$off` 删除

### Vue.use 做了什么

`Vue.use` 的参数为一个function或者Object，如果传入Object，则需要写上 `install` 方法，内部判断存在 `install` 则运行，不存在则直接运行当前方法，调用的参数传入为use方法的后续参数，以及添加第一个参数`this`, 最后将整个方法存入 `this._installedPlugins` 中

### vue的ast树怎么转换成VNode

vue内容通过方法将ast书转为可执行的code，最后用 `new Function` 执行

### vue不能通过$set修改this上的数据吗

可以修改， `this.$set(this._data, key, value)`

### vue中的sync指令符

可以使用sync来实现类似v-model的效果，可用于props传入并支持props的被修改，sync指令符会默认添加一个update的更新命令，从而实现子组件更新父组件的内容

``` javascript

<my-component
    :name.sync="a"
>
</my-component>

export default {
    props: {
        name: {
            type: String
        }
    },
    computed: {
        syncedName: {
            get() {
                return this.name
            },
            set(value) {
                this.$emit('update:name', value)
            }
        }
    }
}

```

在ts中的写法

``` javascript
import { Component, Vue, PropSync} from 'vue-property-decorator';
@Component()
class MyComponent extends Vue {
    @PropSync('name', { type: String }) yourComputedName!: string
}

```
