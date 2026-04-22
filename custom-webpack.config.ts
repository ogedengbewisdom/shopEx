import * as dotenv from 'dotenv';
import * as webpack from 'webpack';

dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
