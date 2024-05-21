
import "reflect-metadata"
import "express-async-errors"
import express, { json } from "express"
import helmet from "helmet"
import { carRouter } from "./routes/carRoutes"
import { HandleErrors } from "./middlewares/handleErrors.middleware"
import { UserRouter } from "./routes/userRoutes"

export const app = express()

app.use(helmet())

app.use(json())

app.use("/users", UserRouter)

app.use("/cars", carRouter)

app.use(HandleErrors.execute)
