const resolve = require('path').resolve
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: resolve('./client/src/index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  output: {
    path: resolve('./build/client/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/\.(test)\.js$/, /node_modules/],
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './client/tsconfig.json'
        }
      },
      {
        test: /\.(styl|css)$/,
        include: /client/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader',
            'stylus-loader?resolve url'
          ]
        })
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: module => module.context && module.context.includes('node_modules')
    }),
    new ExtractTextPlugin('styles.css'),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: '!!html-loader!client/template.html'
    })
  ]
}
