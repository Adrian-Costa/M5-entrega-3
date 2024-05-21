
import { injectable } from "tsyringe";
import { TCarBody, TCarCreateBody, TCarUpdateBody, carSchema } from "../schemas/carSchema";
import { prisma } from "../database/prisma";

@injectable()
export class CarServices {
    async create(body:TCarCreateBody, userId:string):Promise<TCarBody>{
        const data = await prisma.car.create({ data: { ...body, userId } })

        return carSchema.parse(data)
    }

    async getMany(userId?:string):Promise<TCarBody[]>{
        const data = await prisma.car.findMany({ where: { userId }})
  
        return data
    }

    async getOne(id:string):Promise<TCarBody>{
        const data = await prisma.car.findFirst({ where: { id }})

        return data as TCarBody
    }

    async update(id:string, body:TCarUpdateBody):Promise<TCarBody>{
        const newCar = await prisma.car.update({ where: { id }, data: body})
        
        return newCar
    }

    async delete(id:string):Promise<void>{
        await prisma.car.delete({ where: { id }})
    }
}
