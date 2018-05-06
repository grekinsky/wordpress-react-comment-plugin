const path = require('path');

module.exports = {
    // default build enviroment
    mode: 'development',

    // setup each file entry as input
    entry: {
        'app': path.resolve(__dirname, 'src/app.js'),
    },

    // setup route and file name for the output
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },

    // allow import to search for these extensions
    resolve: {
        extensions: [".js", ".jsx"],
    },

    module: {
        // setup rules, in this case is just babel
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
