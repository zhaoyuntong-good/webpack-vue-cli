const path = require('path');
const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(webpackConfig, {
	mode: 'development',
	devtool:'cheap-module-eval-source-map',
	devServer: {
		port: 3000,
		hot: true,
		contentBase: '../dist'
	},
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
			templateParameters: {
				BASE_URL: './dist/'
			}
		}),
	]
})