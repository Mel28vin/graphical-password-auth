module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  loader: require.resolve("file-loader"),
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    ame: "static/media/[name].[hash:8].[ext]",
  },
}
