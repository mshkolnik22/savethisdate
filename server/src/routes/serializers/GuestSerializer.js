import UserSerializer from "./UserSerializer.js"

class GuestSerializer {
  static async getSummary(guest) {
    const allowedAttributes = ["id", "firstName", "lastName", "email", "phone", "rsvp"]

    let serializedGuest = {}
    for (const attribute of allowedAttributes) {
      serializedGuest[attribute] = guest[attribute]
    }
    const relatedUser = await guest.$relatedQuery("user")
    const serializedUser = UserSerializer.getSummary(relatedUser)
    serializedGuest.user = serializedUser
    return serializedGuest
  }
}
export default GuestSerializer