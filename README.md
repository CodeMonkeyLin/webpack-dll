### 作用
DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。
- DLLPlugin 
> 打包固定库生成*.dll.js
> 生成manifest.json(可理解为打包的文件清单) 用来让 DLLReferencePlugin 映射到相关的依赖上去的
- DLLReferencePlugin (告诉打包好库的位置)  引用到需要的预编译的依赖。
### vue-cli 引入dll
```bash
cnpm i vue-cli-plugin-dll -S
```
```bash
module.exports = {
    // Other options...

    pluginOptions: {
        dll: {
            // 入口配置
            entry: ['vue', 'vuex'],
            // 输入目录
            // output: path.join(__dirname, './public/dll')
            // 自动注入到index.html
            // 在构建其他命令的时候，如果开启了自动注入。程序会手动将output中生成的*.dll.js 文件自动注入到index.html中。
            inject: true,
        }
    }
}
```
### umi 引入dll
```bash
export default {
    treeShaking: true,
    plugins: [
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

```
- 配置说明
https://webpack.docschina.org/plugins/dll-plugin/

![Image text](./img/1647a4d653c38364.png)
> 缩短的原理是之后的构建都没有把公共模块打包进app.js里面去了，而是从*.dll.js中引用，你有跑过demo的话会发现构建出来的app.js没有第三方库的代码。

## npm 命令生成
### npx
npx 想要解决的主要问题，就是调用项目内部安装的模块。
#### 安装
```bash
npm install -g npx
```
一般来说，调用 node_modules的包 ，只能在项目脚本和 package.json 的scripts字段里面， 如果想在命令行下调用，必须像下面这样。
```bash
node-modules/.bin/包名 
```
npx 可以直接调用让项目内部安装的模块
```bash
npx a
```
npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。