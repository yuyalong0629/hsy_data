const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('utils', resolve('src/utils'))
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)) // 忽略/moment/locale下的所有文件
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        modifyVars: {
          // less 变量覆盖，用于自定义 ant design 主题
          'primary-color': '#DA5054', // 全局主色
          // 'link-color': '#1890ff', // 链接色
          // 'success-color': '#52c41a', // 成功色
          // 'warning-color': '#faad14', // 警告色
          // 'error-color': '#f5222d', // 错误色
          'font-size-base': '14px' // 主字号
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://hsyapi.hsydata.com',
        // target: 'http://192.168.0.106:8089',
        // target: 'http://192.168.0.85:8089',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
