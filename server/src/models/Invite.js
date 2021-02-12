const Model = require("./Model")

class Invite extends Model {
  static get tableName() {
    return "sendInvites"
  }

  static get relationMappings() {
    const { Event, User } = require("./index")

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: "invites.eventId",
          to: "events.id",
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "invites.userId",
          to: "users.id",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        response: { type: "string" },
        admin: { type: "boolean" },
        expirationDate: { type: "string" },
        active: { type: "boolean" },
        inviteURL: { type: "string" },
        eventId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    }
  }
}

module.exports = Invite
