const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js",
  output: {
    path: path.resolve(__dirname, "assets", "js"),
    filename: "main.js",
  },
};
