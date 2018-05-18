
exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', table => {
    table.increments()
    table.string('name', 50).notNullable().unique()
    table.text('map').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
