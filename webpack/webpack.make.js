'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const cssNano = require('cssnano');

const PROJECT_ROOT = path.join(__dirname, '..');;
const WEBPACK_DIR = path.join(PROJECT_ROOT, 'webpack');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const SOURCES_DIR = path.join(PROJECT_ROOT, 'src');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const BUNDLE_DIR = path.join(DIST_DIR, 'app');
const BUNDLE_URL = '/app/';
const MANIFEST_FILE = path.join(DIST_DIR, 'webpack-manifest.json');
const MANIFEST_FILE_DEV = path.join(DIST_DIR, 'webpack-dev-server-manifest.json');

const DEV_SERVER_PORT = 8080;
const DEV_SERVER_HTTPS = false;

const BABELRC_FAILOVER = path.resolve(WEBPACK_DIR, '.babelrc');
const ESLINTRC_FAILOVER = path.resolve(WEBPACK_DIR, '.eslintrc');
const STYLELINTRC_FAILOVER = path.resolve(WEBPACK_DIR, '.stylelintrc');

function makeConfig(options) {
  const isProd = options.production;
  const isRunningDevServer = !isProd;

  const babelRcPath = BABELRC_FAILOVER;
  const eslintRcPath = ESLINTRC_FAILOVER;
  const stylelintRcPath = STYLELINTRC_FAILOVER;
  const manifestFilePath = path.resolve(PROJECT_ROOT, !isRunningDevServer ? MANIFEST_FILE : MANIFEST_FILE_DEV);
  const bundlePath = `${BUNDLE_URL.startsWith('/') ? '' : '/'}${BUNDLE_URL}${BUNDLE_URL.endsWith('/') ? '' : '/'}`;
  const generateSourcemaps = !isProd && options.sourceMaps !== false;
  const baseFileName = isProd ? '[name].[hash:7]' : '[name]';
  let publicPath = bundlePath;

  if (isRunningDevServer) {
    const protocol = process.argv.includes('--https') ? 'https' : 'http';
    publicPath = `${protocol}://localhost:${DEV_SERVER_PORT}${bundlePath}`;
  }

  const imgLoaders = [
    { loader: 'url-loader', options: {
      name: 'images/[hash].[ext]',
      limit: isProd ? 10000 : 1
    }},
    { loader: 'img-loader',
      options: {
        enabled: isProd,
        gifsicle: { interlaced: false },
        mozjpeg: {
          progressive: true,
          arithmetic: false
        },
        optipng: false, // {optimizationLevel: 5},
        pngquant: {
          floyd: 0.5,
          speed: 2
        },
        svgo: {
          floatPrecision: 3,
          plugins: [
            { cleanupAttrs: true },
            { cleanupEnableBackground: true },
            { cleanupIDs: true },
            { cleanupListOfValues: false },
            { cleanupNumericValues: true },
            { collapseGroups: true },
            { convertColors: true },
            { convertPathData: true },
            { convertShapeToPath: true },
            { convertStyleToAttrs: true },
            { convertTransform: true },
            { mergePaths: true },
            { moveElemsAttrsToGroup: true },
            { moveGroupAttrsToElems: true },
            { removeComments: true },
            { removeDesc: true },
            { removeDimensions: false },
            { removeDoctype: true },
            { removeEditorsNSData: true },
            { removeEmptyAttrs: true },
            { removeEmptyContainers: true },
            { removeEmptyText: true },
            { removeHiddenElems: true },
            { removeMetadata: true },
            { removeNonInheritableGroupAttrs: true },
            { removeRasterImages: false },
            { removeTitle: false },
            { removeUnknownsAndDefaults: true },
            { removeUnusedNS: true },
            { removeUselessDefs: true },
            { removeUselessStrokeAndFill: true },
            { removeViewBox: false },
            { removeXMLProcInst: true },
            { sortAttrs: false },
            { transformsWithOnePath: false }
          ]
        }
      }
    }
  ];

  const cssLoaders = [
    { loader: 'style-loader',   options: { sourceMap: generateSourcemaps } },
    { loader: 'css-loader',     options: { sourceMap: generateSourcemaps } },
    { loader: 'postcss-loader', options: {
      sourceMap: generateSourcemaps,
      autoprefixer: {
        browsers: '>= 5%',
        // browsers: [
        //     'ie >= 9',
        //     'ie_mob >= 10',
        //     'ff >= 30',
        //     'chrome >= 34',
        //     'safari >= 7',
        //     'opera >= 23',
        //     'ios >= 7',
        //     'android >= 4.1',
        //     'bb >= 10'
        // ]
      },
      cssnano: false // moved to OptimizeCSSAssetsPlugin
    } },
  ];

  if (isProd) {
    cssLoaders.unshift(ExtractTextPlugin.loader({ remove: true, omit: 1 /*, disable: isProd ? false: true*/ }));
  }

  const stats = "errors-only";

  return Object.assign({
    context: SOURCES_DIR,

    entry: {
      app: 'index.jsx'
    },

    output: {
      filename: `${baseFileName}.js`,
      chunkFilename: `${baseFileName}.chunk.js`,
      path: BUNDLE_DIR,
      publicPath: publicPath
    },

    module: {
      rules: [].concat(options.lint === false ? [] : [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: "pre",
          options: {
            configFile: eslintRcPath,
            cache: true,
            fix: true
          }
        },
      ]).concat([
        {
          test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
          options: {
            'extends': babelRcPath,
            cacheDirectory: true,
            presets: [ require.resolve('babel-preset-react') ]
          }
        },
        // styles
        { test: /\.css$/i, use: cssLoaders },
        { test: /\.s[ac]ss$/i, loaders: cssLoaders.concat([{ loader: 'sass-loader', options: { sourceMap: generateSourcemaps } }]) },

        // images
        { test: /\.(jpe?g|png|gif)(|\?[^!]*?)$/i, loaders: imgLoaders },
        { test: /\.(svg)(|\?[^!]*?)$/i, exclude: /[\/\\](?:web|)fonts?[\/\\]/i, loaders: imgLoaders },

        // fonts
        { test: /\.(svg)(|\?[^!]*?)$/i, include: /[\/\\](?:web|)fonts?[\/\\]/i, loader: 'file-loader?name=fonts/[name].[hash:7].[ext]' },
        { test: /(?:\.(woff|woff2|eot|ttf|otf))(|\?[^!]*?)$/i, loader: 'file-loader?name=fonts/[name].[hash:7].[ext]' },
        // { test: /\.font\.json$/i, loader: 'font?format[]=truetype&format[]=woff&format[]=embedded-opentype' },

        // data formats, pre-compiled templates and etc
        { test: /\.json$/i, loader: 'json-loader' },
        { test: /\.ya?ml/i, loader: 'json-loader!yaml-loader' },
      ])
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss'],
      modules: [
        SOURCES_DIR,
        path.join(PROJECT_ROOT, "node_modules")
      ].concat(isRunningDevServer ? [
        path.join(WEBPACK_DIR, "node_modules")
      ] : []),
    },

    resolveLoader: {
      modules: [
        path.join(WEBPACK_DIR, "node_modules")
      ]
    },

    performance: {
      hints: isProd ? 'warning' : false, // webpack-dev-tools takes over 200kb by iteself, so warning is guaranteed
      maxAssetSize: 200000,
      maxEntrypointSize: 400000,
    },

    stats: stats,

    devtool: generateSourcemaps ? 'source-map' : false,

    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      https: DEV_SERVER_HTTPS,
      port: DEV_SERVER_PORT,
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentBase: DIST_DIR,
      compress: true,
      hot: true,
      overlay: true,
      // noInfo: true,
      stats: stats,
      historyApiFallback: true
    },

    plugins: ((plugins) => {
      plugins = [
        new CleanWebpackPlugin(
          [DIST_DIR],
          {
            root: __dirname,
            verbose: true,
            watch: false,
            allowExternal: true
          }
        ),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
        }),
        new HtmlWebpackPlugin({
          filename: path.join('../', options.HtmlWebpackPlugin.filename || 'index.html' ),
          template: path.join(SOURCES_DIR, 'templates', 'index.html'),
          inject: 'body',
          title: options.HtmlWebpackPlugin.title,
          alwaysWriteToDisk: true
        }),
        new WriteFilePlugin()
      ];

      if (isProd) {
        plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
        plugins.push(new OptimizeCSSAssetsPlugin({
          cssProcessor: cssNano,
          cssProcessorOptions: {
            discardComments: {removeAll: true }
          }
        }));
        plugins.push(new ExtractTextPlugin(`${baseFileName}.css`));
        plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
      }

      if (isRunningDevServer) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.NamedModulesPlugin());
      }

      if(options.lint) {
        plugins.push(new StyleLintPlugin({
          configFile: stylelintRcPath,
        }));
      }

      return plugins;
    })([])
  }, options.config);
}

module.exports = makeConfig;
