

var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname); 
var ENTRY_PATH = path.resolve(ROOT_PATH, 'src'); 
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TPL = path.resolve(ROOT_PATH, 'tpl', 'index.html');

module.exports = {
  // devtool: 'eval',
  // externals: 
  //         {
  //             'react': 'window.React',
  //             'react-dom': 'window.ReactDOM',
  //             'go': 'window.go'
  //         },
  entry: ENTRY_PATH,

  output: {

    path: BUILD_PATH,
    publicPath: './',
    filename: 'bundle.js'

  },
  module: { 
    loaders: [  
      { 
        test: /\.css$/, 
        loaders: ['style', 'css']
      },
      { 
        test: /\.less$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },
      { test: /\.jsx?$/, 
        loader: 'babel', 
        query: { 
          presets: ['es2015', 'react'],
        } 
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ] 
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'React-Tree', 
      template: './tpl/index.html', 
    }),
    new ExtractTextPlugin("[name].css")
  ]
  // devServer: {
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   progress: true,
  //   host:'0.0.0.0'
  // },
}