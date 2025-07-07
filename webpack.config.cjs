const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = (env, argv) => {
  // Use webpack mode as the source of truth for environment
  const mode = argv.mode || process.env.NODE_ENV || 'development';
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  console.log(`🔧 Building for: ${mode}`);

  // Create exclude function for cleaner webpack config
  const getExcludePatterns = () => {
    if (isProduction) {
      return function(modulePath) {
        // Always exclude node_modules
        if (/node_modules/.test(modulePath)) return true;
        // Exclude test files in production
        if (/\.(test|spec)\.(js|jsx|ts|tsx)$/.test(modulePath)) return true;
        // Exclude mocks in production
        if (/\/mocks\//.test(modulePath)) return true;
        // Exclude MSW service worker
        if (/mockServiceWorker\.js$/.test(modulePath)) return true;
        return false;
      };
    }
    return /node_modules/;
  };

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
      chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
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
    devServer: isDevelopment ? {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: true,
      compress: true,
    } : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: getExcludePatterns(),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
            }
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
            filename: isProduction ? 'assets/[name].[contenthash][ext]' : 'assets/[name][ext]'
          }
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
        templateParameters: {
          // SECURE: Only HTTPS in production
          CSP_CONNECT_SRC: isProduction
            ? "'self' http://localhost:* https:"
            : "'self' http://localhost:* http: https:",
          NODE_ENV: process.env.NODE_ENV || mode,
        },
        minify: isProduction ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        } : false,
      }),

      new DefinePlugin({
        'process.env.REACT_APP_API_URL': JSON.stringify(
          process.env.REACT_APP_API_URL ||
          (isProduction ? 'http://localhost:4000' : 'http://localhost:4000')
        ),
        'process.env.REACT_APP_APP_VERSION': JSON.stringify(
          process.env.REACT_APP_APP_VERSION || '1.0.0'
        ),
        'process.env.FRONTEND_KEY': JSON.stringify(
          process.env.FRONTEND_KEY || 'safehouse-frontend'
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
                '**/index.html', // Handled by HtmlWebpackPlugin
                // Exclude MSW service worker from production builds
                ...(isProduction ? ['**/mockServiceWorker.js'] : [])
              ],
            },
            // Add file size optimization for images
            transform: isProduction ? {
              transformer(content, path) {
                // Only transform if it's a large PNG file
                if (path.endsWith('.png') && content.length > 100000) {
                  console.warn(`⚠️  Large image detected: ${path} (${(content.length / 1024).toFixed(1)}KB)`);
                  console.warn(`   Consider optimizing this image for better performance.`);
                }
                return content;
              },
            } : undefined,
          },
        ],
      }),
    ],

    // Better optimization settings
    optimization: {
      minimize: isProduction,
      // Improved code splitting for production
      splitChunks: isProduction ? {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000, // Split chunks that are too large
        cacheGroups: {
          // Vendor dependencies (React, etc.)
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            maxSize: 300000, // Split large vendor bundles
          },
          // Common code used across components
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'all',
            maxSize: 200000,
            reuseExistingChunk: true,
          },
          // React-specific chunk
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
          },
          // UI libraries chunk
          ui: {
            test: /[\\/]node_modules[\\/](react-bootstrap|@emotion)[\\/]/,
            name: 'ui',
            priority: 15,
            chunks: 'all',
          },
        },
      } : false,
      // Remove unused code
      usedExports: true,
      sideEffects: false,
    },

    // Performance hints - more realistic limits for React apps
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 500000, // 500KB for entry point (React apps are typically 400-600KB)
      maxAssetSize: 300000, // 300KB for individual assets
      assetFilter: function(assetFilename) {
        // Don't apply size limits to source maps, images, and fonts
        return !assetFilename.match(/\.(map|png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/);
      },
    },
  };
};