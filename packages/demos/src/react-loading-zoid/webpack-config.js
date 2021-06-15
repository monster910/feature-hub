// @ts-check
const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const {webpackBaseConfig} = require('../webpack-base-config');

/**
 * @type {webpack.Configuration[]}
 */
const configs = [
  merge(webpackBaseConfig, {
    entry: path.join(__dirname, './feature-app.tsx'),
    externals: {
      react: 'react',
    },
    output: {
      filename: 'feature-app.umd.js',
      libraryTarget: 'umd',
      publicPath: '/',
    },
  }),
  merge(webpackBaseConfig, {
    entry: path.join(__dirname, './integrator.tsx'),
    output: {
      filename: 'integrator.js',
      publicPath: '/',
      globalObject: 'this',
    },
    externals: {
      zoid: { // UMD
        commonjs: "zoid",
        commonjs2: "zoid",
        amd: "zoid",
        root: "zoid"
      }
    },
  }),
];

module.exports = configs;
