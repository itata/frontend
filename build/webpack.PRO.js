var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')
var publicPath = path.resolve('./public')
var hostingPath = path.resolve('./build/server.PRO.js')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var mode = 'production'
var config = require(path.resolve(`./config/${mode}.js`))
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var chalk = require('chalk')
var outputPath = path.resolve(process.env.OUTPUT_PATH || './dist')

console.log('Packing bundle with mode PRODUCTION')

function serializeConfig(obj) {
    let configSerialize = {}
    for (let k in obj) {
        if (typeof obj[k] === 'object') {
            configSerialize[k] = JSON.stringify(obj[k])
        } else {
            configSerialize[k] = `"${obj[k]}"`
        }
    }
    return configSerialize
}

var plugins = [
    new webpack.DefinePlugin({
        'process.env': Object.assign(serializeConfig(config), {
            NODE_ENV: `"${mode}"`
        })
    }),
    new CopyWebpackPlugin([{
        from: path.join(hostingPath),
        to: path.join(outputPath, 'server.js')
    }, {
        from: path.join(publicPath, 'public'),
        to: path.join(outputPath, 'public')
    }, {
        from: path.join(publicPath, 'favicon.png'),
        to: path.join(outputPath, 'favicon.png')
    }]),
    new UglifyJSPlugin({
        sourceMap: true
    }),
    new ProgressBarPlugin({
        format: 'Build [:bar] ' + chalk.green.bold(':percent') + ' :msg - :elapsed seconds'
    }),
    new HtmlWebpackPlugin({
        inject: false,
        staticVersion: (+new Date()).toString(22),
        template: path.join(publicPath, 'index.PRO.ejs')
    })
]

module.exports = {
    entry: {
        app: ['babel-polyfill', path.resolve('./src/main.js')]
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    },
    module: {
        loaders: [{
            test: /\.(html|ejs)$/,
            loader: 'ejs-loader?variable=data'
        }],
        'rules': [{
            'test': /\.(js|vue)$/,
            'loader': 'eslint-loader',
            'enforce': 'pre',
            'include': [path.resolve('./src'), path.resolve('./test')],
            'options': {}
        }, {
            'test': /\.vue$/,
            'loader': 'vue-loader',
            'options': {
                'loaders': {
                    'css': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }],
                    'postcss': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }],
                    'less': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }, {
                        'loader': 'less-loader',
                        'options': {
                            'sourceMap': false
                        }
                    }],
                    'sass': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }, {
                        'loader': 'sass-loader',
                        'options': {
                            'indentedSyntax': true,
                            'sourceMap': false
                        }
                    }],
                    'scss': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }, {
                        'loader': 'sass-loader',
                        'options': {
                            'sourceMap': false
                        }
                    }],
                    'stylus': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }, {
                        'loader': 'stylus-loader',
                        'options': {
                            'sourceMap': false
                        }
                    }],
                    'styl': ['vue-style-loader', {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': false,
                            'sourceMap': false
                        }
                    }, {
                        'loader': 'stylus-loader',
                        'options': {
                            'sourceMap': false
                        }
                    }]
                },
                'transformToRequire': {
                    'video': 'src',
                    'source': 'src',
                    'img': 'src',
                    'image': 'xlink:href'
                }
            }
        }, {
            'test': /\.js$/,
            'loader': 'babel-loader',
            'include': [path.resolve('./src'), path.resolve('./test')],
            'exclude': /node_modules/
        }, {
            'test': /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            'loader': 'url-loader',
            'options': {
                'limit': 10000,
                'name': 'static/img/[name].[hash:7].[ext]'
            }
        }, {
            'test': /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            'loader': 'url-loader',
            'options': {
                'limit': 10000,
                'name': 'static/media/[name].[hash:7].[ext]'
            }
        }, {
            'test': /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            'loader': 'url-loader',
            'options': {
                'limit': 10000,
                'name': 'static/fonts/[name].[hash:7].[ext]'
            }
        }, {
            'test': /\.html$/,
            'use': [{
                'loader': 'html-loader',
                'options': {
                    'minimize': true
                }
            }]
        }, {
            'test': /\.css$/,
            'use': ['vue-style-loader', {
                'loader': 'css-loader',
                'options': {
                    'minimize': false,
                    'sourceMap': false
                }
            }]
        }, {
            'test': /\.postcss$/,
            'use': ['vue-style-loader', {
                'loader': 'css-loader',
                'options': {
                    'minimize': false,
                    'sourceMap': false
                }
            }]
        }, {
            'test': /\.less$/,
            'use': ['vue-style-loader', {
                'loader': 'css-loader',
                'options': {
                    'minimize': false,
                    'sourceMap': false
                }
            }, {
                'loader': 'less-loader',
                'options': {
                    'sourceMap': false
                }
            }]
        }, {
            'test': /\.sass$/,
            'use': ['vue-style-loader', {
                'loader': 'css-loader',
                'options': {
                    'minimize': false,
                    'sourceMap': false
                }
            }, {
                'loader': 'sass-loader',
                'options': {
                    'indentedSyntax': true,
                    'sourceMap': false
                }
            }]
        }, {
            'test': /\.scss$/,
            'use': ['vue-style-loader', {
                'loader': 'css-loader',
                'options': {
                    'minimize': false,
                    'sourceMap': false
                }
            }, {
                'loader': 'sass-loader',
                'options': {
                    'sourceMap': false
                }
            }]
        }]
    },
    plugins: plugins
}