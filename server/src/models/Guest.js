const Model = require("./Model")

class Guest extends Model {
  static get tableName() {
    return "guests"
  }

  static get relationMappings() {
    const { Event, User } = require("./index")

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
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
        eventId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    }
  }
}

module.exports = Guest