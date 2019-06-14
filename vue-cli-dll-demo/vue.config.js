const path = require("path")
module.exports = {
    // Other options...

    pluginOptions: {
        dll: {
            // 入口配置
            entry: ['vue', 'vuex'],
            // 输入目录
            output: path.join(__dirname, './public/haoge'),

            // 是否开启 DllReferencePlugin,

            // 1. 如果你需要在开发环境中不采用开启分包模式，你可以配置open为false。
            // 例如，我们入口配置为 entry: ['vue']， 我们执行npm run dll 构建了vendor包。
            // 在npm run serve的时候，如果默认open开启的情况下，其实开发环境采用的vue是生成环境的包，因为我们dll命令构建的就是生成环境的包。
            // 这会让我们在开发环境中无法看到vue给我们带来的友好提示建议。
            // 我们可以配置open : process.env.NODE_ENV === 'production'，只在生成环境开启DllReferencePlugin

            // 2. 'auto' 参数会自动识别是否有先执行npm run dll生成分包，如果没有的情况下则不开启dll。
            open: 'auto',

            // 自动注入到index.html
            // 在构建其他命令的时候，如果开启了自动注入。程序会手动将output中生成的*.dll.js 文件自动注入到index.html中。
            inject: true,
        }
    }
}