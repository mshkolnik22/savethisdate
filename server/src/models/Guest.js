const Model = require("./Model")

class Guest extends Model {
  static get tableName() {
    return "guests"
  }

  static get relationMappings() {
    const { Guest, User } = require("./index")

    return {
      guest: {
        relation: Model.BelongsToOneRelation,
        modelClass: Guest,
        join: {
          from: "guests.eventId",
          to: "events.id",
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "guests.userId",
          to: "users.id",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "email", "phone"],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        rsvp: { type: "string" },
      },
    }
  }
}

module.exports = Guest