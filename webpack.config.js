module.exports = {
    mode: 'development',
    entry: './app/main.js',
    output: {
        filename: 'bundle.js',
        publicPath: 'xuni'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            [
                                "import", {
                                    "libraryName": "antd",
                                    "style": false
                                }
                            ],
                            [
                                "@babel/plugin-proposal-decorators",{
                                    "legacy": true
                                }
                            ]
                        ]
                    }
                },
            }
        ],
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.2.250:3000",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
}