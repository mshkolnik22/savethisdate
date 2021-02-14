import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import eventsRouter from "./api/v1/eventsRouter.js"
import guestsRouter from "./api/v1/guestsRouter.js"
import invitesRouter from "./api/v1/invitesRouter.js"

const rootRouter = new express.Router()
rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter) 
rootRouter.use("/api/v1/events", eventsRouter)
rootRouter.use("/api/v1/guests", guestsRouter)
rootRouter.use("/api/v1/invites", invitesRouter)

export default rootRouter
