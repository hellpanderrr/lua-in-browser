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
        filename: "../../dist/wasmoon.js",
        library: {
            name: 'lb', // the name of the global variable
            type: 'var',
        },
    },
    experiments: {
        topLevelAwait: true,
    },
}