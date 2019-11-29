const path = require("path");

module.exports = {
  entry: "./src/abacus.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map"
};
