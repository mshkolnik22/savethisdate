import express from "express"
import { Event } from "../../../models/index.js"
import objection from "objection"

const { ValidationError } = objection

import cleanUserInput from "../../../services/cleanUserInput.js"

const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  console.log("inside first get")
  try {
    const events = await Event.query()
    return res.status(200).json({ events: events })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

eventsRouter.get("/:id", async (req, res) => {
  console.log("inside /:id")
  const { id } = req.params
  try {
    const event = await Event.query().findById(id)
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
  console.log("inside post")
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
