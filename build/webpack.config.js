const path = require('path');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const os = require('os');
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const devMode = process.argv.indexOf('--mode=production') === -1;
module.exports = {
	entry: {
		main: ["@babel/polyfill",path.resolve(__dirname,'../src/main.js')]
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [{
					loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					options:{
            publicPath: "../dist/css/",
            hmr: devMode
          }
				}, 'css-loader', {
					loader: 'postcss-loader',
					options:{
            plugins:[require('autoprefixer')]
          }
				}, 'less-loader']
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'happypack/loader?id=happyBabelJS'
				}],
				exclude: /node_moudels/
			},
			{
				test: /\.vue$/,
				use: ['vue-loader'],
				include: [path.resolve(__dirname, '../src')],
				exclude: /node_moudels/
			},
			// {
   //      test: /\.html$/,
   //      use: 'vue-html-loader'
   //    },
			{
				test: /\.(jpe?g|png|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'imgs/[name].[hash:8].[ext]'
								}
							},
							include: [path.resolve(__dirname, '../src/assets/imgs')],
							exclude: /node_moudels/
						},
						
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'media/[name].[hash:8].[ext]'
								}
							},
							include: [path.resolve(__dirname, '../src/assets/media')],
							exclude: /node_moudels/
						},
						
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'fonts/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			'vue$':'vue/dist/vue.runtime.esm.js',
			'@':path.resolve(__dirname,'../src'),
			'assets': path.resolve('../src/assets'),
			'components': path.resolve('../src/components')
		},
		extensions:['*','.js','.json','.vue']
	},
	plugins: [
	  new HappyPack({
	  	id: 'happyBabelJS',
	  	loaders: [
	  		{
	  			loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						cacheDirectory: true
					}
	  		}
	  	],
	  	threadPool: HappyThreadPool
	  }),
		new vueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
		})
	]
}