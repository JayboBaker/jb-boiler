const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  context: path.join(__dirname),
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },

  output: {
    filename: isDev ? '[name].bundle.js' : '[name]-[chunkhash:6].bundle.min.js',
    path: path.join(__dirname, 'dist')
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.scss', '.js', '.json']
  },

  devtool: isDev ? 'cheap-source-map' : 'cheap-source-map',

  devServer: {
    contentBase: path.join(__dirname, '/src'),
    watchContentBase: true // Allows autoreload on any file changes in contentBase
  },

  module: {
    rules: [
      {
        test: /\.(s)?css$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        include: path.join(__dirname, 'src/'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new ExtractCssChunks({
      filename: isDev ? '[name].min.css' : '[name]-[chunkhash:6].min.css',
      chunkFilename: isDev ? '[id].min.css' : '[id]-[chunkhash:6].min.css',
      hot: isDev
    }),
    new HtmlWebPackPlugin({
      title: 'jb-perf',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

module.exports = config
