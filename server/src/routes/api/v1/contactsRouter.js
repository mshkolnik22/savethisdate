import express from "express"
import { Contact } from "../../../models/index.js"
import objection from "objection"

const { ValidationError } = objection

import cleanUserInput from "../../../services/cleanUserInput.js"

const contactsRouter = new express.Router()

contactsRouter.get("/", async (req, res) => {
  try {
    const contacts = await Contact.query()
    return res.status(200).json({ contacts: contacts })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

contactsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const contact = await Contact.query().findById(id)
    if (contact) {
      res.status(200).json({ contact: contact })
    } else {
      res.status(404)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

contactsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { name, email, phone, rsvp } = formInput

  try {
    const newContact = await Contact.query().insertAndFetch({
      name,
      email,
      phone,
      rsvp,
    })

    return res.status(201).json({ contact: newContact })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default contactsRouter
