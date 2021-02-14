import express from "express"
import { Invite } from "../../../models/index.js"
import objection from "objection"

const { ValidationError } = objection

const invitesRouter = new express.Router()

invitesRouter.get('/', async (req, res) => {
  const invites = await Invite
    .query()
    .eager(['buyer', 'items'])
  res.json(invites)
})


export default invitesRouter