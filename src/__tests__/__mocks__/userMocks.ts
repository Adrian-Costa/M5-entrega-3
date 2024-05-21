
import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken"

export const userRegisterBodyMock = {
    name: "John Doe",
    email: "johndoe@email.com",
    password: "12345678"
}

export const userListMock = [{
    name: "John Doe",
    email: "johndoe@email.com",
    password: "12345678"
},
{
    name: "Dhoe Jon",
    email: "dhoejon@email.com",
    password: "87654321"
}]

export const loginUserMock = async () => {
    const user = await prisma.user.create({ data: userRegisterBodyMock })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)

    return { user, token }
}
