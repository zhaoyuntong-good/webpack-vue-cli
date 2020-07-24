const path = require('path');
const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const devServer = {
	host: 'localhost',
	port: 3000,
	hot: true,
	contentBase: path.resolve(__dirname, '../public'),
	quiet: true,
	proxy: {
    '/hccloud': {
      target: 'http://192.168.1.238:8091/',
      pathRewrite: {'^/hccloud' : '/hccloud'}
    }
  }
}
module.exports = merge(webpackConfig, {
	mode: 'development',
	devtool:'cheap-module-eval-source-map',
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, '../public'),
	},
	devServer: devServer,
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
			templateParameters: {
				BASE_URL: './'
			}
		})
	]
})