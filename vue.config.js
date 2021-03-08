// vue.config.js
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')// 引入gzip压缩插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
const pxtorem = require('postcss-pxtorem');
const InlineHeadPlugin = require('./src/plugins/InlineHeadPlugin/inlineHead') //自定义插件，将meta文件嵌入html头部

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  publicPath: './',

  // 将构建好的文件输出到哪里
  outputDir: 'dist/static',

  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 生产环境关闭 source map
  productionSourceMap: false,

  // lintOnSave: true,

  // 配置css
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    sourceMap: true,
    // css预设器配置项
    
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
    // 启用 CSS modules for all css / pre-processor files. vue-cli4将 modules 换成 requireModuleExtension
    // modules: false // modules 和 requireModuleExtension 值是相反的！！
    requireModuleExtension: true
  },

  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))

    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-module-eval-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development',
      config => {
        // 内联runtimeChunk生成的映射文件
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }])
          .end()

        // 去除生产环境console
        config.optimization.minimizer('terser').tap((args) => {
          args[0].terserOptions.compress.drop_console = true
          return args
        })
      })
    // 优化
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'),
          minChunks: 3, //  被至少用三次以上打包分离
          priority: 5, // 优先级
          reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
        },
        node_vendors: {
          name: 'chunk-libs',
          chunks: 'initial', // 只打包初始时依赖的第三方
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        },
        vantUI: {
          name: 'chunk-vantUI', // 单独将 vantUI 拆包
          priority: 20, // 数字大权重大，满足多个 cacheGroups 的条件时候分到权重高的
          test: /[\\/]node_modules[\\/]_?vant(.*)/
        }
      }
    })
    config.optimization.runtimeChunk('single') // 抽离运行时
  },

  configureWebpack: (config) => {
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/common/entry-skeleton.js')
        }
      },
      minimize: true,
      quiet: true,
      router: {
        mode: 'hash',
        routes: [
          { path: '/', skeletonId: 'skeleton1' },
          { path: '/about', skeletonId: 'skeleton2' }
        ]
      }
    }))

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())

      config.plugins.push(new CompressionPlugin({ // gzip压缩配置
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      }))
    }

    // 生产环境去掉vconsole调试器
    const envType = process.env.NODE_ENV !== 'production'
    const pluginsDev = [
      new VConsolePlugin({
        filter: [],
        enable: envType
      })
    ]
    config.plugins.push(new InlineHeadPlugin())
    config.plugins = [...config.plugins, ...pluginsDev]

    // console.log('webpack配置')
    // console.log(config)
    config.performance = {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项。
  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  devServer: {
    host: '0.0.0.0',
    port: 8088, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌

    // 配置多个代理
    proxy: {
      '/api': {
        target: 'https://www.mock.com',
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
