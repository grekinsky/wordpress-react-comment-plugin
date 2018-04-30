const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        'app': path.resolve(__dirname, 'src/app.js'),
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },

    resolve: {
        extensions: [".js", ".jsx"],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
