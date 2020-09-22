const merge = require('webpack-merge');
const common = require('./webpack.config.ts');

module.exports = merge(common, {
  mode: 'production',
  watch: false,
});