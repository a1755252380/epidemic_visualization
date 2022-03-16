const webpack = require('webpack')
module.exports = {
  publicPath: '/',
  // 文件里面添加这行require代码
  devServer: {
    open: true,
    hot: true,//自动保存
    proxy: {
      '/data': {
        target: 'http://127.0.0.1:5000/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/data': '' 
        }
      },
    
    }
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
