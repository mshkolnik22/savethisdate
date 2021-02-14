import express from "express"
import { Guest } from "../../../models/index.js"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"

const guestsRouter = new express.Router()

guestsRouter.post("/", async (req, res) => {
  const { body } = req
  const userId = req.user.id

  const formInput = cleanUserInput(body)
  const eventId = req.params.id
  const { firstName, lastName, email, phone, rsvp } = formInput

  try {
    const newGuest = await Guest.query().insertAndFetch({
      firstName,
      lastName,
      email,
      phone,
      rsvp,
      eventId,
      userId,
    })

    return res.status(201).json({ newGuest: newGuest })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default guestsRouter
