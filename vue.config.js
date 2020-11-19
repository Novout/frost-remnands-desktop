module.exports = {
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
      preload: { fs: 'public/services/fs.js' }
    }
  }
};