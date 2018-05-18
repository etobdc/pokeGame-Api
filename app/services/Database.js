const knex = require('knex')
const databaseConfig = require('../../config/database.js')

module.exports = () => knex(databaseConfig)
