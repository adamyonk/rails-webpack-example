const DIR = require("path").resolve(__dirname);
const PROD = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    application: `${DIR}/app/assets/javascripts/application.js`,
  },
  mode: PROD ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: PROD ? "[name]-[hash].css" : "[name].css",
            },
          },
          { loader: "extract-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("cssnano")({
                  discardComments: { removeAll: true },
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
  output: {
    hashDigestLength: 32,
    filename: PROD ? "[name]-[contenthash].js" : "[name].js",
    chunkFilename: PROD ? "[name]-[contenthash].js" : "[name].js",
    path: `${DIR}/public/assets/`,
  },
  plugins: [PROD && new (require("webpack-manifest-plugin"))()].filter(Boolean),
  resolve: {
    extensions: [".js", ".json", ".css"],
    modules: ["node_modules", `${DIR}/app/assets`],
  },
};
