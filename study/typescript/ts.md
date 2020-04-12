## typescript

typescript 是 JavaScript 的超集，能够让弱类型语言的js支持强类型语言的类型监控，能避免很多不必要的bug让开发过程更加的精细化

### 为什么要使用ts

以我浅显的理解来看，弱类型语言跟强类型有天然的差别，在弱类型里面能够让代码写的更加简单，让初学者能够更加快速的融入到这门语言里面，但是
这个也带来了一些不必要的麻烦，开发者不再关注变量的类型，然后在使用过程中也不会去限定变量的类型，这样容易导致出因为类型不对而产生的bug，
并且这些bug一但产生还极难定位，所以ts在这个时候站了出来，在编译阶段就完成了代码的监控

### 配置ts

下载ts，可以在项目本地安装ts，也可以将ts安装到全局

``` javascript

mkdir ts-demo && npm init -y
npm i ypescript

```

在package.json中写上script内容

``` javascript

{
    "script": {
        "tsc" : "tsc"
    }
}

```

执行 npm run tsc就能对ts进行编译了（浏览器是不支持ts语言的，所以需要通过ts编译成js才能在浏览器里面使用）
