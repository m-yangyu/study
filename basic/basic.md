## javascript 基础内容

重新系统性的学习js基础内容

### 原始类型

null, undefined, string, symbol, number, boolean

js中的原始类型就只有这6个，在原始类型上面他是不存在任何方法的，因为在存储方式上他只是存下了对应类型的值，对不是一个对象，或者说一个地址
所以在原始类型上面是不会有任何方法存在，即undefined.toString()，是会报错的

![例子](../public/image/1.png)

但是有人会有疑问，这样子明明是可以的

``` javascript

    '2'.toString() // 2

```

这是因为在js中 '2' 已经被转换成Object类型，toString是在Object原型链上的方法并不是原始类型中的string类型，所以才能够使用toString

但是这个时候又有另一个问题，你说'2'是被转成了object，那么，为什么typeof确是显示string的呢

``` javascript

    typeof '2' // string

```

那是因为 '2' 转成成的object实际上是 String继承了Object而生成的对象，typeof 判断的实际上是一个表达式, typeof '2', 判断的是'2'运行之后的结果，即String类型的'2'运行的结果为原始类型的string，所以typeof这时候就判断出'2'为string类型

那么，好学的人又有疑问了，为什么会出现下面这种情况呢, 这说明null不是原始类型吗？

``` javascript

    typeof null // object

```

这就涉及到了typeof的创始问题了，在js创始初期，typeof null就被定义为object，那时候，js中的值是一个表示类型的标签和实际数值表示的
对象的类型标签是0，而null代表的是空指针大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"。[参考链接](https://2ality.com/2013/10/typeof-null.html)
