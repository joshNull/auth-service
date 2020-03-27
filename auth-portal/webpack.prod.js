const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const webpackCommon = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackCommon, {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index[contentHash].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}), // minify JS
            new OptimizeCssAssetsPlugin({})], // minify CSS
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][contentHash].css'
        }),
        new CleanWebpackPlugin()

    ]
})