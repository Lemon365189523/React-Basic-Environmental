var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry:  [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/app/main.js')
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
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
};