const Model = require("./Model")

class Event extends Model {
  static get tableName() {
    return "events"
  }
  static get relationMappings() {
    const { Invite, User } = require("./index")

    return {
      invites: {
        relation: Model.HasManyRelation,
        modelClass: Invite,
        join: {
          from: "events.id",
          to: "invites.eventId",
        },
      },
      // update that Event belongs to User
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "events.id",
          through: {
            from: "invites.eventId",
            to: "invites.userId",
          },
          to: "users.id",
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "hostedBy", "hostEmail", "date"],
      properties: {
        title: { type: "string" },
        typeOfEvent: { type: "string" },
        description: { type: "string" },
        hostedBy: { type: "string" },
        hostEmail: { type: "string" },
        linkURL: { type: "string" },
        location: { type: "string" },
        date: { type: "string" },
        time: { type: "string" },
        reminder: { type: ["string", "integer"] },
      },
    }
  }
}

module.exports = Event
