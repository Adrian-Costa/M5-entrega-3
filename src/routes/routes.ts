
import { Router } from "express";
import { container } from "tsyringe";
import { CarServices } from "../services/carServices";
import { CarController } from "../controllers/carController";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { carCreateSchema, carUpdateSchema } from "../schemas/carSchema";
import { IsCarIdValid } from "../middlewares/isCarIdValid.middleware";

container.registerSingleton("CarServices", CarServices)
const carController = container.resolve(CarController)

export const carRouter = Router()

carRouter.post("/", ValidateBody.execute(carCreateSchema),
(req, res) => carController.create(req, res))

carRouter.get("/", (req, res) => carController.getMany(req, res))


carRouter.use("/:id", IsCarIdValid.execute)

carRouter.get("/:id", (req, res) => carController.getOne(req, res))

carRouter.patch("/:id", ValidateBody.execute(carUpdateSchema),
(req, res) => carController.update(req, res))

carRouter.delete("/:id", (req, res) => carController.delete(req, res))
