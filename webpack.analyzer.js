const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const webpackConfig = require('./webpack.config.js')

module.exports = (env, argv) => {
  const config = webpackConfig(env, argv)

  // Add bundle analyzer plugin
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'bundle-report.html',
    }),
  )

  return config
}
