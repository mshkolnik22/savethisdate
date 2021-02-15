import express from "express"
import { Guest } from "../../../models/index.js"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"

const guestsRouter = new express.Router({ mergeParams: true })

guestsRouter.post("/", async (req, res) => {
  const { body } = req
  const userId = req.user.id

  const formInput = cleanUserInput(body)
  const eventId = req.params.id
  const { firstName, lastName, email, phone, rsvp } = formInput
  console.log("formInput")
  console.log(formInput)
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
    console.log("newGuest")
    console.log(newGuest)
    return res.status(201).json({ newGuest: newGuest })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error)
      console.log(error.data)
      return res.status(422).json({ errors: error.data })
    } else {
      console.log("error from else")
      console.log(error)
      return res.status(500).json({ errors: error })
    }
  }
})

export default guestsRouter
