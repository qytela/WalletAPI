
exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', table => {
  	table.increments('id')
  	table.string('name')
  	table.string('email')
  	table.string('password')
    table.bigInteger('pin')
  	table.bigInteger('saldo')
  	table.bigInteger('id_account')
    table.integer('status')
    table.string('api_key')
  	table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts')
};
