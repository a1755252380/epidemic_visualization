const webpack = require('webpack')
module.exports = {
  publicPath: './',
  // 文件里面添加这行require代码
  devServer: {
    open: true,
    hot: true,//自动保存
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:8080',
    //     ws: true,
    //     changeOrigin: true
    //   },
    
    // }
  },
  
  // 再添加这两行代码
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.DefinePlugin({
        '__DEV__':false
      })
    ]
  },

  chainWebpack (config) {
    config.module

      .rule('swf')

      .test(/\.swf$/)

      .use('url-loader')

      .loader('url-loader')

      .options({
        limit: 1024,

        name: 'file/[path][name].[hash:7].[ext]'
      })

      .end()
  },
}
