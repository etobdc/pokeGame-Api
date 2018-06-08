const { check, validationResult } = require('express-validator/check')

function MapController (app) {
  app.get('/map', listMap)

  function listMap (req, res) {
    const ErrorsHandler = new app.helpers.ErrorsHandler(req, res)

    const MapDAO = new app.services.MapDAO()
    MapDAO.find({})
      .then(result => {
        res.status(202).json(result)
      })
      .catch(err => {
        ErrorsHandler.serverError('fail to list maps', err)
      })
  }

  app.get('/map/:id', showMap)

  function showMap (req, res) {
    const ErrorsHandler = new app.helpers.ErrorsHandler(req, res)

    const id = req.params.id

    const MapDAO = new app.services.MapDAO()
    MapDAO.find({id})
      .then(map => {
        if (map.length) {
          res.status(200).json(map[0])
        } else {
          ErrorsHandler.unexist()
        }
      })
      .catch(err => {
        ErrorsHandler.serverError('fail to list map', err)
      })
  }


  app.post('/map', createMap)

  function createMap (req, res) {
    const validation = validationResult(req)
    const ErrorsHandler = new app.helpers.ErrorsHandler(req, res)
    if (ErrorsHandler.bodyError(validation)) return

    let body = Object.assign(req.body)
    const MapDAO = new app.services.MapDAO()

    registerMap()

    function registerMap () {
      return MapDAO.store(body)
      .then(id => {
        res.json({id})
      })
      .catch(err => {
        ErrorsHandler.serverError('fail to create Map', err)
      })
    }
  }
}

module.exports = MapController
