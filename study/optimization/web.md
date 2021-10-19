# web性能优化

web性能谷歌提供了相应的指标，来表示用户的体验情况以及整站的运行流程

## LCP

最大元素渲染时间

在web中，一个页面渲染的时候， 首屏上最大元素是渲染占时最长的时间，也就是用户看到整个页面所用的大体上最后的时间

浏览器提供， PerformanceObserver来监控用户体验上的时间标准

```js
const ob = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log('LCP candidate:', entry.startTime, entry);
    }
});
ob.observe({ type: 'largest-contentful-panit', buffered: true })
```

### 影响LCP的情况

- 缓慢的网络请求
- javascript跟css的阻塞
- 客户端渲染
- 静态资源加载

### 解决方案

#### 网络请求缓慢

1. 服务器扩容，服务端处理
2. dns 预请求， <link rel="dns-prefetch">
3. tcp 预链接， <link rel="preconnect">
4. 减少首屏网络请求（或者合并网络请求）
5. 使用http2.0代替http1.x
6. html页面cdn
7. html缓存

#### js跟css阻塞

1. 减少非必要的css加载
    - css压缩
    - css注释删除
    - webpack: optimize-css-assets-webpack-plugin
    - gulp: gulp-clean-css
    - rollup: rollup-plugin-css-porter
2. 内联部分css
    - 将重要的需要不断加载的css样式打成内联样式
3. 延迟加载非必要的css
    - chrome的代码覆盖率工具，可以检测是否存在没有用的css
    - 将检查出来的不需要的css抽离成另一个css文件，使用异步加载css
4. 减少js体积
    - 压缩js
    - 减少未使用的polyfill
    - js分包
    - 减少首屏js加载数量
5. 缓存
    - 网络强缓存
    - service work缓存

#### 静态资源加载

1. 使用cdn
2. 支持webp方式的浏览器采用webp，剩下的降级处理
3. 图片懒加载
4. 图片压缩
5. 可使用css代替的就使用css
6. 预加载重要资源， css或者js中存在一些资源是需要动态加载的，可以预先加载
7. 自适应图片加载，不同尺寸的宽度加载不同尺寸的图片


#### 客户端渲染

1. 采用ssr的方式渲染
2. 首屏采用ssr
3. 部分接口数据直接通过ssr塞入页面
4. 使用无头浏览器进行预渲染

## FID

用户首次输入延迟时间， 就是在网页的fcp之后， 用户进行了一次点击，输入，选择等行为，到浏览器的相应中间的这段时间

主要导致的原因基本上是由于js执行或者请求时间过长导致的TBT时间超长而影响性能

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    const delay = entry.processingStart - entry.startTime;
    console.log('FID candidate:', delay, entry);
  }
}).observe({type: 'first-input', buffered: true});
```

### 


## CLS

累计布局偏移， 主要还是当前页面的布局是否会因为接口请求或者其他异步加载的模块导致的布局变化然后发生的布局偏移

```js
let clsValue = 0;
let clsEntries = [];

let sessionValue = 0;
let sessionEntries = [];

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    // 只将不带有最近用户输入标志的布局偏移计算在内。
    if (!entry.hadRecentInput) {
      const firstSessionEntry = sessionEntries[0];
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

      // 如果条目与上一条目的相隔时间小于 1 秒且
      // 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
      // 包含在当前会话中。否则，开始一个新会话。
      if (sessionValue &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000) {
        sessionValue += entry.value;
        sessionEntries.push(entry);
      } else {
        sessionValue = entry.value;
        sessionEntries = [entry];
      }

      // 如果当前会话值大于当前 CLS 值，
      // 那么更新 CLS 及其相关条目。
      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        clsEntries = sessionEntries;

        // 将更新值（及其条目）记录在控制台中。
        console.log('CLS:', clsValue, clsEntries)
      }
    }
  }
}).observe({type: 'layout-shift', buffered: true});
```

## TBT

js 执行过程过长，导致页面卡顿，典型的优化就是react的fiber 时间分片

采用将任务分片，一个fiber就是一个dom构建任务，基于一个时间点来看，如果超过时间还没有构建完成，那就放弃，把控制权还给浏览器，让浏览器执行渲染

当浏览器执行完成， 再回来继续执行当前的任务