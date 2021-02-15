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
    table.bigInteger("eventId").unsigned().index().notNullable().references("events.id")
    table.bigInteger("userId").unsigned().index().notNullable().references("users.id")
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
