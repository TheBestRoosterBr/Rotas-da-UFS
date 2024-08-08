import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: 'development',
    entry: 'src/index.tsx',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.[fullhash].js',

        clean: {
            dry: true,
        },
    },

    resolve: {
        modules: [ __dirname, 'src', 'node_modules' ],
        extensions: [ '.*', '.js', '.jsx', '.ts', '.tsx' ],

        roots: [
            __dirname,
            path.resolve(__dirname, 'static')
        ]
    },

    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,

                        presets: [
                            [
                                "@babel/preset-env",
                            ],

                            [
                                "@babel/preset-react",
                                {
                                    runtime: "automatic"
                                },
                            ],

                            [
                                "@babel/preset-typescript",
                            ],
                        ],
                    },
                },
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },

                    {
                        loader: 'css-loader',
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    tailwindcss: {},
                                    autoprefixer: {},
                                },
                            },
                        },
                    },
                ],
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
            }
        ],
    },

    devServer: {
        compress: true,
        port: 3000,

        hot: 'only',
        liveReload: true,

        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },

        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:5000',
                secure: true,
            },
        ],

        static: {
            directory: path.resolve(__dirname, 'static'),
            publicPath: '/public',
        },

        watchFiles: {
            paths: [
                'src/**/*',
                'static/**/*',
            ],
        },

        historyApiFallback: {
            rewrites: [],
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Rotas UFS',
            template: 'src/index.html',
        })
    ],

};

export default config;

