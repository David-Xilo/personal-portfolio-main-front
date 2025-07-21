const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = (env, argv) => {
  const nodeEnv = process.env.NODE_ENV || 'local';
  const webpackMode = argv.mode || getWebpackMode(nodeEnv);

  const isProduction = nodeEnv === 'production';
  const isDevelopment = nodeEnv === 'development' || nodeEnv === 'local';
  const isLocal = nodeEnv === 'local';

  function getWebpackMode(nodeEnv) {
    switch (nodeEnv) {
      case 'production': return 'production';
      case 'development':
      case 'local':
      default: return 'development';
    }
  }

  const getApiUrl = () => {
    if (!process.env.REACT_APP_API_URL) {
      throw new Error('REACT_APP_API_URL environment variable is not set. Please configure it to proceed.');
    }
    return process.env.REACT_APP_API_URL;
  };

  const getExcludePatterns = () => {
    if (isProduction) {
      return function(modulePath) {
        if (/node_modules/.test(modulePath)) return true;
        if (/\.(test|spec)\.(js|jsx|ts|tsx)$/.test(modulePath)) return true;
        if (/\/mocks\//.test(modulePath)) return true;
        return /mockServiceWorker\.js$/.test(modulePath);
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
    mode: webpackMode,
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
      port: isLocal ? 3000 : 80,
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
          NODE_ENV: nodeEnv,
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
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        'process.env.REACT_APP_API_URL': JSON.stringify(getApiUrl()),
        'process.env.REACT_APP_APP_VERSION': JSON.stringify(
          process.env.REACT_APP_APP_VERSION || '0.0.1'
        ),
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '',
            globOptions: {
              ignore: [
                '**/index.html',
                // Exclude MSW from production and development (but keep in local)
                ...(nodeEnv !== 'local' ? ['**/mockServiceWorker.js'] : [])
              ],
            },
            transform: isProduction ? {
              transformer(content, path) {
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

    optimization: {
      minimize: isProduction,
      splitChunks: isProduction ? {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            maxSize: 300000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'all',
            maxSize: 200000,
            reuseExistingChunk: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
          },
          ui: {
            test: /[\\/]node_modules[\\/](react-bootstrap|@emotion)[\\/]/,
            name: 'ui',
            priority: 15,
            chunks: 'all',
          },
        },
      } : false,
      usedExports: true,
      sideEffects: false,
    },

    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 500000,
      maxAssetSize: 300000,
    },
  };
};