const crypto = require('crypto')

class FieldsHandler {
  constructor () {
    this._fields = []
  }

  filter (obj) {
    let filteredData = {}
    const attributesKey = Object.keys(this._fields)
    for (let key in obj) {
      if (attributesKey.includes(key)) {
        const field = this.handleField(key, obj[key])
        filteredData[key] = field
      }
    }
    return filteredData
  }

  handleField (fieldKey, value) {
    const configs = this._fields[fieldKey]
    configs.forEach(config => {
      value = this.configData(config, value)
    })
    return value
  }

  configData (config, value) {
    switch (config) {
      case 'number':
        return +value
      case 'string':
        return value + ''
      case 'boolean':
        return !!value
      case 'crypt':
        return crypto
          .createHmac('sha256', value)
          .digest('hex')
      default:
        return value
    }
  }

  set (fields) {
    this._fields = fields
  }
}

module.exports = () => FieldsHandler
