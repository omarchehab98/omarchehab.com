const {join} = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const setup = require('./setup');

const dist = join(__dirname, '../dist');
const exclude = /(node_modules|bower_components)/;

module.exports = env => {
	const isProd = env && env.production;

	return {
		entry: {
			app: './src/index.js',
		},
		output: {
			path: dist,
			filename: '[name].[hash].js',
			publicPath: '/'
		},
		resolve: {
			alias: {
			}
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: exclude,
				loader: 'babel-loader'
			}, {
				test: /\.scss$/,
				loader: isProd ? ExtractText.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!postcss-loader!sass-loader'
				}) : 'style-loader!css-loader!postcss-loader!sass-loader'
			}]
		},
		plugins: setup(isProd),
		devtool: !isProd && 'eval',
		devServer: {
			contentBase: dist,
			port: process.env.PORT || 3000,
			historyApiFallback: true,
			compress: isProd,
			inline: !isProd,
			hot: !isProd
		}
	};
};
