/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {  
  return knex.schema.createTable("sendInvites", (table) => {
    table.bigIncrements("id").primary()
    table.string("response")
    table.boolean("admin")
    table.string("expirationDate")
    table.boolean("active")
    table.string("inviteURL")
    table.bigInteger("eventId").unsigned().index().notNullable().references("events.id")
    table.bigInteger("userId").unsigned().index().notNullable().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
})}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("sendInvites")
}
