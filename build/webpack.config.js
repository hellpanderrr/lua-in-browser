const path = require('path')
module.exports = {
    entry: './index.js', // Here is your entry file
    mode: 'production',
    resolve: {
        fallback: {
            path: false,
            fs: false,
            child_process: false,
            crypto: false,
            url: false,
            module: false,
        },
    },
    output: {
        filename: "../dist/wasmoon.js",
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'lb',
            type: 'var',
        },
    },
    experiments: {
        topLevelAwait: true,
    },
}