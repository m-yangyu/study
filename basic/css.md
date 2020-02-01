## CSS

### BFC

BFC是css中的一个格式化上下文的方法，简单的来说就是让一个元素拥有自己的独立上下文，但是却不影响周边其他元素

常用于解决几个问题

1. float浮动带来的高度塌陷
2. margin的层叠

如何触发：

1. html根元素
2. float不为none
3. position不为relative或static
4. overflow为aoto，scroll或hidden
5. display为table-cell，table-caption或inline-block

### 移动端1px的问题

