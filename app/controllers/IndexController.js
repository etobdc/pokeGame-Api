function IndexController (app) {
  app.get('/', (req, res) => {
    res.status(200)
      .json({message: 'Api Working'})
  })
}

module.exports = IndexController
