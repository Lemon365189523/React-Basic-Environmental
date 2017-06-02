var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');


// ant  使用Icon需要
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
    entry:  [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/main.js')
    ],
    output: {
        path: path.join(__dirname, '/build'),//打包后的文件存放的地方
        filename: "bundle.js",//打包后输出文件的文件名
        publicPath: '/'
    },
    devServer: {
        //查看配置网址 http://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
        port: 8080 ,//设置监听端口（默认的就是8080）
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转，用于开发单页面应用，依赖于HTML5 history API 设置为true点击链接还是指向index.html
        // inline: false
        publicPath: '/',
        hot: true,
        quiet: false, //控制台中不输出打包的信息
        compress: true, //开启gzip压缩
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // new ExtractTextPlugin('style.css'),     // 指定css文件名 打包成一个css
        // 分开打包多个css
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].bundle.css',
            allChunks: true,
        })

    ],
    devtool:  "cheap-eval-source-map",

    module: {
        rules:[
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use : [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options:{
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],      // 将css打包到js里面
                // 将css单独打包，需要plugins
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     //resolve-url-loader may be chained before lesss-loader if necessary
                //     use: ['css-loader', 'less-loader']
                // })
            },
            {
                test: /\.(svg)$/i,
                use: ['svg-sprite-loader'],
                include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
            {
                test: /\.(png|jpg)$/,
                use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.web.js','.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
        modules: ['node_modules', path.join(__dirname, './node_modules')],
    }
};