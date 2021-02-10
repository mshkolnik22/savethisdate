/**
 * @typedef {import("knex")} Knex
 */

exports.up = async (knex) => {
  return knex.schema.table("events", (table) => {
    table.string("date").notNullable()
    table.string("time")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.table("events", (table) => {
    table.dropColumn("date")
    table.dropColumn("time")
  })
}
