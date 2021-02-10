/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("events", (table) => {
    table.bigIncrements("id").primary()
    table.string("title").notNullable()
    table.string("typeOfEvent")
    table.text("description")
    table.string("hostedBy").notNullable()
    table.string("hostEmail").notNullable()
    table.string("linkURL")
    table.string("location")
    table.date("date").notNullable()
    table.time("time")
    table.integer("reminder")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("events")
}
