const webpack = require('webpack')

const isProductionBuild = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './lib/main',
  output: {
    path: './dist',
    libraryTarget: 'commonjs',
    filename: isProductionBuild ? 'react-tinymce.min.js' : 'react-tinymce.js'
  },
  externals: {
    'react': 'react',
    'react/addons': 'react',
    'react-dom': 'react-dom'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
