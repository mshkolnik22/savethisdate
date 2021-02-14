const Model = require("./Model");
const User = require('./User');
const Event = require('./Event')

class Invite extends Model {
  static get tableName() {
    return "invites";
  }

static get relationMappings () {
  return {
    host: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'invites.users_id',
        to: 'users.id'
      }
    },
    guest: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'invites.guests_id',
        to: 'users.id'
      }
    }, 
    events: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Event,
      join: {
        from: 'invites.events_id',
        to: 'events.id'
      }
    }
  }
}
}

module.exports = Invite