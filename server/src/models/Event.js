const Model = require("./Model")

class Event extends Model {
  static get tableName() {
    return "events"
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
        date: { type: "string", format: "date" },
        time: { type: "string", format: "time" },
        reminder: { type: ["string", "integer"] },
      },
    }
  }
}

module.exports = Event
