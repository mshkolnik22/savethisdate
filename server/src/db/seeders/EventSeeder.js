import { Event } from "../../models/index.js"

class EventSeeder {
  static async seed() {
    const eventsData = [
      {
        title: "Birthday Party",
        typeOfEvent: "party",
        description: "Family only get-together with cake",
        hostedBy: "Gene",
        hostEmail: "mshkolnik22@gmail.com",
        linkURL: "",
        location: "North Reading",
        date: "2021-02-22",
        time: "16:00:00",
        reminder: "7"
      },
      {
        title: "Sweet 16",
        typeOfEvent: "party",
        description: "Family only get-together with cake",
        hostedBy: "Maria",
        hostEmail: "mshkolnik22@gmail.com",
        linkURL: "",
        location: "North Reading",
        date: "2021-02-28",
        time: "20:00:00",
        reminder: "1"
      },
    ]

    for (const singleEventData of eventsData) {
      const currentEvent = await Event.query().findOne({ title: singleEventData })
      if (!currentEvent) {
        await Event.query().insert(singleEventData)
      }
    }
  }
}

export default EventSeeder
