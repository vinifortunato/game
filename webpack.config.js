const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
	const plugins = [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin()
	];

	return {
		entry: {
			app: './src/index.js',
		},
		devtool: 'source-map',
		devServer: {
			static: './dist',
			hot: true,
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		},
		resolve: {
			extensions: ['.js', '.ts', '.css']
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: [/node_modules/],
					loader: 'ts-loader'
				},
				{
					test: /\/(ts|js)x$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
					]
				}
			]
		},
		plugins,
	};
};
