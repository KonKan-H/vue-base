var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API:'"http://172.16.12.218:8880/base"',
  BASE_API: '"/base/"',
})
