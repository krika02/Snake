const path = require('path');

module.exports = {
	entry: './src/main.jsx',
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
};
