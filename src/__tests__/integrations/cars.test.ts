
import { carCreateBodyMock, carListMock, carMock, carUpdateBodyMock } from "../__mocks__/carMocks"
import { request } from "../utils/request"
import { carDefaultExpects } from "../utils/carDefaultExpects"
import { loginUserMock, userListMock, userRegisterBodyMock } from "../__mocks__/userMocks"
import { prisma } from "../../database/prisma"

describe("Integration test: create car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
        await prisma.user.deleteMany()
    })

    test("should be able create a car successfuly", async () => {
        const { user, token } = await loginUserMock()
        const data = await request
        .post("/cars")
        .set('Authorization', token)
        .send(carCreateBodyMock)
        .expect(201)
        .then((response) => response.body)
        
        carDefaultExpects(data, carCreateBodyMock)
    })
})

describe("Integration test: get many cars", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
        await prisma.user.deleteMany()
    })
    
    test("should be able get many cars successfuly", async () => {
        const { user, token } = await loginUserMock()
        carListMock[0].userId = user.id
        carListMock[1].userId = user.id
        await prisma.car.createMany({ data: carListMock })

        const data = await request
        .get("/cars")
        .expect(200)
        .then((response) => response.body)
        
        expect(data).toHaveLength(2)
        carDefaultExpects(data[0], carListMock[0])
        carDefaultExpects(data[1], carListMock[1])
    })
})

describe("Integration test: get one cars", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
        await prisma.user.deleteMany()
    })
    
    test("should be able get one car successfuly", async () => {
        const { user, token } = await loginUserMock()
        carMock.userId = user.id
        await prisma.car.create({ data: carMock })

        const data = await request
        .get("/cars/fe111d24-1b79-44df-931b-4c9fd5859014")
        .expect(200)
        .then((response) => response.body)

        expect(data).toStrictEqual(carMock)
    })
})

describe("Integration test: update cars", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
        await prisma.user.deleteMany()
    })
    
    test("should be able update a car successfuly", async () => {
        const { user, token } = await loginUserMock()
        carMock.userId = user.id
        await prisma.car.create({ data: carMock })
        const updatedBody = await prisma.car.update({ where: { id: "fe111d24-1b79-44df-931b-4c9fd5859014"}, data: carUpdateBodyMock})

        const data = await request
        .patch("/cars/fe111d24-1b79-44df-931b-4c9fd5859014")
        .set('Authorization', token)
        .expect(200)
        .then((response) => response.body)
        
        expect(data).toStrictEqual(updatedBody)
    })
})

describe("Integration test: delete cars", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany()
        await prisma.user.deleteMany()
    })
    
    test("should be able delete a car successfuly", async () => {
        const { user, token } = await loginUserMock()
        carMock.userId = user.id
        await prisma.car.create({ data: carMock })
        
        const data = await request
        .delete("/cars/fe111d24-1b79-44df-931b-4c9fd5859014")
        .set('Authorization', token)
        .expect(204)
        .then((response) => response.body)
    })
})
