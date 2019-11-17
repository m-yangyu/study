## 搭建自己的cli工具

前端自己的开发工具，还是很有必要的

### 过程中遇到的问题

1. download方法，github上有几个download工具，但是后来发现觉得太麻烦了，直接使用child_process的spawn方法直接运行命令行
2. packagejson中写入bin可以直接连接到node_modules的.bin目录中
3. 需要在入口的文件的头顶写入 #!/usr/bin/env node 不然无法识别为可运行文件
