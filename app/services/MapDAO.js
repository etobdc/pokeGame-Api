const DAO = require('./DAO')()

function MapDAOFn (app) {
  return class MapDAO extends DAO {
    constructor () {
      super(app)
      this.table = 'maps'
      this.fields = new app.helpers.FieldsHandler()
      this.fields.set({
        'id': ['number'],
        'name': ['string']
      })
    }
  }
}

module.exports = MapDAOFn
