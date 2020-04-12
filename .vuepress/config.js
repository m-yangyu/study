module.exports = {
    themeConfig: {
        nav: [
            { text: 'vue', link: '/vue' },
            { text: 'react', link: '/react/react' },
            { text: 'interview', link: '/interview/css' }
        ],
        sidebar: [
            {
                title: '面试题',
                collapsable: false,
                children: [
                    ['/study/interview/css', 'css'],
                    ['/study/interview/js', 'js'],
                    ['/study/interview/react_vue', 'react_vue']
                ]
            },
            {
                title: 'css',
                collapsable: false,
                children: [
                    ['/study/basic/css', 'css']
                ]
            },
            {
                title: 'js基础',
                collapsable: false,
                children: [
                    ['/study/basic/basic', '基础（一）'],
                    ['/study/basic/http', 'http'],
                    ['/study/basic/reflect', 'reflect'],
                    ['/study/basic/prototype', '原型链'],
                    ['/study/basic/Iterator', '迭代器'],
                    ['/study/basic/designPattern', '设计模式'],
                    ['/study/basic/Array', '数组'],
                    ['/study/basic/closure', '闭包']
                ]
            },
            {
                title: '学习内容',
                collapsable: false,
                children: [
                    ['/study/other/cli', 'cli'],
                    ['/study/other/framework', '大型项目架构'],
                    ['/study/other/20200301', '记一次企业级脚手架搭建的经历'],
                    ['/study/other/pwa', 'pwa'],
                    ['/study/other/leetcode', '算法题']
                ]
            },
            {
                title: 'react',
                collapsable: false,
                children: [
                    ['/study/react/react', 'react简单内容'],
                    ['/study/react/important', 'react概念解析'],
                    ['/study/react/redux', 'redux简单内容']
                ]
            },
            {
                title: 'vue',
                collapsable: false,
                children: [
                    ['/study/vue/vue', 'vue']
                ]
            },
            {
                title: 'uniapp',
                collapsable: false,
                children: [
                    ['/studyuniapp/', '项目搭建']
                ]
            },
            {
                title: 'webpack',
                collapsable: false,
                children: [
                    ['/study/webpack/webpack', 'webpack'],
                    ['/study/webpack/simple-webpack', 'simple-webpack'],
                    ['/study/webpack/webpack-loader', 'loader'],
                    ['/study/webpack/webpack-plugin', 'plugin']
                ]
            },
            {
                title: 'node',
                collapsable: false,
                children: [
                    ['/study/node/node_mock', '使用node mock数据'],
                    ['/study/node/mysql', 'mysql'],
                    ['/study/node/loginSign', '单点登录']
                ]
            },
            {
                title: 'typescript',
                collapsable: false,
                children: [
                    ['/study/typescript/ts', '简介']
                ]
            },
            {
                title: 'svelte',
                collapsable: false,
                children: [
                    ['/study/svelte', 'svelte']
                ]
            },
            {
                title: 'rollup',
                collapsable: false,
                children: [
                    ['/study/rollup/rollup', 'rollup']
                ]
            },
            {
                title: '资源优化',
                collapsable: false,
                children: [
                    ['/study/optimization/static', '静态资源'],
                    ['/study/optimization/lazyload', '懒加载']
                ]
            },
            {
                title: '中台',
                collapsable: false,
                children: [
                    ['/study/middlePlatform/desc', '中台简介']
                ]
            }
        ],
        displayAllHeaders: true
    },
    title: '学习文档',
    description: '自己学习过程中的记录',
}