/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("guests", (table) => {
    table.bigIncrements("id").primary()
    table.string("firstName").notNullable()
    table.string("lastName").notNullable()
    table.string("email").notNullable().unique()
    table.string("phone").notNullable().unique()
    table.string("rsvp")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
  }
/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("guests")
}
