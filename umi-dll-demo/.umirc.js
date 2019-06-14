
// ref: https://umijs.org/config/
export default {
    treeShaking: true,
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true,
            },
            dynamicImport: false,
            title: 'umi-dll-demo',
            dll: {
                include: ['antd', 'dva', 'dva/router', 'dva/saga', 'dva/fetch'],
                exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            routes: {
                exclude: [
                    /components\//,
                ],
            },
        }],
    ],
}
