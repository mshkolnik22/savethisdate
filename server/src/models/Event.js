const Model = require("./Model")

class Event extends Model {
  static get tableName() {
    return "events"
  }
}

module.exports = Event
