const path = require("path");
module.exports = {
  chainWebpack: ({ resolve }) => {
    // preload itens import
    resolve
      .alias
      .set("_", path.resolve(__dirname, "./public"));
    // pinia imports
    resolve
      .alias
      .set("-", path.resolve(__dirname, "./src/store"));
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer"), require("postcss-utilities")]
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Restos da Geada - RPG",
      },
      preload: { fs: "public/services/fs.js" }
    }
  }
};