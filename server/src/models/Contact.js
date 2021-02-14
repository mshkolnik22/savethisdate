const Model = require("./Model")

class Contact extends Model {
  static get tableName() {
    return "contacts"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "email", "phone"],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        companyName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
      },
    }
  }
}

module.exports = Contact