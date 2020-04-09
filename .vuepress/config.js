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
                    ['/interview/css', 'css'],
                    ['/interview/js', 'js'],
                    ['/interview/react_vue', 'react_vue']
                ]
            },
            {
                title: 'css',
                collapsable: false,
                children: [
                    ['/basic/css', 'css']
                ]
            },
            {
                title: 'js基础',
                collapsable: false,
                children: [
                    ['/basic/basic', '基础（一）'],
                    ['/basic/http', 'http'],
                    ['/basic/reflect', 'reflect'],
                    ['/basic/prototype', '原型链'],
                    ['/basic/Iterator', '迭代器'],
                    ['/basic/designPattern', '设计模式'],
                    ['/basic/Array', '数组'],
                    ['/basic/closure', '闭包']
                ]
            },
            {
                title: '学习内容',
                collapsable: false,
                children: [
                    ['/other/cli', 'cli'],
                    ['/other/framework', '大型项目架构'],
                    ['/other/20200301', '记一次企业级脚手架搭建的经历'],
                    ['/other/pwa', 'pwa'],
                    ['/other/leetcode', '算法题']
                ]
            },
            {
                title: 'react',
                collapsable: false,
                children: [
                    ['/react/react', 'react简单内容'],
                    ['/react/important', 'react概念解析'],
                    ['/react/redux', 'redux简单内容']
                ]
            },
            {
                title: 'vue',
                collapsable: false,
                children: [
                    ['/vue/vue', 'vue']
                ]
            },
            {
                title: 'uniapp',
                collapsable: false,
                children: [
                    ['uniapp/', '项目搭建']
                ]
            },
            {
                title: 'webpack',
                collapsable: false,
                children: [
                    ['/webpack/webpack', 'webpack'],
                    ['/webpack/simple-webpack', 'simple-webpack'],
                    ['/webpack/webpack-loader', 'loader'],
                    ['/webpack/webpack-plugin', 'plugin']
                ]
            },
            {
                title: 'node',
                collapsable: false,
                children: [
                    ['/node/node_mock', '使用node mock数据']
                ]
            },
            {
                title: 'typescript',
                collapsable: false,
                children: [
                    ['/typescript/ts', '简介']
                ]
            },
            {
                title: 'svelte',
                collapsable: false,
                children: [
                    ['/svelte', 'svelte']
                ]
            },
            {
                title: 'rollup',
                collapsable: false,
                children: [
                    ['/rollup/rollup', 'rollup']
                ]
            },
            {
                title: '资源优化',
                collapsable: false,
                children: [
                    ['/optimization/static', '静态资源'],
                    ['/optimization/lazyload', '懒加载']
                ]
            },
            {
                title: '中台',
                collapsable: false,
                children: [
                    ['/middlePlatform/desc', '中台简介']
                ]
            }
        ],
        displayAllHeaders: true
    },
    title: '学习文档',
    description: '自己学习过程中的记录',
}