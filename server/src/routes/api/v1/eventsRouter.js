import express from "express"
import { Event } from "../../../models/index.js"
import objection from "objection"
import guestsRouter from "./guestsRouter.js"
import EventSerializer from "../../serializers/EventSerializer.js"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"
import isAuthenticated from "../../../middlewares/isAuthenticated.js"

const eventsRouter = new express.Router()

eventsRouter.use("/:id/guests", guestsRouter)

eventsRouter.get("/", isAuthenticated(), async (req, res) => {
  
  try {
    const events = await Event.query()
    const serializedEvents = []
    for (const event of events) {
      const serializedEvent = await EventSerializer.getSummary(event)
      serializedEvents.push(serializedEvent)
    }
    return res.status(200).json({ events: serializedEvents })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

eventsRouter.get("/:id", async (req, res) => {
  
  const { id } = req.params
  try {
    const event = await Event.query().findById(id)
    const serializedEvent = await EventSerializer.getSummary(event)
    console.log(event)
    console.log(serializedEvent)

    if (event) {
      res.status(200).json({ event: serializedEvent })
    } else {
      res.status(404)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

eventsRouter.post("/", async (req, res) => {
 
  const { body } = req
  console.log("body")
  console.log(body)
  const formInput = cleanUserInput(body)
  console.log("formInput")
  console.log(formInput)
  const { title, typeOfEvent, description, hostedBy, hostEmail, linkURL, location, date, time, reminder } = formInput
  console.log("before insert")
  console.log([title, typeOfEvent, description, hostedBy, hostEmail, linkURL, location, date, time, reminder])
  try {
    const newEvent = await Event.query().insertAndFetch({
      title, 
      typeOfEvent, 
      description, 
      hostedBy, 
      hostEmail, 
      linkURL, 
      location, 
      date, 
      time, 
      reminder,
    })
    console.log("after insert")
    return res.status(201).json({ event: newEvent })
  } catch (error) {
    console.log("error")
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default eventsRouter
