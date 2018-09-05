"use strict";

const path = require("path");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const InterpolatePlugin = require("./src/webpack/Interpolate");

const isDevServer = process.argv[1].includes("webpack-dev-server");
const mode = process.env.NODE_ENV || (isDevServer ? "development" : "production");

/* Use env if specified, but always use / for dev server. Put back into env for HTML/JS */
const rootPath = (!isDevServer && process.env.ROOT_PATH) || "/";
process.env.ROOT_PATH = rootPath;

const aliases = {};
const rules = [];
const plugins = [];
const optimization = {
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      deps: {
        test: /\/node_modules\//,
        name: "deps"
      }
    }
  }
};

const config = {
  mode,
  bail: mode === "production",

  devtool: mode !== "production" ? "eval-source-map" : false,
  entry: ["whatwg-fetch", "./src/index.jsx", "./styles/main/index.scss"],
  resolve: {
    alias: aliases,
    extensions: [".js", ".jsx", ".scss"]
  },
  module: { rules },
  plugins,
  optimization: mode === "production" ? optimization : {},

  output: {
    path: path.join(__dirname, "build"),
    publicPath: rootPath,
    filename: "js/bundle.[name].js"
  },
  devServer: {
    contentBase: "static",
    historyApiFallback: true,
    overlay: true,
    hot: true,
    publicPath: rootPath,
    host: process.env.DEV_SERVER_HOST,
    disableHostCheck: process.env.DEV_SERVER_HOST === "0.0.0.0"
  }
};

function cssLoader(modules) {
  return [
    mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
    {
      loader: "css-loader",
      options: { importLoaders: 1, modules }
    },
    "sass-loader"
  ];
}

const cssDir = path.join(__dirname, "styles");
rules.push({
  oneOf: [
    { include: path.join(cssDir, "main"), test: /\.scss$/, use: cssLoader(false) },
    { include: cssDir, test: /\.scss$/, use: cssLoader(true) }
  ]
});
aliases.styles = cssDir;
if (mode === "production") plugins.push(new MiniCssExtractPlugin({ filename: "css/[name].css" }));

function jsLoader(react) {
  const presets = [
    ["@babel/preset-env", {
      modules: false,
      useBuiltIns: "usage"
    }]
  ];
  const plugins = ["@babel/plugin-syntax-dynamic-import"];
  if (react) {
    presets.push(["@babel/preset-react", {
      development: mode !== "production",
      useBuiltIns: true
    }]);
  }

  return {
    loader: "babel-loader",
    options: { cacheDirectory: ".cache", presets, plugins }
  };
}

const srcDir = path.join(__dirname, "src");
rules.push(...[
  { include: srcDir, test: /\.js$/, use: jsLoader(false) },
  { include: srcDir, test: /\.jsx$/, use: jsLoader(true) }
]);
aliases.config = path.join(srcDir, "config");
aliases.utils = path.join(srcDir, "utils");
plugins.push(new webpack.ProvidePlugin({
  assert: ["utils", "assert"], config: ["config", "default"], utils: "utils"
}));

if (isDevServer) plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new CleanWebpackPlugin("build", { beforeEmit: true }));
plugins.push(new HtmlWebpackPlugin({ template: "src/webpack/index.html" }), new InterpolatePlugin());

/* Make both process.env and process.env.key available */
const envKeys = ["ROOT_PATH", ...Object.keys(dotenv.parsed)];
const env = Object.assign({}, ...envKeys.map(key => ({ [key]: process.env[key] })));
plugins.push(new webpack.DefinePlugin({ "process.env": JSON.stringify(env) }));
plugins.push(new webpack.EnvironmentPlugin(envKeys));
plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

module.exports = config;
