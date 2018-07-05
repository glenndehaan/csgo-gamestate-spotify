const path = require('path');

const projectRoot = path.join(__dirname, '../');
const buildDirectory = path.join(projectRoot, 'src/frontend');
const distDirectory = path.join(projectRoot, 'src/dist');

module.exports = {
    entry: {
        main: [path.join(buildDirectory, 'main.js')],
    },
    output: {
        path: distDirectory,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: [
                            require.resolve('babel-preset-env'),
                            require.resolve('babel-preset-react')
                        ],
                        plugins: [
                            [require.resolve("babel-plugin-transform-react-jsx"), { "pragma": "h" }]
                        ]
                    }
                }
            }
        ]
    }
};
