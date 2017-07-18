const BabiliPlugin = require('babili-webpack-plugin');

exports.minifyJavaScript = () => ({
	plugins: [
		new BabiliPlugin(),
	],
});
