# 刷leetcode算法题

努力保证一天一题

## 整数反转

> 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

``` javascript
// 通过num求余数获得对应位上的数字
var reverse = function(x) {
    let num = '';
    const minusSymbol = x < 0;
    x = Math.abs(x);
    while(x != 0) {
        // 这种方式时间上最快
        num = x%10;
        x = Math.floor(x / 10);
        // 下面这种方式内存占用率比较低
        let ys = x%10;
        num += ys;
        x = Math.floor(x / 10);
    }
    const result = minusSymbol ? -num : +num;
    return (result > -(2 << 30) || result < (2 << 30)) ? 0 : result;
}

```

## 判断回文数

> 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

``` javascript

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) {
        return false;
    }
    let str = x + '';

    for (let i = 0, j = str.length - 1; i < j; i++, j--) {
        if (str[i] !== str[j]) {
            return false
        }
    }
    return true
};

```

## 外观数列

> 是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。前五项如下：

``` javascript

1.     1
2.     11
3.     21
4.     1211
5.     111221

```

``` javascript

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let prev = '1'
    for (let i = 1; i < n; i++) {
        prev = prev.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
    }
    return prev
};

```