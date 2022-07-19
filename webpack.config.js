const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const envSet = require('./env');

module.exports = (env, argv) => {
	let envMode = argv.mode;
	if (argv.isuat === 'true') {
		envMode = 'uat';
	}
	// 创建node环境
	const { raw, stringified } = envSet(envMode);

	// webpack环境
	const isPro = envMode === 'production';
	const isDev = envMode === 'development';
	// const isUat = envMode === 'uat';

	return {
		context: path.resolve(__dirname, 'src'),
		entry: {
			index: './index.ts'
		},
		output: {
			library: 'TStart',
			libraryTarget: 'umd',
			libraryExport: 'default',
			path: path.resolve(__dirname, 'dist'),
			publicPath: process.env.PUBLIC_PATH,
			filename: isPro ? 'bundle.[contenthash:6].js' : 'bundle.js'
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.jsx',
				'.js',
				'.json',
				'.less',
				'.scss',
				'.css'
			],
			modules: [
				path.resolve(__dirname, 'src/lib'),
				path.resolve(__dirname, 'node_modules'),
				'node_modules'
			],
			alias: {
				components: path.resolve(__dirname, 'src/components'), // used for tests
				style: path.resolve(__dirname, 'src/style'),
				core: path.resolve(__dirname, 'src/core'),
				'~': path.resolve(__dirname, 'src')
			}
		},
		optimization: isDev
			? {}
			: {
				minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
			},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.(jsx|js)?$/,
					exclude: path.resolve(__dirname, 'src'),
					enforce: 'pre',
					use: 'source-map-loader'
				},
				{
					test: /\.(jsx|js)?$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				},
				{
					test: /\.(jsx|js)?$/,
					include: /node_modules(\/|\\)(lru-*)/,
					use: 'babel-loader'
				},
				{
					test: /\.(css|scss|sass)$/,
					rules: [
						{
							test: /\.s[ac]ss$/i,
							use: [
								MiniCssExtractPlugin.loader, // extract css into files
								{
									loader: 'css-loader',
									options: {
										modules: {
											localIdentName:
                                                '[path][local]-[hash:base64:5]'
										},
										sourceMap: !isPro,
										importLoaders: 1
									}
								}, // convert css to js string css
								'sass-loader' // convert sass to css
							]
						}
					]
				},
				{
					test: /\.json$/,
					loader: 'json-loader',
					type: 'javascript/auto'
				},
				{
					test: /\.(png|jpg|gif)$/i,
					dependency: { not: ['url'] },
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192
							}
						}
					],
					type: 'javascript/auto'
				}
			]
		},
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new HtmlWebpackPlugin({
				template: './index.ejs',
				minify: { collapseWhitespace: true },
				...raw
			}),
			new webpack.DefinePlugin(stringified),
			new CopyWebpackPlugin({
				patterns: [{ from: './assets', to: './assets' }]
			}),
			new WebpackManifestPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name][contenthash].css',
				chunkFilename: '[id].css',
				ignoreOrder: false
			})
		].concat(argv.report ? [new BundleAnalyzerPlugin()] : []),
		devtool: isPro ? false : 'source-map',

		devServer: {
			static: {
				directory: path.join(__dirname, 'public')
			},
			compress: true,
			port: 3000,
			client: {
				overlay: {
					errors: true,
					warnings: false
				}
			}
		}
	};
};
