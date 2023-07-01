const request = require("supertest")
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const app = require("../app")
const server = app.listen(8080, () => console.log("Testing on Port 8080"))
const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach( async () => {
    await User.deleteMany()
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe("Test the main endpoints", () => {
    test("It should create a new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "Jamal Mayon",
                email: "jmayon@web.com",
                password: "password28"
            })
        
            expect(response.statusCode).toBe(200)
            expect(response.body.user.name).toEqual("Jamal Mayon")
            expect(response.body.user.email).toEqual("jmayon@web.com")
            expect(response.body).toHaveProperty("token")
    })

    test("It should login a user", async () => {
        const user = new User({
            name: "Jamal Mayon",
            email: "jmayon@web.com",
            password: "password1",
        })
        await user.save()
        const token = await user.generateAuthToken()
        
        const response = await request(app)
            .post("/users/login")
            .set("Authorization", `Bearer ${token}`)
            .send({ email: "jmayon@web.com", password: "password1"})
            console.log(user, "CLOUDSCALE!")
            console.log(response.body, "CLOUDSCALE!")
        expect(response.statusCode).toBe(200)
        //expect(response.body.user.name).toEqual("Jamal Mayon")
        // expect(response.body.user.email).toEqual("jmayon@web.com")
        // expect(response.body.user.loggedIn).toBe(true)
        // expect(response.body).toHaveProperty("token")
    })
})