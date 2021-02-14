import { Guest } from "../../models/index.js"

class GuestSeeder {
  static async seed() {
    const guestsData = [
      {
        firstName: "Lara",
        lastName: "Shkolnik",
        email: "pritmit@yahoo.com",
        phone: "2062796872",
        rsvp: "true",
      },
      {
        firstName: "Maria",
        lastName: "Shkolnik",
        email: "mshkolnik22@gmail.com",
        phone: "7815263105",
        rsvp: "true",
      },
      {
        firstName: "Maya",
        lastName: "Shkolnik",
        email: "mshkolnik7@gmail.com",
        phone: "(333)333-3333",
        rsvp: "true",
      },
      {
        firstName: "Gene",
        lastName: "Shkolnik",
        email: "gshkolnik@gmail.com",
        phone: "555-555-5555",
        rsvp: "false",
      },
    ]

    for (const singleGuestData of guestsData) {
      const currentGuest = await Guest.query().findOne({ firstName: singleGuestData })
      if (!currentGuest) {
        await Guest.query().insert(singleGuestData)
      }
    }
  }
}

export default GuestSeeder