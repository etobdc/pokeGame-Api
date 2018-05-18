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
}

module.exports = MapController
