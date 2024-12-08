const path = require("path");

module.exports = {
    entry: "./frontend/script.js", 
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "frontend/dist"),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "frontend"),
        },
        compress: true,
        port: 9000,
    },
    mode: "development",
};
