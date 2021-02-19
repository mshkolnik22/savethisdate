import express from "express"
import { Invite } from "../../../models/index.js"

const invitesRouter = new express.Router()

invitesRouter.get("/", async (req, res) => {

  // try {
  //   const invite = await Invite.query()
  //   const serializedInvites = []
  //   for (const invite of invites) {
  //     const serializedInvite = await InviteSerializer.getSummary(invite)
  //     serializedInvites.push(serializedInvite)
  //   }
  //   return res.status(200).json({ invites: serializedInvites })
  // } catch (error) {
  //   return res.status(500).json({ errors: error })
  // }
})




export default invitesRouter