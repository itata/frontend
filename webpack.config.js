const path = require("path");
const outputPath = path.join(__dirname, "public");
const sourcePath = path.join(__dirname, "src");
const webpack = require("webpack");
const mode = process.env.NODE_ENV || "development";
console.log("packing bundle with mode mode");
const config = require(`./config/${mode}.js`);

function serializeConfig(obj) {
  let configSerialize = {};
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      configSerialize[k] = JSON.stringify(obj[k]); //`"${JSON.stringify(obj[k])}"`
    } else {
      configSerialize[k] = `"${obj[k]}"`;
    }
  }
  return configSerialize;
}

const plugins = [
  new webpack.DefinePlugin({
    "process.env": Object.assign(serializeConfig(config), {
      NODE_ENV: `"${mode}"`
    })
  })
];
module.exports = {
  entry: ["babel-polyfill", path.join(sourcePath, "main.js")],
  output: {
    path: outputPath,
    filename: "app.js"
  },
  resolve: {
    extensions: [".vue", ".js", ".json"],
    alias: {
      vue: "vue/dist/vue.min.js"
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: "eslint-loader",
      //   enforce: "pre",
      //   include: [path.join(__dirname, "src"), path.join(__dirname, "test")],
      //   options: {}
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              }
            ],
            postcss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              }
            ],
            less: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: false
                }
              }
            ],
            sass: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "sass-loader",
                options: {
                  indentedSyntax: true,
                  sourceMap: false
                }
              }
            ],
            scss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: false
                }
              }
            ],
            stylus: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "stylus-loader",
                options: {
                  sourceMap: false
                }
              }
            ],
            styl: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "stylus-loader",
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          transformToRequire: {
            video: "src",
            source: "src",
            img: "src",
            image: "xlink:href"
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [path.join(__dirname, "src"), path.join(__dirname, "test")],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: false,
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.postcss$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: false,
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: false,
              sourceMap: false
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: false,
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              indentedSyntax: true,
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: false,
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};
