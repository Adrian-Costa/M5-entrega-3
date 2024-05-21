
import { z } from "zod";

export const userSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(4),
    password: z.string().min(1)
})

export const userCreateSchema = userSchema.omit({ id: true })
export type TUserCreateBody = z.infer< typeof userCreateSchema >

export const userLoginSchema = userSchema.omit({ id: true, name: true})
export type TUserLoginBody = z.infer< typeof userLoginSchema >

export const userReturnSchema = userSchema.omit({ password: true })
export type TUseReturnBody = z.infer< typeof userReturnSchema >

export type TUserLoginReturn = {
    token: string;
    user: TUseReturnBody;
}
