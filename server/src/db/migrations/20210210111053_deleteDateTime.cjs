/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("events", (table) => {
    table.dropColumn("date")
    table.dropColumn("time")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.table("events", (table) => {
    table.string("dateOfEvent").notNullable()
    table.string("time")
  })
}
