var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// var BUILD_DIR = path.resolve(__dirname,'src/public');
var APP_DIR = path.resolve(__dirname,'src/app');

var DEV = process.env.NODE_ENV === 'DEV'; //开发模式
var PROD = process.env.NODE_ENV === 'PROD'; //生成模式

var entry = PROD
    ?   [
        APP_DIR + '/index.js'
    ]
    :   [
        'react-hot-loader/patch',
        // 开启react代码的模块热替换（HMR）

        'webpack-dev-server/client?http://localhost:8080',
        // 为webpack-dev-server的环境打包好运行代码
        // 然后连接到指定服务器域名与端口

        'webpack/hot/only-dev-server',
        // 为热替换（HMR）打包好运行代码
        // only- 意味着只有成功更新运行代码才会执行热替换（HMR）

        APP_DIR + '/index.js'
        // 我们app的入口文件
    ];

var plugins = PROD
    ? [
        new webpack.optimize.UglifyJsPlugin({
            comments: true,
            mangle: false,
            compress: {
                warnings: true
            }
        }),
        new ExtractTextPlugin('style.css')
    ]
    : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(DEV),
            PRODUCTION: JSON.stringify(PROD)
        }),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({template: './dist/index.html'}),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）
        new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    ];

var cssIdentName = PROD ? '[hash:base64:10]' : '[path][name]-[local]-[hash:base64:24]';

var cssLoader = PROD
    ?       ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: 'css-loader?localIdentName=' + cssIdentName
    })
    :       ['style-loader', 'css-loader?localIdentName=' + cssIdentName];

//webpack配置文件项
module.exports = {
    devtool: "source-map",
    //入口文件
    entry: entry,
    //输出打包的文件
    output: {
        //打包文件名
        filename: 'bundle.js',
        //bundle.js输出路径,是一个绝对路径
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
        // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
    },
    plugins: plugins,
    module: {
        //当碰到「在 require()/import 语句中被解析为 '.js' 或 '.jsx' 的路径」时，在你把它们添加并打包之前，要先使用 babel-loader 去转换”。
        loaders:[
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|gif|png)$/,
                exclude: '/node_modules/',
                // loader: 'file-loader'
                loader: 'url-loader?limit=512&name=[path][name].[ext]?[hash]'
            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loader: cssLoader
            }
        ]
    },
    resolve:{
        modules: [
            "node_modules",
            path.join(__dirname, "src")
        ],
        extensions: [".js", ".json", ".jsx", ".css", ".gif"],
    },
    devServer: {
        hot: true,
        publicPath: '/',
        // 和上文output的"publicPath"值保持一致
        stats: {
            colors: true
        },
        contentBase: path.resolve(__dirname, 'dist')
        // 输出文件的路径
    },
    performance: {
        hints: false
    }
};