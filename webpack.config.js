'use strict'

const path = require('path')
const webpack = require('webpack')
const rootPath = path.resolve(__dirname)
const srcPath = path.join(rootPath, 'src')
//使用插件
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin')
const extractCss = new ExtractTextPlugin( 'style/[name]-css-[hash:6].css' )
const extractScss = new ExtractTextPlugin( 'style/[name]-scss-[hash:6].css' )
const extractLess = new ExtractTextPlugin( 'style/[path]___[name]__[local]___[hash:base64:5].css' )
const precss       = require('precss');
const autoprefixer = require('autoprefixer');

const common = {
    rootPath: rootPath,
    srcPath: srcPath,
    dist: path.join(rootPath, 'dist'),
    indexHtml: path.join(srcPath, 'index.html'),
    staticDir: path.join(rootPath, 'static'),
    entry: path.join(srcPath, 'index.js')
}

//设置环境变量
const env = process
    .env
    .NODE_ENV
    .trim()
//是否是开发环境
const isDev = (env === 'development')




//开发模式下修改入口文件
if (isDev) {
    common.entry = [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading only- means to only hot reload for
        // successful updates

        path.join(common.srcPath, 'index.js')
    ]
}
if ( isDev ) {
    common.plugins = [
        new HtmlWebpackPlugin( {
            template: common.indexHtml,
            inject: 'body'
        } ),
        new webpack.HotModuleReplacementPlugin(), // HMR全局启用
        new webpack.NamedModulesPlugin(), // 在HMR更新的浏览器控制台中打印更易读的模块名称
    ]
} else {
    common.plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin( {
            template: common.indexHtml,
            inject: 'body'
        } ),
        new webpack.NoEmitOnErrorsPlugin(),
        // stataic目录下静态资源的复制
        new CopyWebpackPlugin( [
            {
                context: common.rootPath,
                from: 'static/*',
                ignore: [
                    '*.md'
                ]
            }
        ] ),
        new webpack.optimize.CommonsChunkPlugin( {
            name: 'vendor',
            filename: 'vendor.bundle.js'
        } ),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        })
    ]
}

common.plugins.push( new webpack.DefinePlugin( {
    'process.env': {
        NODE_ENV: JSON.stringify(env)
    }
} ) )
const styleLoaders = {
    style: {
        loader: 'style-loader'
    },
    css: {
        loader: 'css-loader',
        //设置css modules
        options: {
            //将css进行hash编码，保证模块性，保证单独使用，而不会污染全局
            modules: true,
            importLoaders: 1,
            locatlIdentName: "[path]___[name]__[local]___[hash:base64:5]"
        }
    },
    postcss: {
        //css后处理器，这里主要是为了加载 autoprefixer 用来处理css前缀
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('postcss-import')({root: loader.resourcePath}),
                require('autoprefixer')(), //CSS浏览器兼容
                require('cssnano')()  //压缩css
            ]
        }
    }
}
function handleStyle( plugin, list ) {
    //如果不是开发模式，删除数组中的第一个元素，并使用extrat-plugin将样式额外打包
    if ( !isDev ) {
        list.splice( 0, 1 )
        return plugin.extract( list )
    }
    return list
}

var webpackConfig = {
    entry: common.entry,
    output: {
        //输出名称 和 路径
        filename: 'bundle.js',
        path: common.dist,
    },
    context: path.resolve(__dirname, 'src'),
    devtool: isDev
        ? 'cheap-module-eval-source-map'
        : 'cheap-module-source-map',
    module: {
        //webpack1.0中可以省略 '-loader'，但是官方说法为了有明确的区分，在webpack2.0中，不能再省略
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    path.join(common.rootPath, 'src'), //转换src路径下的代码
                ],
                exclude: /node_modules/, //忽略node_modules路径代码
            //     options: {
            //         emitWarning: true,
            //         emitError: true,
            //         //failOnWarning: false, failOnError: true,
            //         useEslintrc: false,
            //         // configFile: path.join(__dirname, "eslint_conf.js")
            //         configFile: path.join( __dirname, '.eslintrc.json' )
            //     }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    path.join( common.rootPath, 'src' ), //转换src路径下的代码
                ],
                exclude: /node_modules/, //忽略node_modules路径代码
                options:{
                    plugins: [
                        ['import', [{ libraryName: 'antd', style: 'css' }]],//按需加载antd 样式，有效小包大小
                    ]
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: '[name]-[hash:6].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: '[name]-[hash:6].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ( handleStyle(extractCss, [
                    styleLoaders.style,
                    styleLoaders.css,
                    styleLoaders.postcss
                ]))
            },
            {
                test: /\.scss$/,
                use: ( handleStyle(extractScss, [
                    styleLoaders.style,
                    styleLoaders.css,
                    styleLoaders.postcss,
                    {
                        loader: 'sass-loader'
                    }
                ]))
            },
            {
                test: /\.less$/,
                use: ( handleStyle(extractLess, [
                    styleLoaders.style,
                    styleLoaders.css,
                    styleLoaders.postcss,
                    {
                        loader: 'less-loader',
                    }
                ]))

            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.less'
        ],
        alias: {
            Root: path.resolve( __dirname, 'src' ),
            Components: path.resolve( __dirname, 'src/components' ),
            Layouts: path.resolve( __dirname, 'src/layouts' ),
            Routes: path.resolve( __dirname, 'src/routes' ),
        } //为某些路径设置别名
    },
    plugins: (function () {
        //如果是开发模式不将样式文件进行分离。tip:为了实现热加载
        if ( isDev )
            return common.plugins
        common
            .plugins
            .push( extractCss )
        common
            .plugins
            .push( extractLess )
        common
            .plugins
            .push( extractScss )
        //返回组装完成后的plugins
        return common.plugins
    })(),

}

//开发模式下添加devServer字段
//devServer候选字段参考https://webpack.js.org/configuration/dev-server/
if (isDev) {
    webpackConfig.devServer = {
        historyApiFallback: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clientLogLevel: 'none', //日志
        compress: true, //压缩
        port: 3000,
        stats: {
            colors: true
        },
        proxy: {
            '/api/*': {
                target: 'http://localhost',
                changeOrigin: true,
                secure: false,
            }
        }
    }
}


module.exports = webpackConfig;