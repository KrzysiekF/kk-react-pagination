const path = require("path");
const webpack = require("webpack");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: { presets: [['es2015', { modules: false }], 'react', 'stage-0'] }
          }
        ]
      }

      // Loaders for other file types can go here
    ]
  },
  context: path.resolve(__dirname, "./src"),
  entry: {
    'kk-react-pagination': "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  plugins: [
    
  ]
};
