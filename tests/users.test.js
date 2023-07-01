const request = require("supertest")
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const app = require("../app")
const server = app.listen(8080, () => console.log("Testing on Port 8080"))
const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const { token } = require("morgan")
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

    test("It should get a specific user", async  () => {
        const user = new User({
            name: "Jamal Mayon",
            email: "jmayon@web.com",
            password: "password28"
        })
        await user.save()

        const response = await request(app)
            .get(`/users/${user._id}`)
        console.log(user, "SPECIFIC USER!")

        expect(response.statusCode).toBe(200)
        expect(response.body.user._id).toEqual(user.id)
    })

    test("It should update a user", async () => {
        const user = new User({
            name: "Jamal Mayon",
            email: "jmayon@web.com",
            password: "password28"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .put(`/users/${user._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({name: "Jamal Mayon", email: "jmayon@web.com", password: "Monkeyman"})
        console.log(user, response.body, "UPDATE!")

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual("Jamal Mayon")
        expect(response.body.email).toEqual("jmayon@web.com")
        //expect(response.body.password).toEqual("Monkeyman")
    })

    test("It should login a user", async () => {
        const user = new User({
            name: "Billy Bob",
            email: "Billy@Bob.com",
            password: "password1",
        })
        await user.save()
        const token = await user.generateAuthToken()
        
        const response = await request(app)
            .post("/users/login")
            .set("Authorization", `Bearer ${token}`)
            .send({ email: "Billy@Bob.com", password: "password1"})
            console.log(user, "LOGIN!")
            console.log(response.body, "CLOUDSCALE!")
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual("Billy Bob")
        expect(response.body.user.email).toEqual("Billy@Bob.com")
        expect(response.body.user.loggedIn).toBe(true)
        expect(response.body).toHaveProperty("token")
    })

    test("It should logout a user", async () => {
        const user = new User({
            name: "Joseph Da Bistro",
            email: "joe@web.com",
            password: "password43",
        });
        await user.save();
        const token = await user.generateAuthToken();

        const response = await request(app)
            .post("/users/logout")
            .set("Authorization", `Bearer ${token}`)
            .send({ email: "joe@web.com", password: "password43" });

        expect(response.statusCode).toBe(200);
        expect(response.body.user.loggedIn).toBe(false)
        expect(response.body.message).toEqual("Logged Out");
        await user.deleteOne();
    })

    test("It should delete a user", async () => {
        const user = new User({
            name: "Joseph Da Bistro",
            email: "joe@web.com",
            password: "password43",
        })
        await user.save()
        const token = await user.generateAuthToken()
        
        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual("User Deleted")
    })

    test("It should add an item to a user")
})