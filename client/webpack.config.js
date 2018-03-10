// Environment Variable Setup
const path = require('path');
// Pull local .env values
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') });
// Dotenv has a "parsed" property that holds an object of the variables loaded
// Mimics react-scripts from create-react-app, including only prefixed values on the FE
const envPrefix = dotenv.parsed['ENVPREFIX'] || 'REACT_APP_';
const envVars = Object.entries(dotenv.parsed).reduce((obj, [key, value]) => {
  let match = new RegExp('^' + envPrefix, 'i');
  if (match.test(key)) {
    // Object values from dotenv.parsed are raw, so they need to be stringified to pass safely to the frontend
    obj[key] = JSON.stringify(value);
  }
  return obj;
}, {})

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const options = {
  devTool: 'source-map',
  uglify: {}
}

if (process.env.NODE_ENV === 'production') {
  options.devTool = '';
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
}

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    filename: './public/bundle.js'
  },
  watch: true,
  devtool: options.devTool,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'logo.svg',
              outputPath: 'public/',
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: 65,
              },
              svggo: {},
              webp: {
                quality: 65
              }
            }
          },
        ],
      }
    ]
  },
  // this plugin just passes variables to the frontend context
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envVars
    }),
  ]
  // plugins: [
  //   new ExtractTextPlugin('./client/styles/main.css', {
  //     allChunks: true
  //   }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: { removeAll: true } },
    //   canPrint: true
    // }),
  // ]
}

