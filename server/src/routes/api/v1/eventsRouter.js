import express from "express"
import { Event } from "../../../models/index.js"

const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await Event.query()
    return res.status(200).json({ events: events })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default eventsRouter
