const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "./docs"),
  publicPath: process.env.NODE_ENV === 'production' ? '/todays-todos-vue/' : '/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://node.widesign.co.uk',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' }
      },
    }
  }
});
