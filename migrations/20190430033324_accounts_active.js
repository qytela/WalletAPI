
exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts_active', table => {
  	table.increments('id')
  	table.string('bank_name')
    table.string('name_card_holder')
  	table.bigInteger('id_account')
  	table.bigInteger('card_number')
  	table.bigInteger('phone')
  	table.text('address')
  	table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts_active');
};
