import GuestSerializer from "./GuestSerializer.js"

class EventSerializer {
  static async getSummary(event) {
    const allowedAttributes = ["id", "title", "typeOfEvent", "description", "hostedBy", "hostEmail", "linkURL", "location", "date", "time"]

    let serializedEvent = {}
    for (const attribute of allowedAttributes) {
      serializedEvent[attribute] = event[attribute]
    }
    const relatedGuests = await event.$relatedQuery("guests")
    const serializedGuests = await Promise.all(
      relatedGuests.map((guest) => GuestSerializer.getSummary(guest))
    )
    serializedEvent.guests = serializedGuests
    return serializedEvent
  }
}

export default EventSerializer