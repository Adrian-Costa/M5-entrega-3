
import { z } from "zod";

export const carSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    brand: z.string().min(1),
    year: z.number().positive(),
    km: z.number().positive()
})

export type TCarBody = z.infer< typeof carSchema >

export const carCreateSchema = carSchema.omit({ id: true })

export type TCarCreateBody = z.infer< typeof carCreateSchema >

export const carUpdateSchema = carCreateSchema.partial();

export type TCarUpdateBody = z.infer< typeof carUpdateSchema >
