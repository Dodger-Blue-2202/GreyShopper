module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-map",
  //   externals: {
  //     react: "commonjs react",
  //     "react-dom": "commonjs react-dom",
  //   },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      //   {
      //     test: /\.css$/,
      //     use: ["style-loader", "css-loader"],
      //   },
      //   {
      //     test: /\.svg$/,
      //     use: [
      //       {
      //         loader: "svg-url-loader",
      //         options: {
      //           limit: 10000,
      //         },
      //       },
      //     ],
      //   },
    ],
  },
};
