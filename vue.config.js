module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("autoprefixer"), require("postcss-utilities")]
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Frost Remnands RPG"
      }
    }
  }
};