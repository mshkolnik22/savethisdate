import express from "express"
import { Event } from "../../../models/index.js"
import objection from "objection"

const { ValidationError } = objection

import cleanUserInput from "../../../services/cleanUserInput.js"

const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await Event.query()
    return res.status(200).json({ events: events })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

eventsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.query().findById(id)
    //event.invites = await event.$relatedQuery("invites")
    if (event) {
      res.status(200).json({ event: event })
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
  const formInput = cleanUserInput(body)
  const { title, typeOfEvent, description, hostedBy, hostEmail, image, linkURL, location, date, time, reminder } = formInput
  //debugger
  try {
    const newEvent = await Event.query().insertAndFetch({
      title, 
      typeOfEvent, 
      description, 
      hostedBy, 
      hostEmail, 
      image, 
      linkURL, 
      location, 
      date, 
      time, 
      reminder,
    })
    debugger
    return res.status(201).json({ event: newEvent })
  } catch (error) {
    debugger
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default eventsRouter
