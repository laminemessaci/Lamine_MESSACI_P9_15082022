const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.html", // Le point d'entrée de votre application
  output: {
    path: path.resolve(__dirname, "dist"), // Le dossier de sortie pour les fichiers générés
    filename: "bundle.js", // Le nom du fichier de sortie
  },
  stats: {
    children: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Utilisation de Babel pour transpiler le code JavaScript
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }, // Options pour html-loader
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html", // Le chemin vers votre fichier HTML de modèle
      filename: "index.html", // Le nom du fichier généré
    }),
  ],
};
