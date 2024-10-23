const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/appInstaller.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Advanced Text Editor'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Advanced Text Editor',
        short_name: 'ATE',
        description: 'Edit text with JavaScript syntax highlighting',
        background_color: '#31a9e1',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/icon_96x96.png'),
            sizes: [96],
            destination: path.join('assets', 'icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/images', to: 'assets/images' },
          { from: 'src/favicon.ico', to: 'favicon.ico' },
          { from: 'src/manifest.json', to: 'manifest.json' },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
    devServer: {
      hot: true,
      liveReload: false,
      open: true,
      host: 'localhost',
      port: 8080,
      static: {
        directory: path.join(__dirname, 'dist'),
        watch: true,
      },
      client: {
        webSocketURL: 'auto://0.0.0.0:0/ws',
      },
      https: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
    },
  };
};