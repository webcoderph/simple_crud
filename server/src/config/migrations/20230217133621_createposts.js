/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id');
    table.string('title', 100).unique().notNullable();
    table.string('content', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('posts') 
};
