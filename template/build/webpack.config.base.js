const paths = require('./paths')

module.exports = {
  entry: {
    app: [
      paths.appIndexJs,
    ],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: paths.appDist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx'],
    modules: [
      paths.appSrc,
      'node_modules',
    ],
    alias: {
      '@': paths.appSrc,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/assets/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                ['env', {
                  targets: {
                    browsers: ['chrome > 50', 'ios > 6', 'android > 4.4'],
                  },
                  modules: false,
                }],
                'react',
                'stage-2',
              ],
              plugins: [
                'transform-decorators-legacy',
                'react-hot-loader/babel',
              ],
              cacheDirectory: true,
            },
            // options: {
            //   presets: [
            //     ['@babel/preset-env', {
            //       targets: {
            //         browsers: ['chrome > 50', 'ios > 6', 'android > 4.4'],
            //       },
            //       modules: false,
            //     }],
            //     '@babel/preset-react',
            //     '@babel/preset-stage-2',
            //   ],
            //   plugins: ['transform-decorators-legacy'],
            //   cacheDirectory: true,
            // },
          },
        ],
      },
    ],
  },
}
