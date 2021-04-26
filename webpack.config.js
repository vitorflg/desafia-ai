const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dist/index.html',
});
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});
const CompressionPluginConfig = new CompressionPlugin();

const PATHS = {
    src: path.join(__dirname, 'src'),
  };

module.exports = {
  entry: './src/App.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    MiniCssExtractPluginConfig,
    new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
          }),
    HTMLWebpackPluginConfig,
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'font',
      include: 'allAssets',
      fileWhitelist: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
    }),
    CompressionPluginConfig,
    new CopyPlugin({
      patterns: [
        { from: './src/assets/fonts/roboto.woff2', to: './' },
        { from: './src/assets/fonts/roboto-light.woff2', to: './' },
        { from: './dist/favicon.ico', to: './' },
        { from: './dist/index.html', to: './' },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
