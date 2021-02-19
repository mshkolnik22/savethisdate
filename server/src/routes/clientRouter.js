import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

const clientRoutes = 
  ["/", 
  "/invites",
  "/events", 
  "/events/congratulations",
  "/events/:id", 
  "/events/:id/edit",
  "/contacts", 
  "/user-sessions/new", 
  "/users/new",
  "/sms",];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
