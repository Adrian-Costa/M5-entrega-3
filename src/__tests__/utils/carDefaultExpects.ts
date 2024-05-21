
import { TCarBody, TCarCreateBody } from "../../schemas/carSchema";

export const carDefaultExpects = (data: TCarBody, expected: TCarCreateBody) => {
    expect(data.id).toBeDefined()
    expect(data.userId).toBeDefined()
    expect(data.brand).toBe(expected.brand)
    expect(data.description).toBe(expected.description)
    expect(data.km).toBe(expected.km)
    expect(data.name).toBe(expected.name)
    expect(data.year).toBe(expected.year)
}
