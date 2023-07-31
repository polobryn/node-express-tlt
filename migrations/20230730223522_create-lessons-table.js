/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('lessons', tbl => {
    tbl.increments();
    tbl.text('name', 128)
        .notNullable();
    tbl.timestamps(true, true)
  })
  .createTable('messages', tbl => {
    tbl.increments();
    tbl.string('sender', 128)
        .notNullable()
        .index();
    tbl.text('message', 256)
        .notNullable();
    tbl.timestamps(true, true);

    // Foreign key info to 'lessons' table
    tbl.integer('lesson_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons');
};
