module.exports = require('./webpack.make')({
  production: true,
  sourceMaps: false,
  lint: true,
  HtmlWebpackPlugin: {
    title: 'React App - Production'
  },
  api: 'http://api.arm.dev/'
});
