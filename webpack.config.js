const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const envSet = require('./env');

module.exports = (env, argv) => {

	let envMode = argv.mode;
	if (argv.isuat === 'true') {
		envMode = 'uat';
	}
	// 创建node环境
	const {raw, stringified} = envSet(envMode);
	
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
			extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.less', '.scss', '.css'],
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
		optimization: isDev ? {} : {
			minimizer: [
				new OptimizeCssAssetsPlugin({
					// css压缩
					cssProcessor: require('cssnano'),
					cssProcessorPluginOptions: {
						preset: ['default', { discardComments: { removeAll: true } }]
					},
					canPrint: true
				}),
				new TerserPlugin()
			]
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
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
							loader: 'style-loader'
						},
						{
							oneOf: [
								{
									include: [
										path.resolve(__dirname, 'node_modules'),
										path.resolve(__dirname, 'src/style')
									],
									loader: 'css-loader',
									options: {
										sourceMap: !isPro
									}
								},
								{
									loader: 'css-loader',
									options: {
										modules: true,
										sourceMap: !isPro,
										importLoaders: 1,
										minimize: true
									}
								}
							]
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: !isPro
							}
						},
						{
							test: /\.(sass|scss)$/,
							loader: 'sass-loader',
							options: {
								sourceMap: !isPro,
								data: '@import "variables.scss";',
								includePaths: [path.resolve(__dirname, 'src/style')]
							}
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
			new CopyWebpackPlugin([
				{ from: './assets', to: './assets' }
			]),
			new WebpackManifestPlugin()
		]
			.concat(argv.report ? [new BundleAnalyzerPlugin()] : []),
		devtool: isPro ? false : 'source-map',
		devServer: {
			port: process.env.PORT || 3000,
			host: 'localhost',
			publicPath: '/',
			contentBase: './src',
			historyApiFallback: true,
			open: false
		}
	};
};