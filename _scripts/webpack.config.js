const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = path.join(__dirname, '../');
const buildDirectory = path.join(projectRoot, 'src/frontend');
const distDirectory = path.join(projectRoot, 'src/dist');

module.exports = {
    entry: {
        main: [
            path.join(buildDirectory, 'main.js'),
            path.join(buildDirectory, 'scss/style.scss')
        ]
    },
    output: {
        path: distDirectory,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    failOnError: true,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            require.resolve('babel-preset-env'),
                            require.resolve('babel-preset-react')
                        ],
                        plugins: [
                            [require.resolve('babel-plugin-transform-react-jsx'), {pragma: 'h'}]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
