
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reedems', table => {
  	table.increments('id')
  	table.string('code')
  	table.bigInteger('reward')
  	table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reedems')
};
