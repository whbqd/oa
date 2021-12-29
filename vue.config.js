module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                        'text-color': '#111',
                        'border-color': '#eee',

                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "your-less-file-path.less";`,
                    },
                },
            },
        },
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //             // 将/api开头的url转发到target上。
    //             target: 'http://172.25.65.149:8089',
    //             changeOrigin: true,
    //             ws: true,
    //             pathRewrite: {
    //                 // 顾名思义，将/api重写为 /   此时url变为 http://192.168.101.110:8888/ 而不是  http://192.168.101.110:8888/api
    //                 '^/api': '/'
    //             }
    //         }

    //     }
    // }
}