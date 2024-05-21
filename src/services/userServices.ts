
import { TUseReturnBody, TUserCreateBody, TUserLoginBody, TUserLoginReturn, userReturnSchema }
from "../schemas/userSchema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

@injectable()
export class UserServices{
    async register(body:TUserCreateBody):Promise<TUseReturnBody>{
        const hashPassword = await bcrypt.hash(body.password, 10)

        const newUser = {
            ...body,
            password: hashPassword,
        }

        const data = await prisma.user.create({ data: newUser })

        return userReturnSchema.parse(data)
    }

    async login(body:TUserLoginBody):Promise<TUserLoginReturn>{
        const user = await prisma.user.findFirst({ where: { email: body.email } })

        if (!user) {
            throw new AppError(404, "User not registered")
        }

        const compare = await bcrypt.compare(body.password, user.password)

        if (!compare) {
            throw new AppError(401, "Email and password doesn't match")
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)

        return { token: token, user: userReturnSchema.parse(user)}
    }

    async getUser(id:string):Promise<TUseReturnBody>{
        const data = await prisma.user.findFirst({ where: { id }})

        return userReturnSchema.parse(data)
    }
}
