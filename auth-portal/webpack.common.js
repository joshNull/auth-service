const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-object-rest-spread"
                    ]
                },
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./public/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
}