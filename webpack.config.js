const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: './src',
		compress: true,
		port: 8080,
	},
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname, 'src/main.jsx'),
	],
	module: {
		loaders: [
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=public/fonts/[name].[ext]' },
      { test: /\.css$/, include: path.resolve(__dirname, 'src'), loader: 'style-loader!css-loader' },
      { test: /\.(js|jsx)$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
	output: {
		filename: './src/bundle.js',
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json'],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
	],
};
