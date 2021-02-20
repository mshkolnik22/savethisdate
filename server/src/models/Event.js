const Model = require("./Model")

class Event extends Model {
  static get tableName() {
    return "events"
  }
  static get relationMappings() {
    const { Guest } = require("./index")

    return {
      guests: {
        relation: Model.HasManyRelation,
        modelClass: Guest,
        join: {
          from: "events.id",
          to: "guests.eventId",
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
        reminder: { type: "string" },
      },
    }
  }
}

module.exports = Event
