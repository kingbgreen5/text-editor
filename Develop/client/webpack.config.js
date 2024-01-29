const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
          new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
         }),
         new MiniCssExtractPlugin(),
 new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    }), 
    ],

    module: {
      rules: [
        {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
     }}} ]
    }


  };
};


// new MiniCssExtractPlugin(),

//         new WorkboxPlugin.GenerateSW({ 

//           exclude: [/\.(?:png|jpg|jpeg|svg)$/],
//       // Define runtime caching rules (this is after the build)
//       runtimeCaching: [{
//         // Based on the request URL make Regex to ADD certain files to cache
//         urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
//         // Apply a cache-first strategy one of: [CacheFirst (img/css/js/html in code) | NetworkFirst(only after it comes from server)]
//         handler: 'CacheFirst',
//         options: {
//           // this is a required field so pick something that makes sense
//           cacheName: 'images',
//           // number of things allowed in the cache
//           expiration: {
//             maxEntries: 2,
//           },
//         },
//       }],
//     })