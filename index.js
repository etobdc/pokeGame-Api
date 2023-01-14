let app = require('./config/express')()
let http = require('http').Server(app)

http.listen(3000, () => console.log('Server is running'))

module.exports = app
