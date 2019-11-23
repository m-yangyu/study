module.exports = {
    themeConfig: {
        nav: [
            { text: 'vue', link: '/vue' },
            { text: 'react', link: '/react' },
            { text: 'webpack', link: '/webpack/webpack' }
        ],
        sidebar: [
            {
                title: '学习内容',
                collapsable: false,
                children: [
                    ['/cli', 'cli'],
                    ['/react', 'react'],
                    ['/vue', 'vue']
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
                title: 'svelte',
                collapsable: false,
                children: [
                    ['/svelte', 'svelte']
                ]
            },
            {
                title: 'node',
                collapsable: false,
                children: [
                    ['/node/node_mock', '使用node mock数据']
                ]
            }
        ],
        displayAllHeaders: true
    },
    title: '学习文档',
    description: '自己学习过程中的记录',
}