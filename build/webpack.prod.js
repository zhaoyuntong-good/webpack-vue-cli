const path = require('path');
const webpackConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackConfig, {
	mode:'production',
	devtool:'cheap-module-source-map',
	output: {
		filename: 'js/[name].[hash:8].js',
		path: path.resolve(__dirname, '../dist/assets'),
		publicPath: './assets/'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from:path.resolve(__dirname,'../public'),
				to:path.resolve(__dirname,'../dist'),
				globOptions: {
          ignore: ['index.html']
        },
			}]
		}),
		new HtmlWebpackPlugin({
			filename: path.resolve(__dirname, '../dist/index.html'),
			template: path.resolve(__dirname, '../public/index.html'),
			templateParameters: {
				BASE_URL: './'
			}
		}),
	],
	optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
    	}),
    	new OptimizeCssAssetsPlugin({}),
    ],
    splitChunks:{
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial"
        }
      }
    }
  }
})