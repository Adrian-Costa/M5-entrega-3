
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CarServices } from "../services/carServices";

@injectable()
export class CarController {
    constructor(@inject("CarServices") private carServices: CarServices) {}

    async create(req:Request, res:Response){
        const id = res.locals.decode.id

        const response = await this.carServices.create(req.body, id)

        return res.status(201).json(response)
    }

    async getMany(req:Request, res:Response){
        const id = req.query?.userId
        const response = await this.carServices.getMany(id as string)

        return res.status(200).json(response)
    }

    async getOne(req:Request, res:Response){
        const response = await this.carServices.getOne(req.params.id)

        return res.status(200).json(response)
    }

    async update(req:Request, res:Response){
        const response = await this.carServices.update(req.params.id, req.body)

        return res.status(200).json(response)
    }

    async delete(req:Request, res:Response){
        await this.carServices.delete(req.params.id)

        return res.status(204).json()
    }
}
