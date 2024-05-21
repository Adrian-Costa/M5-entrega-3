
import { container } from "tsyringe"
import { UserServices } from "../services/userServices"
import { UserController } from "../controllers/userControllers"
import { Router } from "express"
import { ValidateBody } from "../middlewares/validateBody.middleware"
import { userCreateSchema, userLoginSchema } from "../schemas/userSchema"
import { ValidateToken } from "../middlewares/validateToken"
import { IsEmailAlreadyRegistered } from "../middlewares/isEmailAlreadyRegistered"

container.registerSingleton("UserServices", UserServices)
const userController = container.resolve(UserController)

export const UserRouter = Router()

UserRouter.post("/", ValidateBody.execute(userCreateSchema),
IsEmailAlreadyRegistered.execute,
(req, res) => userController.register(req, res))

UserRouter.post("/login", ValidateBody.execute(userLoginSchema),
(req, res) => userController.login(req, res))

UserRouter.get("/", ValidateToken.execute,
(req, res) => userController.getUser(req, res))
