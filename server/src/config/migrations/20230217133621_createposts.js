/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const tableName = 'posts';

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$;
  `);
  await knex.schema.createTable('posts', (table) => {
    table.increments('id');
    table.string('title', 100).unique().notNullable();
    table.string('content', 255).notNullable();
    table.timestamps(false, true);
  })
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('posts')
};
