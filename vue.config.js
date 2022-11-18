const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "./docs"),
  publicPath: process.env.NODE_ENV === 'production' ? '/todays-todos-vue/' : '/',
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //       pathRewrite: { '^/api': '/' }
  //     },
  //   }
  // }
});
