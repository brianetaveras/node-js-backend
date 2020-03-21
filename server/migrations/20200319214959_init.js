
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table)=>{
        table.increments('uid')
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.string('password').notNullable()

    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
