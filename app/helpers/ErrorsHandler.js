class ErrorsHandler {
  constructor (req, res) {
    this._req = req
    this._res = res
  }

  serverError (msg, log) {
    if (log) {
      this._res.status(500)
        .json({ msg, log })
        .end()
    }
    return !!log
  }

  unauthenticated () {
    this._res.status(403)
      .json({
        error: 'error to authenticate'
      })
      .end()
  }

  unauthorized () {
    this._res.status(401)
      .json({
        error: 'you don\' have permission to do it'
      })
      .end()
  }

  unexist () {
    this._res.status(404)
      .json({
        error: 'it doesn\'t exist'
      })
      .end()
  }

  bodyError (validation) {
    const error = !validation.isEmpty()
    if (error) {
      this._res
        .status(406)
        .json({error: validation.mapped()})
        .end()
    }
    return error
  }
}

module.exports = () => ErrorsHandler
