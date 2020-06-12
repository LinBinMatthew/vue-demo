'use strict'
// webpack基本配置
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// __dirname:/hello-world/build/
function resolve (dir) {
  return path.join(__dirname, '..', dir) // /hello-world/dir
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'), // 是一个绝对路径，指定接下来所有配置的基本路径
  entry: {
    app: './src/main.js' // 在context下寻找该目录
  },
  output: {
    path: config.build.assetsRoot, // 存放打包后文件的输出目录 打包结果存在哪里
    filename: '[name].js', // 输出文件的名字，[name]的值是entry的键值
    publicPath: process.env.NODE_ENV === 'production' // 被webpack插件用于在生产模式下更新内嵌到css、html文件里的url
      ? config.build.assetsPublicPath 
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/, // 匹配.vue文件，如果通过则使用下面的loader
        loader: 'vue-loader', // 使用vue-loader作为loader
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 将es6语法文件转换成es5
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        // 包括的文件目录
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      { test: /.less$/, 
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
