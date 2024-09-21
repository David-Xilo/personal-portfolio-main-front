const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.[contenthash].js', // Output bundle name with content hashing
    publicPath: '/', // Necessary for routing
  },
  mode: 'development', // Use 'production' for production builds
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these extensions
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      // Add other aliases as needed
    },
  },
  devtool: 'source-map', // Generate source maps
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public/assets'),
    },
    historyApiFallback: true, // Enable for routing
    port: 3000, // Development server port
    open: true, // Open browser on server start
    hot: true, // Enable hot module replacement
  },
  module: {
    rules: [
      // JavaScript and TypeScript files
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Images and fonts
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // Source maps
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean output directory before each build
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/dnd-goku-hair-goku-ssj.png',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'manifest.json', to: '' }, // Copy manifest.json to the output directory
    //     { from: 'src/assets', to: 'assets' }, // Copy assets to 'assets' folder in the output directory
    //   ],
    // }),
  ],
};
