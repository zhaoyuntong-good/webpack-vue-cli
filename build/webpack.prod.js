const path = require('path');
const webpackConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports = merge(webpackConfig, {
	mode:'production',
	devtool:'cheap-module-source-map',
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{
				from:path.resolve(__dirname,'../public'),
				to:path.resolve(__dirname,'../dist')
			}]
		}),
		new ParallelUglifyPlugin({
			cacheDir: '.cache/',
			uglifyJS: {
				output: {
					comments: false,
					beautify: false
				},
				compress: {
					drop_console: true,
					collapse_vars: true,
					reduce_vars: true
				}
			}
		}),
		new OptimizeCssAssetsPlugin({})
	]
})