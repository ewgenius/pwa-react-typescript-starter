const path = require('path')
const webpack = require('webpack')
const loaders = require('./loaders')

module.exports = {
  entry: {
    app: ['./src/app.tsx'],
    vendor: []
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./build')
  },
  module: {
    loaders
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
}
