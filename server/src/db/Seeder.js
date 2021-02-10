import { connection } from "../boot.js"
import EventSeeder from "./seeders/EventSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding events")
    await EventSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder