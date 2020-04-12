## 搭建自己的cli工具

前端自己的开发工具，还是很有必要的

### 过程中遇到的问题

1. download方法，github上有几个download工具，但是后来发现觉得太麻烦了，直接使用child_process的spawn方法直接运行命令行
2. packagejson中写入bin可以直接连接到node_modules的.bin目录中
3. 需要在入口的文件的头顶写入 #!/usr/bin/env node 不然无法识别为可运行文件

### 实现内容

#### dowload

> 没有直接去下载而是通过clone库的方式去获取到项目的文件，也就是说只能依赖于git仓库才能正常运行

``` javascript
    // 下载方法
    // 本质上是调用git clone把远程库给安装到本地
    const downLoad = (url, renameParam) => {
        const curName = renameParam || getProgramName(url);
        const spinner = ora({
            text: '正在下载',
            discardStdin: false
        }).start();
        const git = spawn('git', [
            'clone',
            url,
            curName
        ])

        git.on('close', (code) => {
            rimraf(`./${curName}/.git`, () => {
                spinner.succeed('下载完成');
            })
        });
    }

```

#### argvStore

argvStore 是一个对命令行参数获取并且做解析的分析的一个库

argvStore 是一个单例库，不管在任何地方new argvStore 返回的只会是一个唯一实例

根据commander的实现方式与逻辑仿写了一份自己需要的argvStore，实现了在内部传入回调进行使用的方法
