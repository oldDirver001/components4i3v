/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-22 16:47:28
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-23 15:11:21
 * @Description: 请输入
 */
const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir)
}

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 8088,
  },
  /**
   * @see https://cli.vuejs.org/zh/config/#publicpath
   */
  publicPath: "./",
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: "false",
  // 在这里对 webpack 进行设置
  configureWebpack: {
    resolve: {
      alias: {
         // 配置别名
        '@': resolve('examples'),
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: NODE_ENV === 'development' ? 'examples/main.js' : 'examples/index.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  }
};
