module.exports = {
    themeConfig: {
        nav: [
            { text: 'vue', link: '/vue' },
            { text: 'react', link: '/react' },
            { text: 'webpack', link: '/webpack' }
        ],
        sidebar: [
            {
                title: '学习内容',
                collapsable: false,
                children: [
                    ['/webpack', 'webpack'],
                    ['/cli', 'cli'],
                    ['/react', 'react'],
                    ['/vue', 'vue']
                ]
            }
        ],
        displayAllHeaders: true
    },
    title: '学习文档',
    description: '自己学习过程中的记录',
}