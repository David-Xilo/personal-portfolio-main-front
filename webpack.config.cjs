const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {DefinePlugin} = require('webpack')

module.exports = (env, argv) => {
  const mode = argv.mode || 'development'
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'

  // console.log(`🔧 Building for: ${mode}`);

  // Create exclude function for cleaner webpack config
  const getExcludePatterns = () => {
    if (isProduction) {
      return function (modulePath) {
        // Always exclude node_modules
        if (/node_modules/.test(modulePath)) return true
        // Exclude test files in production
        if (/\.(test|spec)\.(js|jsx|ts|tsx)$/.test(modulePath)) return true
        // Exclude mocks in production
        if (/\/mocks\//.test(modulePath)) return true
        // Exclude MSW service worker
        return /mockServiceWorker\.js$/.test(modulePath)
      }
    }
    return /node_modules/
  }

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
      chunkFilename: isProduction
        ? '[name].[contenthash].chunk.js'
        : '[name].chunk.js',
      publicPath: '/',
      clean: true,
    },
    mode: mode,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        styles: path.resolve(__dirname, 'src/styles/'),
      },
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: isDevelopment
      ? {
          static: {
            directory: path.resolve(__dirname, 'public'),
          },
          historyApiFallback: true,
          port: 3000,
          open: true,
          hot: true,
          compress: true,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: getExcludePatterns(),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {modules: false}],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: isProduction
              ? 'assets/[name].[contenthash][ext]'
              : 'assets/[name][ext]',
          },
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/assets/safehouse.png',
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeEmptyAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
      }),

      new DefinePlugin({
        'process.env.REACT_APP_API_URL': JSON.stringify(
          process.env.REACT_APP_API_URL ||
            (isProduction
              ? 'https://your-production-api.com'
              : 'http://localhost:4000'),
        ),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '',
            globOptions: {
              ignore: [
                '**/index.html',
                // Exclude MSW service worker from production builds
                ...(isProduction ? ['**/mockServiceWorker.js'] : []),
              ],
            },
          },
        ],
      }),
    ],

    // Simple optimization settings
    optimization: {
      minimize: isProduction,
      // Basic code splitting for production
      splitChunks: isProduction
        ? {
            chunks: 'all',
            cacheGroups: {
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: -10,
                chunks: 'all',
              },
            },
          }
        : false,
    },

    // Performance hints
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 300000,
      maxAssetSize: 300000,
    },
  }
}
