const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function scriptRules() {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/env",
            {
              targets: {
                browsers: ["last 2 Chrome versions"],
              },
            },
          ],
        ],
      },
    },
  ];
}

function sassRules() {
  return [
    {
      test: /\.s[ac]ss$/i,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
  ];
}

module.exports = {
  entry: {
    overview: "./resources/assets/scripts/overview.js",
    app: "./resources/assets/scripts/app.js",
    login: "./resources/assets/scripts/login.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  module: {
    rules: sassRules().concat(scriptRules()),
  },
  plugins: [new MiniCssExtractPlugin()],
};
