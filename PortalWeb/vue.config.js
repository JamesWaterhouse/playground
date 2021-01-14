const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	css: {
		extract: true,
	},
	filenameHashing: false,
	productionSourceMap: false,
	configureWebpack: {
		optimization: {
			splitChunks: false,
		},
		devtool: false,
		plugins: [
			new HtmlWebpackPlugin(
				{
					template: 'public/index.html', // Input file
					filename: 'index.html', // Output file
					inject: false,
				}
			),
		],
		entry: {
			default: './src/themes/default.scss',
		}
	},
	chainWebpack: config => {
		config.module
		  .rule('images')
			.use('url-loader')
			  .loader('url-loader')
			  .tap(options => Object.assign(options, { limit: 1110240 }))
	  }
}
