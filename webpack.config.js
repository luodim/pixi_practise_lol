const PROD = process.argv.includes('-p')

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const sassFunctions = require('lib/scss/functions')

module.exports = {
  context: `${__dirname}/src`,
  resolve: {
    modules: ['src', 'node_modules'],
  },
  entry: {
    app: './app.js',
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: `${process.env.PUBLIC || ''}`,
    // chunkhash not working in dev-server
    filename: PROD ? '[name]-[chunkhash:8].js' : '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /node_modules/,
      exclude: /node_modules\/(?!lib|bootstrap)/,
      // use: ['babel-loader'],
      use: {
        loader: 'babel-loader',
        options: {
          // ignore babelrc in node_modules
          babelrc: false,
          presets: [ ['env', { modules: false }] ],
          plugins: [
            'transform-runtime',
            'transform-object-rest-spread',
            ['transform-class-properties', { spec: true }],
            // 'transform-functional-jsx',
          ],
        },
      },
    }, {
      test: /\.s?css$/,
      use: [{
        // css extract do not support hot reload
        loader: PROD ? MiniCssExtractPlugin.loader : 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')(),
          ],
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          functions: sassFunctions,
        },
      }],
    }, {
      test: /\.(png|jpg|gif|mp4|mp3|ttf|woff)$/,
      exclude: /assets\/spine\//,
      loader: 'file-loader',
      options: {
        name: '[name]-[hash:8].[ext]',
      },
    }, {
      // TODO hash file
      test: /assets\/spine\//,
      type: "javascript/auto",
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    }, {
      // for inline svg in template
      test: /\.svg$/,
      use: [{
        loader: 'raw-loader'
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeXMLNS: true },
            { removeTitle: true },
            // TODO no need this
            // @see https://github.com/svg/svgo/pull/798
            { removeDesc: { removeAny: true } },
            { transformsWithOnePath: true },
            // { removeAttrs: { attrs: 'fill-rule' } },
            // { removeDimensions: true },
            // addClassesToSVGElement
          ],
        },
      }],
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?Promise=babel-runtime/core-js/promise,self=>{fetch:window.fetch}!exports-loader?self.fetch!whatwg-fetch',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new HTMLPlugin({
      template: 'index.html.ejs',
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: !PROD ? false : {
        //removeComments: true,
      },
    }),
    // new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
    // new (require('webpack-jarvis'))(),
  ],
}
