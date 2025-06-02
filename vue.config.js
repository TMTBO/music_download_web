const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5050/api/", // 后端接口地址
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // 如后端无 /api 前缀
      },
    },
  },
});
