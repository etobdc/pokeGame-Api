const express = require('express')
const load = require('express-load')
const bodyParser = require('body-parser')

module.exports = function () {
  const app = express()

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.disable('etag')

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  load('middlewares', {
    cwd: 'app'
  })
    .then('helpers', {
      cwd: 'app'
    })
    .then('services', {
      cwd: 'app'
    })
    .then('controllers', {
      cwd: 'app'
    })
    .into(app)

  return app
}
