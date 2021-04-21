// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ForkTsCheckerWebpackPluginConfig = new ForkTsCheckerWebpackPlugin();

const ReactWebpackPluginConfig = new ReactRefreshWebpackPlugin();

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dist/index.html',
});

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const CompressionPluginConfig = new CompressionPlugin();

const HardSourceWebpackPluginConfig = new HardSourceWebpackPlugin();

const PreloadWebpackPluginConfig = new PreloadWebpackPlugin({
  rel: 'preload',
  as: 'font',
  include: 'allAssets',
  fileWhitelist: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
});

const CopyWebpackPluginConfig = new CopyPlugin({
  patterns: [
    { from: './src/assets/fonts/roboto.woff2', to: './' },
    { from: './src/assets/fonts/roboto-light.woff2', to: './' },
    { from: './public/favicon.ico', to: './' },
  ],
});

module.exports = {
  entry: './src/App.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff2|ttf|woff|ico)$/,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    MiniCssExtractPluginConfig,
    HTMLWebpackPluginConfig,
    PreloadWebpackPluginConfig,
    CompressionPluginConfig,
<<<<<<< Updated upstream
    new CopyPlugin({
      patterns: [
        { from: './src/assets/fonts/roboto.woff2', to: './' },
        { from: './src/assets/fonts/roboto-light.woff2', to: './' },
        { from: './dist/favicon.ico', to: './' },
        { from: './dist/index.html', to: './' },
      ],
    }),
    // new BundleAnalyzerPlugin(),
=======
    CopyWebpackPluginConfig,
    ReactWebpackPluginConfig,
    ForkTsCheckerWebpackPluginConfig,
    HardSourceWebpackPluginConfig,
>>>>>>> Stashed changes
  ],
};
