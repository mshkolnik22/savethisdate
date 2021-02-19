import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import eventsRouter from "./api/v1/eventsRouter.js"
import smsRouter from "./api/v1/smsRouter.js"


const rootRouter = new express.Router()
rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter) 
rootRouter.use("/api/v1/events", eventsRouter)
rootRouter.use("/api/v1/sms", smsRouter)


export default rootRouter
