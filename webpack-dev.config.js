const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve('./client/src/index.tsx')
  ],
  output: {
    path: resolve('./client/public/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  context: resolve('./client/src'),
  devServer: {
    hot: true,
    contentBase: resolve('./client/public/'),
    publicPath: '/',
    proxy: {
      '*': 'http://localhost:3000'
    }
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './client/tsconfig.json'
        }
      },
      {
        test: /\.svg/,
        use: 'svg-url-loader'
      },
      {
        test: /\.(styl|css)$/,
        include: /client/,
        use: [{
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              'resolve url': true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: module => module.context && module.context.includes('node_modules')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: '!!html-loader!client/template.html'
    })
  ]
}