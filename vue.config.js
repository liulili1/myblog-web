const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  /**
   * 静态资源打包路径
   */
  assetsDir: 'static',
  devServer: {
    proxy: {//配置跨域
        '/apis': {
            target: 'http://pv.sohu.com',//搜狐的域名
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/apis': ''//请求的时候使用这个api就可以
            }
        }    
      }
    },
    configureWebpack: {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: 'bela‘s blog',
      // devtool:"source-map",//开启source-map
      devtool: 'source-map',
      resolve: {
        alias: {
          '@': path.join(__dirname,'src')
        }
      },
      performance: {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      },
    },
}