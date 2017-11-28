module.exports = require('./webpack.make')({
  production: false,
  sourceMaps: true,
  lint: true,
  HtmlWebpackPlugin: {
    title: 'React App - Development'
  },
});
