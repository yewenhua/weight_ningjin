'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    VUE_APP_BASE_URL: '"http://127.0.0.1:7001/v1/api"',
    VUE_APP_HOST: '"http://127.0.0.1:7001"',
    VUE_APP_WS_URL: '"ws://127.0.0.1:7001"'
})
