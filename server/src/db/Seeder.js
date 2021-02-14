import { connection } from "../boot.js"
import EventSeeder from "./seeders/EventSeeder.js"
import ContactSeeder from "./seeders/ContactSeeder.js"
import GuestSeeder from "./seeders/GuestSeeder.js"
class Seeder {
  static async seed() {
 
    console.log("seeding events")
    await EventSeeder.seed()

    // console.log("seeding contacts for the phonebook")
    // await ContactSeeder.seed()

    // console.log("seeding guests")
    // await GuestSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder