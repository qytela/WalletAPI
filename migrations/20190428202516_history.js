
exports.up = function(knex, Promise) {
  return knex.schema.createTable('history', table => {
  	table.increments('id')
  	table.string('name')
  	table.string('id_account')
  	table.string('history')
  	table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('history')
};
