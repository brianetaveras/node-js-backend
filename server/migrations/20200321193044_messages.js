
exports.up = async function(knex) {
  await knex.schema.createTable('messages', (table)=>{
      table.increments('id');
      table.integer('uid').references('uid').inTable('users').notNullable();
      table.timestamp('set_time', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.string('message').notNullable();
    })
};

exports.down = async function(knex) {  
    await knex.schema.dropTableIfExists('messages')
  
};
