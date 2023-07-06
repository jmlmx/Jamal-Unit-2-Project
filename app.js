const express = require("express")
const morgan = require("morgan")
const userRoutes = require("./routes/userRoutes")
const itemRoutes = require("./routes/itemRoutes")
const cartRoutes = require("./routes/cartRoutes")
const app = express()

app.use(express.json())
app.use(morgan("combined"))
app.use("/users", userRoutes)
app.use("/items", itemRoutes)
app.use("/cart", cartRoutes)

module.exports = app