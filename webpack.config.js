const path = require('path');
const NODE_MODULES_DIR = /node_modules/;
const destinationFolder = '/build';

const webpackConfig = {
    mode: 'development',
    entry: {
        backend: './src/index.ts'
    },
    output: {
        path: path.join(__dirname, destinationFolder),
        filename: 'index.js'
    },
    target: 'node',
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.js$/, loader: 'babel-loader'},
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: NODE_MODULES_DIR,
            }
        ]
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    }
};

module.exports = webpackConfig;
