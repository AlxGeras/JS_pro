const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", './src/public/js/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "index.js",
        assetModuleFilename: 'assets/[name][ext]'
    },
    target: 'web',
    devtool: "source-map",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.ttf|eot|woff|woff2|svg|png|jpe?g$/,
                exclude: /img/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/shopping_cart.html',
            filename: 'shopping_cart.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/catalog.html',
            filename: 'catalog.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/product.html',
            filename: 'product.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/registration.html',
            filename: 'registration.html',
            excludeChunks: ['server']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/public/img',
                    to: 'img'
                }
            ],
        }), 
        new ImageminPlugin({
            test: /\.(png|jpe?g|svg)$/i,
            excludeChunks: ['webfonts']
        }),
    ]
};
