
import { Router } from "express";
import { container } from "tsyringe";
import { CarServices } from "../services/carServices";
import { CarController } from "../controllers/carController";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { carCreateSchema, carUpdateSchema } from "../schemas/carSchema";
import { IsCarIdValid } from "../middlewares/isCarIdValid.middleware";
import { ValidateToken } from "../middlewares/validateToken";
import { IsCarOwner } from "../middlewares/isCarOwner";

container.registerSingleton("CarServices", CarServices)
const carController = container.resolve(CarController)

export const carRouter = Router()

carRouter.post("/", ValidateToken.execute,
ValidateBody.execute(carCreateSchema),
(req, res) => carController.create(req, res))

carRouter.get("/", (req, res) => carController.getMany(req, res))

carRouter.get("/:id", IsCarIdValid.execute,
(req, res) => carController.getOne(req, res))

carRouter.patch("/:id", ValidateToken.execute,
IsCarIdValid.execute,
IsCarOwner.execute,
ValidateBody.execute(carUpdateSchema),
(req, res) => carController.update(req, res))

carRouter.delete("/:id", ValidateToken.execute,
IsCarIdValid.execute,
IsCarOwner.execute,
(req, res) => carController.delete(req, res))
