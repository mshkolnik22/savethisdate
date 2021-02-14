import { Contact } from "../../models/index.js"

class ContactSeeder {
  static async seed() {
    const contactsData = [
      {
        firstName: "Lara",
        lastName: "Shkolnik",
        company: "family",
        email: "pritmit@yahoo.com",
        phone: "2062796872",
      },
      {
        firstName: "Maria",
        lastName: "Shkolnik",
        company: "Launch Academy",
        email: "mshkolnik22@gmail.com",
        phone: "7815263105",
      },
    ]

    for (const singleContactData of contactsData) {
      const currentContact = await Contact.query().findOne({ firstName: singleContactData })
      if (!currentContact) {
        await Contact.query().insert(singleContactData)
      }
    }
  }
}

export default ContactSeeder
