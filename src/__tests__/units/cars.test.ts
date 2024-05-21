
import { prisma } from "../../database/prisma"
import { CarServices } from "../../services/carServices"
import { prismaMock } from "../__mocks__/prisma"
import { carCreateBodyMock, carCreateMock, carListMock, carMock, carUpdateBodyMock } from "../__mocks__/carMocks"

describe("Unit test: create car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
    })

    test("create car should work correctly", async () => {
        const carServices = new CarServices()

        prismaMock.car.create.mockResolvedValue(carCreateMock)
        const data = await carServices.create(carCreateBodyMock, "e6f91b7e-b2b5-40a0-9adf-2b1242ed2a97")

        expect(data).toStrictEqual(carCreateMock)
    })
})

describe("Unit test: get many car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
    })

    test("get many car should work correctly", async () => {
        const carServices = new CarServices()
        
      prismaMock.car.findMany.mockResolvedValue(carListMock)
      const data = await carServices.getMany()

      expect(data).toHaveLength(2)
      expect(data[0]).toStrictEqual(carListMock[0])
      expect(data[1]).toStrictEqual(carListMock[1])
    })
})

describe("Unit test: get one car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
    })

    test("get one car should work correctly", async () => {
        const carServices = new CarServices()
        
        prismaMock.car.findFirst.mockResolvedValue(carMock)
        const data = await carServices.getOne("fe111d24-1b79-44df-931b-4c9fd5859014")

        expect(data).toStrictEqual(carMock)
    })
})

describe("Unit test: update car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
    })

    test("update car should work correctly", async () => {
        const carServices = new CarServices()

        const updateCar = { ...carMock, ...carUpdateBodyMock}

        prismaMock.car.update.mockResolvedValue(updateCar)
        const data = await carServices.update(carMock.id, carUpdateBodyMock)

        expect(data).toStrictEqual(updateCar)
    })
})

describe("Unit test: delete car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
    })

    test("delete car should work correctly", async () => {
        const carServices = new CarServices()

        await carServices.delete(carMock.id)
    })
})
