let app = require('./config/express')()
let http = require('http').Server(app)

if (process.env.NODE_ENV === 'test') {
  http.listen(3000, () => console.log('Test Server is running'))
} else {
  http.listen(8080, () => console.log('Server is running'))
}

module.exports = app
